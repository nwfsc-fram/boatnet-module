import { emExpansions } from '../base/em-rule-base';
import { Catches } from '../../../bn-models/src/models/trips-api/catches';
import { ResponseCatch } from '../../../bn-models/src/models/trips-api/response-catch';
import { flattenDeep, get, intersection, remove, set, uniqBy } from 'lodash';
import { groupingsToSpeciesDummyMap } from './helpers/maps';
import { ExcursionPlanTypeName } from '@boatnet/bn-models/lib';

export class selectiveDiscards implements emExpansions {
    rulesExpansion(logbook: Catches, thirdPartyReview: Catches): Catches {
        const jp = require('jsonpath');
        //TODO maybe get this from some couch view or keep as a hardcoded value
        const expansionCatchIds = ['5000'];

        // look through all the hauls in a logbook entry and aggregate weight
        // for each species
        let logbookAggCatches: any[] = jp.query(logbook, '$..catch');
        logbookAggCatches = flattenDeep(logbookAggCatches);

        logbookAggCatches = uniqBy(logbookAggCatches, (catchVal) =>
            catchVal.speciesCode
        )
        let i = 0;
        for (const species of logbookAggCatches) {
            let initValue = 0;
            const expansionCatches = logbookAggCatches.filter((catchVal) => catchVal.speciesCode === species.speciesCode);
            const total = expansionCatches.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.weight
            }, initValue);
            logbookAggCatches[i].weight = total;
            i++;
        }

        // get grouping we need to expand
        let thirdPartyReviewCatches: any[] = jp.query(thirdPartyReview, '$..catch');
        thirdPartyReviewCatches = flattenDeep(thirdPartyReviewCatches);
        const expansionCatches = thirdPartyReviewCatches.filter((catchVal) => expansionCatchIds.includes(catchVal.speciesCode));
        let ratioHolder = {};

        // get ratios for each grouping
        for (const expansionCatch of expansionCatches) {
            let groupingRatios = {}
            let initialValue = 0;
            // reference map and get species in catch grouping
            const speciesCodesInCatchGrouping: any[] = get(groupingsToSpeciesDummyMap, expansionCatch.speciesCode);
            // get logbook entries for those species
            const speciesInGroup: any[] = logbookAggCatches.filter((catchVal) => speciesCodesInCatchGrouping.includes(catchVal.speciesCode));
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
            console.log(ratioHolder);
        }

        // apply ratios to species haul by haul
        let hauls = get(thirdPartyReview, 'hauls', []);
        let result = {};
        let expandedCatchValues = {}
        for (let i = 0; i < hauls.length; i++) {
            let catches = get(hauls[i], 'catch', []);
            for (let j = 0; j < catches.length; j++) {
                const currSpeciesCode = get(catches[j], 'speciesCode', '');
                if (expansionCatchIds.includes(currSpeciesCode)) {
                    const ratio = get(ratioHolder, currSpeciesCode);
                    const logbookCatches = get(logbook, 'hauls[' + j + '].catch');
                    expandedCatchValues = {};
                    for(const logbookCatch of logbookCatches) {
                        if (ratio[logbookCatch.speciesCode]) {
                            const expandedWeight = get(catches[j], 'weight', 0) * ratio[logbookCatch.speciesCode] + logbookCatch.weight;
                            set(expandedCatchValues, logbookCatch.speciesCode, expandedWeight);
                            console.log(expandedCatchValues);
                        }
                    }
                }
            }
            set(result, 'haul ' + i, expandedCatchValues);
        }
        // TODO finalize result format
        console.log(result)
        return logbookAggCatches;
    }
}
