import { flattenDeep, set, uniqBy } from 'lodash';
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
    expand(params: ExpansionParameters): Catches;
}

export function aggCatchBySpecies(catchDoc: Catches) {
    let aggCatch: any[] = [];
    let catches: any[] = jp.query(catchDoc, '$..catch');
    catches = flattenDeep(catches);


    const uniqCatches = uniqBy(catches, (catchVal: any) =>
        catchVal.speciesCode
    )

    for (const species of uniqCatches) {
        let initWeight = 0;
        let initCount = 0;
        const speciesCatch = catches.filter((catchVal) => catchVal.speciesCode === species.speciesCode);

        const totalWeight = speciesCatch.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.speciesWeight
        }, initWeight);

        const totalCount = speciesCatch.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.speciesCount
        }, initCount);

        aggCatch.push({ speciesCode: species.speciesCode, speciesWeight: totalWeight, speciesCount: totalCount, disposition: species.disposition});
    }
    return aggCatch;
}
