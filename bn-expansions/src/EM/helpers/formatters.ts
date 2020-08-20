import { Catches, CatchResults, ExpansionType, WeightType } from '@boatnet/bn-models';
import moment from 'moment';
import { set, get } from 'lodash';

export function formatLogbookResponse(logbook: Catches, expansionType: ExpansionType): CatchResults {
    // check couch to see if there is an existing doc already
    let result: CatchResults = {
        tripNum: logbook.tripNum
    };
    const logbookCatch: any[] = catchToHaul(logbook, expansionType);
    set(result, 'logbookCatch', logbookCatch);
    return result;
}

export function formatLogbookAndThirdPartyReviewResponse(logbook: Catches, review: Catches, expansionType: ExpansionType) :CatchResults {
    let result: CatchResults = {
        tripNum: logbook.tripNum
    };
    const logbookCatch: any[] = catchToHaul(logbook, expansionType);
    const reviewCatch: any[] = catchToHaul(review, expansionType);
    set(result, 'logbookCatch', logbookCatch);
    set(result, 'thirdPartyReviewCatch', reviewCatch);
    return result;
}

function catchToHaul(catchVals: Catches, expansionType: ExpansionType) {
    const results: any[] = [];
    for (const haul of get(catchVals, 'hauls', [])) {
        for (const catchVal of get(haul, 'catch', [])) {
            const count = catchVal.speciesCount ? catchVal.speciesCode : null;
            results.push({
                disposition: catchVal.disposition,
                haulNum: haul.haulNum,
                weight: catchVal.weight,
                count,
                speciesCode: catchVal.speciesCode,
                expansionType,
                startDepth: haul.startDepth,
                startLatitude: haul.startLatitude,
                startLongitude: haul.startLongitude,
                endDepth: haul.endDepth,
                endLatitude: haul.endLatitude,
                endLongitude: haul.endLongitude,
                gearType: haul.gearTypeCode,
                fisherySector: catchVals.fisherySector,
                // fishery
                // ifqSpeciesGroupName
                // fishingArea
                createDate: moment().format()
            })
        }
    }
    return results;
}