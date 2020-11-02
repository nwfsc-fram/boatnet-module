import { BaseExpansion, aggCatchBySpecies, ExpansionParameters } from '../base/em-rule-base';
import { flattenDeep, get, set } from 'lodash';
import { Catches, Catch } from '@boatnet/bn-models';
const jp = require('jsonpath');

export class selectiveDiscards implements BaseExpansion {
    expand(params: ExpansionParameters): Catches {
        const logbook = params.logbook ? params.logbook : {};
        const thirdPartyReview = params.currCatch ? params.currCatch : {};
        const mixedGroupings = params.mixedGroupings ? params.mixedGroupings : {};

        const logbookAggCatches: any[] = aggCatchBySpecies(logbook);
        const ratioHolder = getRatiosForGroupings(logbookAggCatches, thirdPartyReview, mixedGroupings);
        return applyRatios(logbook, thirdPartyReview, mixedGroupings, ratioHolder)
    }
}

// gets all groupings that need expanding and gets ratios for each grouping
function getRatiosForGroupings(aggCatches: any[], review: Catches, mixedGroupings: any) {
    let thirdPartyReviewCatches: any[] = jp.query(review, '$..catch');
    thirdPartyReviewCatches = flattenDeep(thirdPartyReviewCatches);

    const mixedGroupingKeys: string[] = Object.keys(mixedGroupings);

    const expansionCatches = thirdPartyReviewCatches.filter((catchVal) => mixedGroupingKeys.includes(catchVal.speciesCode));
    let ratioHolder = {};

    for (const expansionCatch of expansionCatches) {
        let groupingRatios = {}
        let initialValue = 0;
        const row = 1;
        // reference map and get species in catch grouping
        const mixedGroupingIndex = mixedGroupingKeys.indexOf(expansionCatch.speciesCode);
        const speciesInExpansion: string[] = mixedGroupings[expansionCatch.speciesCode];
        // get logbook entries for those species
        const speciesInGroup: any[] = aggCatches.filter((catchVal) => speciesInExpansion.includes(catchVal.speciesCode));
        // get total weight
        let totalWeight = speciesInGroup.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.speciesWeight
        }, initialValue);
        // set ratios
        for (const species of speciesInGroup) {
            const ratio = species.speciesWeight / totalWeight;
            set(groupingRatios, species.speciesCode, ratio);
        }
        set(ratioHolder, expansionCatch.speciesCode, groupingRatios);
    }
    return ratioHolder;
}

// apply ratios to species haul by haul
function applyRatios(logbook: Catches, review: Catches, mixedGroupings: any, ratioLookup: any) {
    let hauls = get(review, 'hauls', []);
    const mixedGroupingKeys: string[] = Object.keys(mixedGroupings);

    for (let i = 0; i < hauls.length; i++) {
        let catches: Catch[] = get(hauls[i], 'catch', []);
        let expandedCatches: any[] = [];

        for (let j = 0; j < catches.length; j++) {
            const currSpeciesCode = get(catches[j], 'speciesCode', '');
            const currWeight = get(catches[j], 'speciesWeight', 0);

            if (mixedGroupingKeys.includes(currSpeciesCode) && currWeight > 50) {
                const ratio = get(ratioLookup, currSpeciesCode);
                const logbookCatches = get(logbook, 'hauls[' + i + '].catch');
                for (const logbookCatch of logbookCatches) {
                    if (ratio[logbookCatch.speciesCode]) {
                        const expandedWeight = get(catches[j], 'speceisWeight', 0) * ratio[logbookCatch.speciesCode] + logbookCatch.speciesWeight;
                        // expand count if priority or protected species
                        let expandedCount;
                        if ((logbookCatch.isWcgopEmPriority || logbookCatch.isProtected) && logbookCatch.speciesCount) {
                            expandedCount = get(catches[j], 'speciesCount', 0) * ratio[logbookCatch.speciesCode] 
                                            + logbookCatch.speciesCount;
                        }
                        expandedCatches.push({
                            disposition: logbookCatch.disposition,
                            fate: logbookCatch.fate,
                            speciesCount: expandedCount,
                            // TODO this should be WCGOP species code.
                            // utilize some mapper to convert from pacfin to wcgop species code
                            speciesCode: logbookCatch.speciesCode,
                            speciesWeight: expandedWeight
                        });
                    }
                }
            } else if (mixedGroupingKeys.includes(currSpeciesCode) && currWeight < 50) {
                // do nothing as specified in business rules
                // If there are more than 50 pounds of discards of unidentified fish (fish that cannot be identified
                // even to a group level) for a trip, the discards will be divided according to the ratio of fish on the
                // fish ticket (i.e., the discard will be treated like a non-selective discard). If there are less than 50
                // pounds, these discards will be dropped.
            } else {
                expandedCatches.push(catches[j]);
            }
        }
        set(review, 'hauls[' + i + '].catch', expandedCatches);
    }
    return review;
}
