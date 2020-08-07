import { Trips } from '../../../bn-models/src/models/trips-api/trips';
import { ResponseCatch } from '../../../bn-models/src/models/trips-api/response-catch';
import { Catches } from '../../../bn-models/src/models/trips-api/catches';

export interface emExpansions {
    //logbookExpansions(trips: Trips) : ResponseCatch;
    rulesExpansions(trip: Trips, catches: Catches) : ResponseCatch;
}
