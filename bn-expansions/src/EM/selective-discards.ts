import { BaseExpansion, aggCatchBySpecies, ExpansionParameters } from '../base/em-rule-base';
import { flattenDeep, get, set } from 'lodash';
import { Catches, Catch } from '@boatnet/bn-models';
const jp = require('jsonpath');

export class selectiveDiscards implements BaseExpansion {
    expand(params: ExpansionParameters): Catches {
        const logbook = params.logbook ? params.logbook : {};
        const thirdPartyReview = params.currCatch ? params.currCatch : {};
        const mixedGroupings = params.mixedGroupings ? params.mixedGroupings : {};
        const speciesCodeLookup = params.speciesCodeLookup ? params.speciesCodeLookup : {};

        const logbookAggCatches: any[] = aggCatchBySpecies(logbook);
        const ratioHolder = getRatiosForGroupings(logbookAggCatches, thirdPartyReview, mixedGroupings);
        return applyRatios(logbook, thirdPartyReview, mixedGroupings, ratioHolder, speciesCodeLookup);
    }
}

// gets all groupings that need expanding and gets ratios for each grouping
function getRatiosForGroupings(aggCatches: any[], review: Catches, mixedGroupings: any) {
    let thirdPartyReviewCatches: any[] = jp.query(review, '$.hauls..catch');
    thirdPartyReviewCatches = flattenDeep(thirdPartyReviewCatches);

    const mixedGroupingKeys: string[] = Object.keys(mixedGroupings);

    const expansionCatches = thirdPartyReviewCatches.filter((catchVal) => mixedGroupingKeys.includes(catchVal.speciesCode));
    let ratioHolder = {};

    for (const expansionCatch of expansionCatches) {
        let groupingRatios = {}
        const row = 1;
        // reference map and get species in catch grouping
        const speciesInExpansion: string[] = mixedGroupings[expansionCatch.speciesCode];
        // get logbook entries for those species
        const speciesInGroup: any[] = aggCatches.filter((catchVal) => speciesInExpansion.includes(catchVal.speciesCode));
        // get total weight
        let totalWeight = speciesInGroup.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.speciesWeight
        }, 0);
        let totalCount = speciesInGroup.reduce((accumulator, currentValue) => {
            return currentValue.speciesCount ? accumulator + currentValue.speciesCount : accumulator
        }, 0);
        // set ratios
        for (const species of speciesInGroup) {
            const weightRatio = species.speciesWeight / totalWeight;
            const countRatio = species.speciesCount ? species.speciesCount / totalCount : 0;
            set(groupingRatios, species.speciesCode + '.weight', weightRatio);
            set(groupingRatios, species.speciesCode + '.count', countRatio);
        }
        set(ratioHolder, expansionCatch.speciesCode, groupingRatios);
    }
    return ratioHolder;
}

// apply ratios to species haul by haul
function applyRatios(logbook: Catches, review: Catches, mixedGroupings: any, ratioLookup: any, speciesCodeLookup: any) {
    let hauls = get(review, 'hauls', []);
    const mixedGroupingKeys: string[] = Object.keys(mixedGroupings);

    for (let i = 0; i < hauls.length; i++) {
        let catches: Catch[] = get(hauls[i], 'catch', []);
        let expandedCatches: any[] = [];

        for (let j = 0; j < catches.length; j++) {
            const currSpeciesCode: string  = get(catches[j], 'speciesCode', '').toString();
            const currWeight = get(catches[j], 'speciesWeight', 0);

            if (mixedGroupingKeys.includes(currSpeciesCode) && currWeight > 50) {
                const ratio = get(ratioLookup, currSpeciesCode);
                const logbookCatches = get(logbook, 'hauls[' + i + '].catch');
                for (const logbookCatch of logbookCatches) {
                    const speciesCode = logbookCatch.speciesCode;
                    if (ratio[speciesCode]) {
                        const expandedWeight = get(catches[j], 'speciesWeight', 0) * ratio[logbookCatch.speciesCode].weight + logbookCatch.speciesWeight;
                        // expand count if priority or protected species
                        let expandedCount;
                        if ((speciesCodeLookup[speciesCode].isWcgopEmPriority || speciesCodeLookup[speciesCode].isProtected) && logbookCatch.speciesCount) {
                            expandedCount = get(catches[j], 'speciesCount', 0) * ratio[logbookCatch.speciesCode].count 
                                            + logbookCatch.speciesCount;
                        }
                        expandedCatches.push({
                            disposition: logbookCatch.disposition,
                            fate: logbookCatch.fate,
                            speciesCount: expandedCount,
                            // TODO this should be WCGOP species code.
                            // utilize some mapper to convert from pacfin to wcgop species code
                            speciesCode,
                            speciesWeight: expandedWeight,
                            comments: 'Added by selective discards expansion',
                            calcWeightType: 'Calculated Field'
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
