import { flattenDeep, uniqBy } from 'lodash';
import { Catches, CatchResults } from '@boatnet/bn-models';


const jp = require('jsonpath');

export interface emExpansions {
    rulesExpansion(logBook: Catches, thirdPartyReview: Catches) : CatchResults;
}

export interface logbookExpansion {
    logbookExpansion(logbook: Catches) : CatchResults;
}

export function aggCatchBySpecies(catchDoc: Catches) {
    let aggCatch = [];
    let catches: any[] = jp.query(catchDoc, '$..catch');
    catches = flattenDeep(catches);

    catches = uniqBy(catches, (catchVal) =>
        catchVal.speciesCode
    )
    for (const species of catches) {
        let initWeight = 0;
        const speciesCatch = catches.filter((catchVal) => catchVal.speciesCode === species.speciesCode);
        const totalWeight = speciesCatch.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.weight
        }, initWeight);
        aggCatch.push({ speciesCode: species.speciesCode, weight: totalWeight});
    }
    return aggCatch;
}