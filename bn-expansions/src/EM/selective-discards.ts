import { emExpansions, aggCatchBySpecies } from '../base/em-rule-base';
import { flattenDeep, get, set } from 'lodash';
import { groupingsToSpeciesDummyMap } from './helpers/maps';
import { Catches, Disposition, sourceType } from '@boatnet/bn-models';

const expansionCatchIds = ['5000']; //TODO maybe get this from some couch view or keep as a hardcoded value
const jp = require('jsonpath');

export class selectiveDiscards implements emExpansions {
    rulesExpansion(logbook: Catches, thirdPartyReview: Catches): Catches {
        const logbookAggCatches: any[] = aggCatchBySpecies(logbook);
        const ratioHolder = getRatiosForGroupings(logbookAggCatches, thirdPartyReview);
        return applyRatios(logbook, thirdPartyReview, ratioHolder)
    }
}

// gets all groupings that need expanding and gets ratios for each grouping
function getRatiosForGroupings(aggCatches: any[], review: Catches) {
    let thirdPartyReviewCatches: any[] = jp.query(review, '$..catch');
    thirdPartyReviewCatches = flattenDeep(thirdPartyReviewCatches);
    const expansionCatches = thirdPartyReviewCatches.filter((catchVal) => expansionCatchIds.includes(catchVal.speciesCode));
    let ratioHolder = {};

    for (const expansionCatch of expansionCatches) {
        let groupingRatios = {}
        let initialValue = 0;
        // reference map and get species in catch grouping
        const speciesCodesInCatchGrouping: any[] = get(groupingsToSpeciesDummyMap, expansionCatch.speciesCode);
        // get logbook entries for those species
        const speciesInGroup: any[] = aggCatches.filter((catchVal) => speciesCodesInCatchGrouping.includes(catchVal.speciesCode));
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
function applyRatios(logbook: Catches, review: Catches, ratioLookup: any) {
    let hauls = get(review, 'hauls', []);

    for (let i = 0; i < hauls.length; i++) {
        let catches = get(hauls[i], 'catch', []);
        let expandedCatches: any[] = [];

        for (let j = 0; j < catches.length; j++) {
            const currSpeciesCode = get(catches[j], 'speciesCode', '');
            if (expansionCatchIds.includes(currSpeciesCode)) {
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
