import { Catches } from '@boatnet/bn-models';
import { BaseExpansion, aggCatchBySpecies, ExpansionParameters } from '../base/em-rule-base';
import { flattenDeep, set } from 'lodash';
import moment from 'moment';

const jp = require('jsonpath');

export class lostCodend implements BaseExpansion {
    expand(params: ExpansionParameters): Catches {
        const tripCatch = params.currCatch ? params.currCatch : {};
        const speciesWeights: any[] = aggCatchBySpecies(tripCatch);
        const totalHours: number = getTotalHours(tripCatch);

        let hauls: any[] = jp.query(tripCatch, '$..hauls');
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
                set(tripCatch, 'hauls[' + haulIndex + '].catch', catches);
            }
            haulIndex++;
        }
        return tripCatch;
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
