import { Catches, sourceType, Disposition } from '@boatnet/bn-models';
import { ExpansionParameters, lostFixedGear } from '@boatnet/bn-expansions';

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
            gearTypeCode: "10",
            gearLost: 2,
            gearPerSet: 3,
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
                    speciesCode: "PWHT",
                    speciesWeight: 1000,
                    speciesCount: 10
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "DOVR",
                    speciesWeight: 2000,
                    speciesCount: 20
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "DCRB",
                    speciesWeight: 3000
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
            gearTypeCode: "10",
            gearLost: 2,
            gearPerSet: 3,
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
                    speciesCode: "PWHT",
                    speciesWeight: 1000,
                    speciesCount: 10
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "DOVR",
                    speciesWeight: 2000,
                    speciesCount: 20
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "DCRB",
                    speciesWeight: 3000
                },
                {
                    disposition: Disposition.DISCARDED,
                    speciesCode: "PWHT",
                    speciesWeight: 2000,
                    speciesCount: 20,
                    calcWeightType: 'From Average Weight',
                    comments: 'Added by lost fixed gear expansion'
                },
                {
                    disposition: Disposition.DISCARDED,
                    speciesCode: "DOVR",
                    speciesWeight: 4000,
                    speciesCount: 40,
                    calcWeightType: 'From Average Weight',
                    comments: 'Added by lost fixed gear expansion'
                },
                {
                    disposition: Disposition.DISCARDED,
                    speciesCode: "DCRB",
                    speciesWeight: 6000,
                    speciesCount: 0,
                    calcWeightType: 'From Average Weight',
                    comments: 'Added by lost fixed gear expansion'
                }
            ]
        }
    ],
    type: "trips-api-catch",
    createdDate: "2020-08-25T13:56:33-07:00"
};

describe('@boatnet/bn-expansions', () => {
    it('lost fixed gear', async () => {
        const lostFixedGearObj = new lostFixedGear();
        const expansionParams: ExpansionParameters = { currCatch: logbook };
        const result = await lostFixedGearObj.expand(expansionParams);
        expect(result).toEqual(expectedResult);
    })
})