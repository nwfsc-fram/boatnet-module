import { Catches } from '@boatnet/bn-models';
import { BaseExpansion, aggCatchBySpecies, ExpansionParameters } from '../base/em-rule-base';
import { flattenDeep, set } from 'lodash';
import moment from 'moment';

const jp = require('jsonpath');

export class lostCodend implements BaseExpansion {
    expand(params: ExpansionParameters): Catches {
        const tripCatch = params.currCatch ? params.currCatch : {};
        const aggCatch: any[] = aggCatchBySpecies(tripCatch);
        const totalHours: number = getTotalHours(tripCatch);

        let hauls: any[] = jp.query(tripCatch, '$..hauls');
        hauls = flattenDeep(hauls);

        for (let i = 0; i < hauls.length; i++) {
            let catches = jp.query(tripCatch, '$..catch');
            catches = flattenDeep(catches);
            if (hauls[i].isCodendLost) {
                catches = [];
                const duration = getDuration(hauls[i]);
                for (const aggSpecies of aggCatch) {
                    let ratio = aggSpecies.weight / totalHours;
                    let weight = ratio * duration;
                    set(aggSpecies, 'weight', Math.round(weight));

                    // expand count if priority or protected species
                    if ((aggSpecies.isWcgopEmPriority || aggSpecies.isProtected) && aggSpecies.speciesCount) {
                        let ratio = aggSpecies.speciesCount / totalHours;
                        let count = ratio * duration;
                        set(aggSpecies, 'speciesCount', Math.round(count));
                    }
                    catches.push(aggSpecies);
                }
            }
            hauls[i].catch = JSON.parse(JSON.stringify(catches));
        }
        set(tripCatch, 'hauls', hauls);
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
