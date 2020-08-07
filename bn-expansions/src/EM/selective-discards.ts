import { emExpansions} from '../base/em-rule-base';
import { Trips } from '../../../bn-models/src/models/trips-api/trips';
import { Catches } from '../../../bn-models/src/models/trips-api/catches';
import { ResponseCatch } from '../../../bn-models/src/models/trips-api/response-catch';

class selectiveDiscards implements emExpansions {
    rulesExpansion(trip: Trips, catches: Catches): ResponseCatch {
        console.log('hello')
        return {};
    }
}