import { Catches, sourceType, Disposition } from '@boatnet/bn-models';
import { ExpansionParameters, unsortedCatch } from '@boatnet/bn-expansions';

const fishTickets = [
    {
        PACFIN_SPECIES_CODE: "CNRY",
        LANDED_WEIGHT_LBS: 81,
        CONDITION_CODE: "R",
        VESSEL_NUM: "CF3341ZY",
        FTID: '123'
    }, {
        PACFIN_SPECIES_CODE: "LCOD",
        LANDED_WEIGHT_LBS: 242,
        CONDITION_CODE: "R",
        VESSEL_NUM: "CF3341ZY",
        FTID: '123'
    }, {
        PACFIN_SPECIES_CODE: "VRML",
        LANDED_WEIGHT_LBS: 160,
        CONDITION_CODE: "R",
        VESSEL_NUM: "CF3341ZY",
        FTID: '123'
    }
]

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
            fishTicketNumber: "D678319",
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
                    speciesCode: 999,
                    speciesWeight: 1000
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
            fishTicketNumber: "D678319",
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
                    calcWeightType: "CalcField",
                    comments: "calculated by unsorted catch (net bleed) expansion",
                    disposition: Disposition.DISCARDED,
                    speciesCode: "CNRY",
                    speciesWeight: 167.70186335403727
                },
                {
                    calcWeightType: "CalcField",
                    comments: "calculated by unsorted catch (net bleed) expansion",
                    disposition: Disposition.DISCARDED,
                    speciesCode: "LCOD",
                    speciesWeight: 501.0351966873706
                },
                {
                    calcWeightType: "CalcField",
                    comments: "calculated by unsorted catch (net bleed) expansion",
                    disposition: Disposition.DISCARDED,
                    speciesCode: "VRML",
                    speciesWeight: 331.26293995859214
                }
            ]
        }
    ],
    type: "trips-api-catch",
    createdDate: "2020-08-25T13:56:33-07:00"
};

describe('@boatnet/bn-expansions', () => {
    it('unsorted catch', async () => {
        const unsortedCatchObj = new unsortedCatch();
        const expansionParams: ExpansionParameters = { currCatch: logbook, fishTickets };
        const result = await unsortedCatchObj.expand(expansionParams);
        expect(result).toEqual(expectedResult);
    })
})