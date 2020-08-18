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

const logbook: Catches = {
    tripNum: 100197,
    source: 'logbook',
    logbookPageNumber: 55555,
    fisherySector: 'Shoreside Hake',
    year: '2020',
    vesselName: 'Traveler',
    vesselNumber: '929536',
    permitNumber: 'GF0111',
    isEFPTrip: true,
    isObservered: false,
    crewSize: 4,
    departureDate: '07-31-2020',
    departureState: 'WA',
    depaturePortCode: 'SEA',
    returnDateTime: '07-31-2020',
    returnPortState: 'O',
    returnPortCode: 'NEW',
    buyers: [],
    isSignedTrue: true,
    fishTickets: [{
        fishTicketNumber: '50055555',
        fishTicketDate: '08-01-2019'
    }],
    hauls: [{
        haulNum: 1,
        gearTypeCode: '3',
        startDateTime: '2020-07-31T09:00:47Z',
        startLatitude: 40.424292,
        startLongitude: -123.801898,
        endDateTime: '2020-07-31T11:00:47Z',
        endLatitude: 41.1,
        endLongitude: -124.1,
        targetStrategy: 'PWHT',
        systemPerformance: 1,
        catchHandlingPerformance: 1,
        catch: [{
            disposition: 'R',
            fate: '11 Accidental, Incidental',
            speciesCode: 'PWHT',
            weight: 300000
        },
        {
            disposition: 'D',
            fate: '11 Accidental, Incidental',
            speciesCode: 'DOVR',
            weight: 40
        },
        {
            disposition: 'D',
            fate: '11 Accidental, Incidental',
            speciesCode: 'EFLS',
            weight: 10
        }]
    },
    {
        haulNum: 2,
        gearTypeCode: '3',
        startDateTime: '2020-07-31T14:00:47Z',
        startLatitude: 41.2,
        startLongitude: -124.2,
        endDateTime: '2020-07-31T15:30:47Z',
        endLatitude: 41.1,
        endLongitude: -124.1,
        isCodendLost: true,
        targetStrategy: 'PWHT'
    }]
};

const l = new lostCodend();
l.logbookExpansion(logbook);
