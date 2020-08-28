import { flattenDeep, uniqBy } from 'lodash';
import { Catches } from '@boatnet/bn-models';


const jp = require('jsonpath');

export interface emExpansions {
    rulesExpansion(logBook: Catches, thirdPartyReview: Catches) : Catches;
}

export interface logbookExpansion {
    logbookExpansion(logbook: Catches) : Catches;
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
        aggCatch.push({ speciesCode: species.speciesCode, weight: totalWeight, disposition: species.disposition});
    }
    return aggCatch;
}
