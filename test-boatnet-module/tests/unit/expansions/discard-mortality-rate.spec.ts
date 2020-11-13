import { Catches, sourceType, Disposition, GearTypes } from '@boatnet/bn-models';
import { ExpansionParameters, discardMortalityRates } from '@boatnet/bn-expansions';
import { get, round, set } from 'lodash';

const logbook: Catches = {
    tripNum: 100198,
    source: sourceType.logbook,
    logbookPageNumber: 55555,
    fisherySector: "Shoreside Hake",
    year: "2020",
    vesselName: "Traveler",
    vesselNumber: "929536",
    permitNumber: "GF0111",
    isEFPTrip: true,
    isObservered: false,
    crewSize: 4,
    departureDate: "07-31-2020",
    departureState: "WA",
    depaturePortCode: "SEA",
    returnDateTime: "07-31-2020",
    returnPortState: "O",
    returnPortCode: "NEW",
    buyers: [],
    isSignedTrue: true,
    fishTickets: [
        {
            fishTicketNumber: "50055555",
            fishTicketDate: "08-01-2019"
        }
    ],
    hauls: [
        {
            haulNum: 1,
            gearTypeCode: GearTypes.MidwaterTrawl,
            startDateTime: "2020-07-31T09:00:47Z",
            startLatitude: 40.424292,
            startLongitude: -123.801898,
            endDateTime: "2020-07-31T11:00:47Z",
            endLatitude: 41.1,
            endLongitude: -124.1,
            targetStrategy: "PWHT",
            systemPerformance: 1,
            catchHandlingPerformance: 1,
            catch: [
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "SABL",
                    speciesWeight: 1000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "LCOD",
                    speciesWeight: 2000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "PHLB",
                    speciesWeight: 3000
                }
            ]
        },
        {
            haulNum: 2,
            gearTypeCode: GearTypes.FishPot,
            startDateTime: "2020-07-31T14:00:47Z",
            startLatitude: 41.2,
            startLongitude: -124.2,
            endDateTime: "2020-07-31T15:30:47Z",
            endLatitude: 41.1,
            endLongitude: -124.1,
            isCodendLost: true,
            targetStrategy: "PWHT",
            catch: [
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "203",
                    speciesWeight: 4000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "603",
                    speciesWeight: 5000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "101",
                    speciesWeight: 6000
                }
            ]
        },
        {
            haulNum: 3,
            gearTypeCode: GearTypes.GroundfishTrawlFootropeLessThan8,
            startDateTime: "2020-07-31T14:00:47Z",
            startLatitude: 41.2,
            startLongitude: -124.2,
            endDateTime: "2020-07-31T15:30:47Z",
            endLatitude: 41.1,
            endLongitude: -124.1,
            isCodendLost: true,
            targetStrategy: "PWHT",
            catch: [
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "203",
                    speciesWeight: 7000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "603",
                    speciesWeight: 8000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "101",
                    timeOnDeck: 9000
                }
            ]
        }
    ],
    type: "trips-api-catch",
    createdDate: "2020-08-25T13:56:33-07:00"
};

const expectedResult: Catches = {
    tripNum: 100198,
    source: sourceType.logbook,
    logbookPageNumber: 55555,
    fisherySector: "Shoreside Hake",
    year: "2020",
    vesselName: "Traveler",
    vesselNumber: "929536",
    permitNumber: "GF0111",
    isEFPTrip: true,
    isObservered: false,
    crewSize: 4,
    departureDate: "07-31-2020",
    departureState: "WA",
    depaturePortCode: "SEA",
    returnDateTime: "07-31-2020",
    returnPortState: "O",
    returnPortCode: "NEW",
    buyers: [],
    isSignedTrue: true,
    fishTickets: [
        {
            fishTicketNumber: "50055555",
            fishTicketDate: "08-01-2019"
        }
    ],
    hauls: [
        {
            haulNum: 1,
            gearTypeCode: GearTypes.MidwaterTrawl,
            startDateTime: "2020-07-31T09:00:47Z",
            startLatitude: 40.424292,
            startLongitude: -123.801898,
            endDateTime: "2020-07-31T11:00:47Z",
            endLatitude: 41.1,
            endLongitude: -124.1,
            targetStrategy: "PWHT",
            systemPerformance: 1,
            catchHandlingPerformance: 1,
            catch: [
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "SABL",
                    speciesWeight: 1000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "LCOD",
                    speciesWeight: 2000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "PHLB",
                    speciesWeight: 3000
                }
            ]
        },
        {
            haulNum: 2,
            gearTypeCode: GearTypes.FishPot,
            startDateTime: "2020-07-31T14:00:47Z",
            startLatitude: 41.2,
            startLongitude: -124.2,
            endDateTime: "2020-07-31T15:30:47Z",
            endLatitude: 41.1,
            endLongitude: -124.1,
            isCodendLost: true,
            targetStrategy: "PWHT",
            catch: [
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "203",
                    speciesWeight: 800
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "603",
                    speciesWeight: 350
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "101",
                    speciesWeight: 1080
                }
            ]
        },
        {
            haulNum: 3,
            gearTypeCode: GearTypes.GroundfishTrawlFootropeLessThan8,
            startDateTime: "2020-07-31T14:00:47Z",
            startLatitude: 41.2,
            startLongitude: -124.2,
            endDateTime: "2020-07-31T15:30:47Z",
            endLatitude: 41.1,
            endLongitude: -124.1,
            isCodendLost: true,
            targetStrategy: "PWHT",
            catch: [
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "203",
                    speciesWeight: 3500
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "603",
                    speciesWeight: 4000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "101",
                    speciesWeight: .9,
                    timeOnDeck: 9000
                }
            ]
        }
    ],
    type: "trips-api-catch",
    createdDate: "2020-08-25T13:56:33-07:00"
};

function roundWeight(catchObj: Catches) {
    let hauls = get(catchObj, 'hauls', []);
    for (let i = 0; i < hauls.length; i++) {
        let catches = get(hauls[i], 'catch', []);
        for (let j = 0; j < catches.length; j++) {
            let speciesWeight = get(catches[j], 'speciesWeight', 0);
            speciesWeight = round(speciesWeight, 2);
            set(catchObj, 'hauls[' + i + '].catch[' + j + '].speciesWeight', speciesWeight);
        }
    }
    return catchObj;
}

describe('@boatnet/bn-expansions', () => {
    it('discard mortality rates test', async () => {
        const discardMortalityRateObj = new discardMortalityRates();
        const expansionParams: ExpansionParameters = { currCatch: logbook };
        let result = await discardMortalityRateObj.expand(expansionParams);
        result = roundWeight(result);
        const s = expect(result).toEqual(expectedResult);
    })
})