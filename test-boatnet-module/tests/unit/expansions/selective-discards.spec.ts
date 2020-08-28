import { Catches, sourceType, Disposition } from '@boatnet/bn-models';
import { selectiveDiscards } from '@boatnet/bn-expansions';

export const logbook: Catches = {
    tripNum: 100197,
    source: sourceType.logbook,
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
    depaturePortCode: 'NEW',
    returnDateTime: '07-31-2020',
    returnPortState: 'NEW',
    buyers: [],
    isSignedTrue: true,
    fishTickets: [{
        fishTicketNumber: '50055555',
        fishTicketDate: '08-01-2019'
    }],
    hauls: [{
        haulNum: 1,
        gearTypeCode: '3',
        startDateTime: '07-31-2020',
        startLatitude: 40.424292,
        startLongitude: -123.801898,
        endDateTime: '2020-07-31T11:00:47Z',
        endLatitude: 41.1,
        endLongitude: -124.1,
        targetStrategy: 'PWHT',
        systemPerformance: 1,
        catchHandlingPerformance: 1,
        catch: [{
            disposition: Disposition.RETAINED,
            fate: '11 Accidental, Incidental',
            speciesCode: 'PWHT',
            weight: 300000
        },
        {
            disposition: Disposition.DISCARDED,
            fate: '11 Accidental, Incidental',
            speciesCode: 'DOVR',
            weight: 40
        },
        {
            disposition: Disposition.DISCARDED,
            fate: '11 Accidental, Incidental',
            speciesCode: 'EFLS',
            weight: 10
        }]
    }]
};

export const review: Catches = {
    tripNum: 100197,
    source: sourceType.thirdParty,
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
    depaturePortCode: 'NEW',
    returnDateTime: '07-31-2020',
    returnPortState: 'NEW',
    buyers: [],
    isSignedTrue: true,
    fishTickets: [{
        fishTicketNumber: '50055555',
        fishTicketDate: '08-01-2019'
    }],
    hauls: [{
        haulNum: 1,
        gearTypeCode: '3',
        startDateTime: '07-31-2020',
        startLatitude: 40.424292,
        startLongitude: -123.801898,
        endDateTime: '2020-07-31T11:00:47Z',
        endLatitude: 41.1,
        endLongitude: -124.1,
        targetStrategy: 'PWHT',
        systemPerformance: 1,
        catchHandlingPerformance: 1,
        catch: [
        {
            disposition: Disposition.DISCARDED,
            fate: '11 Accidental, Incidental',
            speciesCode: '5000',
            weight: 500
        }]
    }]
};

const expectedResult: Catches = {
    tripNum: 100197,
    source: sourceType.thirdParty,
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
    depaturePortCode: 'NEW',
    returnDateTime: '07-31-2020',
    returnPortState: 'NEW',
    buyers: [],
    isSignedTrue: true,
    fishTickets: [{
        fishTicketNumber: '50055555',
        fishTicketDate: '08-01-2019'
    }],
    hauls: [{
        haulNum: 1,
        gearTypeCode: '3',
        startDateTime: '07-31-2020',
        startLatitude: 40.424292,
        startLongitude: -123.801898,
        endDateTime: '2020-07-31T11:00:47Z',
        endLatitude: 41.1,
        endLongitude: -124.1,
        targetStrategy: 'PWHT',
        systemPerformance: 1,
        catchHandlingPerformance: 1,
        catch: [
        {
            disposition: Disposition.DISCARDED,
            fate: '11 Accidental, Incidental',
            speciesCode: 'DOVR',
            weight: 440
        },
        {
            disposition: Disposition.DISCARDED,
            fate: '11 Accidental, Incidental',
            speciesCode: 'EFLS',
            weight: 110
        }]
    }]
};

// TODO must commit my code first before writing the test
describe('@boatnet/bn-expansions', () => {
    it('selective discards test', () => {
        const selectiveDiscard = new selectiveDiscards();
        const result = selectiveDiscard.rulesExpansion(logbook, review);
        expect(result).toEqual(expectedResult);
    })
})