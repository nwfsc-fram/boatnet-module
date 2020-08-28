import { Catches } from '@boatnet/bn-models';
import { logbookExpansion, aggCatchBySpecies } from '../base/em-rule-base';
import { flattenDeep, set } from 'lodash';
import moment from 'moment';

const jp = require('jsonpath');

export class lostCodend implements logbookExpansion {
    logbookExpansion(logbook: Catches): Catches {
        const speciesWeights: any[] = aggCatchBySpecies(logbook);
        const totalHours: number = getTotalHours(logbook);

        let hauls: any[] = jp.query(logbook, '$..hauls');
        hauls = flattenDeep(hauls);
        let haulIndex = 0;

        for (const haul of hauls) {
            if (haul.isCodendLost) {
                const catches: any = [];
                const duration = getDuration(haul);
                for (const speciesWeight of speciesWeights) {
                    let ratio = speciesWeight.weight / totalHours;
                    let weight = ratio * duration;
                    weight = Math.round(weight);
                    catches.push({
                        disposition: speciesWeight.disposition,
                        speciesCode: speciesWeight.speciesCode,
                        weight
                    })
                }
                set(logbook, 'hauls[' + haulIndex + '].catch', catches);
            }
            haulIndex++;
        }
        return logbook;
    }
}

// get total hours of all the hauls with no lost codend
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
