// A-SHOP Trip
import { Base } from '../_base';
import { AshopTrip } from './ashop-trip';
import { PersonAlias, Vessel } from '../_lookups/index';
import { CouchID } from '../_common/index';
import { BoatnetDate, LocationEvent } from '../_common/index';

export const AshopCruiseTypeName = 'ashop-cruise';

declare type AshopContact = PersonAlias;

interface NonFishingDay {
  date?: BoatnetDate;
  reason?: string;
  location?: LocationEvent;
  tripId?: string;
}

export interface AshopCruise extends Base {
  cruiseNum?: string; // in addition to _id
  vessel?: Vessel;
  trips?: CouchID[]; // Trip/ Set UUID's
  debriefer?: AshopContact; // After cruise is done
  observers?: AshopContact[];
  nonFishingDays?: NonFishingDay[];
}

/* Example doc 
{
  "_id": "b3a7b71d1f22ba639a1edd20d318b264",
  "_rev": "1-769b0bedc6fe9e7c6b877b5f4e362571",
  "type": "ashop-cruise",
  "cruiseNum": "101",
  "vessel": {
    "vesselName": "Candi B"
  },
  "trips": ["55c04a898a1d021776390cf1e474b6bd"],
  "debriefer": {
    "firstName": "Marnie",
    "lastName": "McgGraw"
  },
  "observers": [{
    "firstName": "Russel",
    "lastName": "Adams"
  }, {
    "firstName": "Nathan",
    "lastName": "Bennett"
  }]
  "nonFishingDays": [{
    "date": "2019-10-16T08:57:54-07:00",
    "reason": "Weather",
    "location": {
      "format": "DD",
      "rawInputLocation": [77.5083, 164.1598]
    }
  }]
}
*/
