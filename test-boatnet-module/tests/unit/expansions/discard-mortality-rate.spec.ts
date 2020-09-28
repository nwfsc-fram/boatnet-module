import { Catches, sourceType, Disposition, GearTypes } from '@boatnet/bn-models';
import { ExpansionParameters, discardMortalityRates } from '@boatnet/bn-expansions';

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
                    weight: 1000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "LCOD",
                    weight: 2000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "PHLB",
                    weight: 3000
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
                    weight: 4000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "603",
                    weight: 5000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "101",
                    weight: 6000
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
                    weight: 7000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "603",
                    weight: 8000
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
                    weight: 1000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "LCOD",
                    weight: 2000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "PHLB",
                    weight: 3000
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
                    weight: 800
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "603",
                    weight: 350
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "101",
                    weight: 1080
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
                    weight: 3500
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "603",
                    weight: 4000
                },
                {
                    disposition: Disposition.DISCARDED,
                    fate: "11 Accidental, Incidental",
                    speciesCode: "101",
                    weight: .9,
                    timeOnDeck: 9000
                }
            ]
        }
    ],
    type: "trips-api-catch",
    createdDate: "2020-08-25T13:56:33-07:00"
};

describe('@boatnet/bn-expansions', () => {
    it('discard mortality rates test', async () => {
        const discardMortalityRateObj = new discardMortalityRates();
        const expansionParams: ExpansionParameters = { currCatch: logbook };
        const result = await discardMortalityRateObj.expand(expansionParams);
        expect(result).toEqual(expectedResult);
    })
})