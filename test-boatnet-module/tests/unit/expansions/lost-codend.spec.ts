import { Catches, sourceType, Disposition } from '@boatnet/bn-models';
import { lostCodend } from '@boatnet/bn-expansions';

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
            gearTypeCode: "3",
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
                    disposition: Disposition.RETAINED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "PWHT",
                    weight: 300000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "DOVR",
                    weight: 40
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "EFLS",
                    weight: 10
                }
            ]
        },
        {
            haulNum: 2,
            gearTypeCode: "3",
            startDateTime: "2020-07-31T14:00:47Z",
            startLatitude: 41.2,
            startLongitude: -124.2,
            endDateTime: "2020-07-31T15:30:47Z",
            endLatitude: 41.1,
            endLongitude: -124.1,
            isCodendLost: true,
            targetStrategy: "PWHT"
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
            gearTypeCode: "3",
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
                    disposition: Disposition.RETAINED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "PWHT",
                    weight: 300000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "DOVR",
                    weight: 40
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "EFLS",
                    weight: 10
                }
            ]
        },
        {
            haulNum: 2,
            gearTypeCode: "3",
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
                    disposition: Disposition.RETAINED,
                    speciesCode: "PWHT",
                    weight: 225000
                },
                {
                    disposition: Disposition.DISCARDED,
                    speciesCode: "DOVR",
                    weight: 30
                },
                {
                    disposition: Disposition.DISCARDED,
                    speciesCode: "EFLS",
                    weight: 8
                }
            ]
        }
    ],
    type: "trips-api-catch",
    createdDate: "2020-08-25T13:56:33-07:00"
};

// TODO must commit my code first before writing the test
describe('@boatnet/bn-expansions', () => {
    it('selective discards test', () => {
        const lostCodendObj = new lostCodend();
        const result = lostCodendObj.logbookExpansion(logbook);
        expect(result).toEqual(expectedResult);
    })
})