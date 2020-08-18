import { Catches } from '@boatnet/bn-models';
import { logbookExpansion } from '../base/em-rule-base';
import { flattenDeep, get, intersection, remove, set, uniqBy, result } from 'lodash';
import moment from 'moment';

const jp = require('jsonpath');

export class lostCodend implements logbookExpansion {
    logbookExpansion(logbook: Catches): Catches {
        let resultsArr: any[] = []; //TODO still need to decide what output will look like
        const speciesWeights: any[] = getTotalCatch(logbook);
        const totalHours: number = getTotalHours(logbook);

        let hauls: any[] = jp.query(logbook, '$..hauls');
        hauls = flattenDeep(hauls);
        hauls = hauls.filter((haul) => haul.isCodendLost);

        for (const haul of hauls) {
            const duration = getDuration(haul);
            let catchArr: any[] = [];
            for (const speciesWeight of speciesWeights) {
                let weight = speciesWeight.weight / totalHours * duration;
                weight = Math.round(weight);
                catchArr.push({ species: speciesWeight.species, weight });
            }
            resultsArr.push(catchArr);
        }
        console.log(resultsArr);
        return resultsArr;
    }
}

// aggregate the weight for each species over all the hauls
function getTotalCatch(logbook: Catches) {
    let avgCatchPerHour = [];
    let logbookAggCatches: any[] = jp.query(logbook, '$..catch');
    logbookAggCatches = flattenDeep(logbookAggCatches);

    logbookAggCatches = uniqBy(logbookAggCatches, (catchVal) =>
        catchVal.speciesCode
    )
    for (const species of logbookAggCatches) {
        let initWeight = 0;
        const expansionCatches = logbookAggCatches.filter((catchVal) => catchVal.speciesCode === species.speciesCode);
        const totalWeight = expansionCatches.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.weight
        }, initWeight);
        avgCatchPerHour.push({ species: species.speciesCode, weight: totalWeight});
    }
    return avgCatchPerHour;
}

// get total hours of all the hauls where isCodendLost = false
function getTotalHours(logbook: Catches) {
    let initWeight = 0;

    let hauls: any[] = jp.query(logbook, '$..hauls');
    hauls = flattenDeep(hauls);
    hauls = hauls.filter((haul) => !haul.isCodendLost);

    return hauls.reduce((accumulator, currentValue) => {
        return accumulator + getDuration(currentValue);
    }, initWeight);
}

function getDuration(haul: any) {
    const startDate = moment(haul.startDateTime);
    const endDate = moment(haul.endDateTime);
    return endDate.diff(startDate, 'hours', true);
}
