import { BaseExpansion, aggCatchBySpecies, ExpansionParameters } from '../base/em-rule-base';
import { flattenDeep, get, set } from 'lodash';
import { groupingsToSpeciesDummyMap } from './helpers/maps';
import { Catches, Disposition, sourceType } from '@boatnet/bn-models';

const dbConfig = require('../../dbConfig.json').dbConfig;
const couchDB = require('nano')(dbConfig.login);
const masterDev = couchDB.db.use('master-dev');

const jp = require('jsonpath');

export class selectiveDiscards implements BaseExpansion {
    async expand(params: ExpansionParameters): Promise<Catches> {
        const logbook = params.logbook ? params.logbook : {};
        const thirdPartyReview = params.currCatch ? params.currCatch : {};

        const logbookAggCatches: any[] = aggCatchBySpecies(logbook);
        const ratioHolder = await getRatiosForGroupings(logbookAggCatches, thirdPartyReview);
        return await applyRatios(logbook, thirdPartyReview, ratioHolder)
    }
}

// gets all groupings that need expanding and gets ratios for each grouping
async function getRatiosForGroupings(aggCatches: any[], review: Catches) {
    let thirdPartyReviewCatches: any[] = jp.query(review, '$..catch');
    thirdPartyReviewCatches = flattenDeep(thirdPartyReviewCatches);

    const mixedGroupings = await getMixedGroupingInfo();
    const mixedGroupingKeys: string[] = mixedGroupings.keys;
    const mixedGroupingDocs = mixedGroupings.docs;

    const expansionCatches = thirdPartyReviewCatches.filter((catchVal) => mixedGroupingKeys.includes(catchVal.speciesCode));
    let ratioHolder = {};

    for (const expansionCatch of expansionCatches) {
        let groupingRatios = {}
        let initialValue = 0;
        const row = 1;
        // reference map and get species in catch grouping
        const mixedGroupingIndex = mixedGroupingKeys.indexOf(expansionCatch.speciesCode);
        const speciesInExpansion: string[] = await getSpeciesCodesForGrouping(mixedGroupingDocs.rows[mixedGroupingIndex].doc.taxonomy.children, []);
        // get logbook entries for those species
        const speciesInGroup: any[] = aggCatches.filter((catchVal) => speciesInExpansion.includes(catchVal.speciesCode));
        // get total weight
        let totalWeight = speciesInGroup.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.weight
        }, initialValue);
        // set ratios
        for (const species of speciesInGroup) {
            const ratio = species.weight / totalWeight;
            set(groupingRatios, species.speciesCode, ratio);
        }
        set(ratioHolder, expansionCatch.speciesCode, groupingRatios);
    }
    return ratioHolder;
}

// apply ratios to species haul by haul
async function applyRatios(logbook: Catches, review: Catches, ratioLookup: any) {
    let hauls = get(review, 'hauls', []);

    for (let i = 0; i < hauls.length; i++) {
        let catches = get(hauls[i], 'catch', []);
        let expandedCatches: any[] = [];

        for (let j = 0; j < catches.length; j++) {
            const currSpeciesCode = get(catches[j], 'speciesCode', '');
            const mixedGroupings = await getMixedGroupingInfo();
            const mixedGroupingKeys: string[] = mixedGroupings.keys;

            if (mixedGroupingKeys.includes(currSpeciesCode)) {
                const ratio = get(ratioLookup, currSpeciesCode);
                const logbookCatches = get(logbook, 'hauls[' + j + '].catch');
                for (const logbookCatch of logbookCatches) {
                    if (ratio[logbookCatch.speciesCode]) {
                        const expandedWeight = get(catches[j], 'weight', 0) * ratio[logbookCatch.speciesCode] + logbookCatch.weight;
                        expandedCatches.push({
                            disposition: logbookCatch.disposition,
                            fate: logbookCatch.fate,
                            // TODO this should be WCGOP species code.
                            // utilize some mapper to convert from pacfin to wcgop species code
                            speciesCode: logbookCatch.speciesCode,
                            weight: expandedWeight
                        });
                    }
                }
            } else {
                expandedCatches.push(catches[j]);
            }
        }
        set(review, 'hauls[' + i + '].catch', expandedCatches);
    }
    return review;
}

async function getSpeciesCodesForGrouping(children: string[], speciesCodes: string[]) {
    for (const child of children) {
        const species = await masterDev.view('Taxonomy', 'taxonomy-alias-by-taxonomy-id',
            { "include_docs": true, "key": child });
        const result = species.rows[0].doc;

        if (result.pacfinSpeciesCode) {
            speciesCodes.push(result.pacfinSpeciesCode)
        }
        if (result.wcemSpeciesCode) {
            speciesCodes.push(result.wcemSpeciesCode)
        }
        if (result.taxonomy && result.taxonomy.children) {
            await getSpeciesCodesForGrouping(result.taxonomy.children, speciesCodes);
        }
    }
    return speciesCodes;
}

async function getMixedGroupingInfo() {
    const mixedGroupings = await masterDev.view('em-views', 'mixed-groupings', { include_docs: true });
    let mixedGroupingKeys = jp.query(mixedGroupings, '$..key');
    for (let i = 0; i < mixedGroupingKeys.length; i++) {
        if (typeof mixedGroupingKeys[i] === 'number') {
            mixedGroupingKeys[i] = mixedGroupingKeys[i].toString();
        }
    }
    return { docs: mixedGroupings, keys: mixedGroupingKeys };
}

