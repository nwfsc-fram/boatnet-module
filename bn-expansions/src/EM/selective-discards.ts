import { emExpansions } from '../base/em-rule-base';
import { Catches } from '../../../bn-models/src/models/trips-api/catches';
import { ResponseCatch } from '../../../bn-models/src/models/trips-api/response-catch';
import { flattenDeep, get, remove, set, uniqBy } from 'lodash';
import { groupingsToSpeciesDummyMap } from './helpers/maps';

export class selectiveDiscards implements emExpansions {
    rulesExpansion(catchAPIVal: Catches): Catches {
        const jp = require('jsonpath');
        //TODO maybe get this from some couch view or keep as a hardcoded value
        const expansionCatchIds = ['5000'];

        let catches: any[] = jp.query(catchAPIVal, '$..catch');
        catches = flattenDeep(catches);

        // sum duplicates
        const uniqCatches = uniqBy(catches, (catchVal) =>
            catchVal.speciesCode
        )
        let i = 0;
        for (const species of uniqCatches) {
            let initValue = 0;
            const expansionCatches = catches.filter((catchVal) => catchVal.speciesCode === species.speciesCode);
            const total = expansionCatches.reduce(
                (accumulator, currentValue) => {
                    return accumulator + currentValue.weight
                }, initValue
            );
            uniqCatches[i].weight = total;
            i++;
        }

        // get grouping we need to expand
        const expansionCatches = uniqCatches.filter((catchVal) => expansionCatchIds.includes(catchVal.speciesCode));

        // go through the groupings to get ratios
        for (const expansionCatch of expansionCatches) {
            let ratioHolder = {};
            let totalWeight: number = 0;
            const speciesCode = expansionCatch.speciesCode;
            const speciesInCatchGrouping: any[] = get(groupingsToSpeciesDummyMap, speciesCode);
            // get ratios
            for (const species of speciesInCatchGrouping) {
                const currSpeciesCode: string = species.speciesCode;
                const expansionCatches = uniqCatches.filter((catchVal) => catchVal.speciesCode === currSpeciesCode);
                set(ratioHolder, currSpeciesCode, expansionCatches[0].weight);
                totalWeight += expansionCatches[0].weight;
            }
            // apply ratio
            for (const species of speciesInCatchGrouping) {
                const currSpeciesCode: string = species.speciesCode;
                let ratio = get(ratioHolder, currSpeciesCode) / totalWeight;
                const catchIndex = uniqCatches.findIndex((catchVal) => catchVal.speciesCode === currSpeciesCode);
                uniqCatches[catchIndex].weight = expansionCatch.weight * ratio;
            }
            remove(uniqCatches, (n) => n.speciesCode === speciesCode);
        }
        console.log(uniqCatches)
        return uniqCatches;
    }
}
