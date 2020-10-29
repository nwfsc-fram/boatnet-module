import { flattenDeep, uniqBy } from 'lodash';
import { Catches, FishTicketRow } from '@boatnet/bn-models';

const jp = require('jsonpath');

export interface ExpansionParameters {
    currCatch: Catches;
    logbook?: Catches;
    review?: Catches;
    audit?: Catches
    fishTickets?: FishTicketRow[];
    mixedGroupings?: any;
}

export interface BaseExpansion {
    expand(params: ExpansionParameters) : Catches;
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
