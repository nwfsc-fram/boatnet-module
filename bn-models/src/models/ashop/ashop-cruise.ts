// A-SHOP Cruise
import { Base } from '../_base';
import { PersonAlias, Vessel } from '../_lookups/index';
import { BoatnetDate, CouchID, LocationEvent } from '../_common/index';

export const AshopCruiseTypeName = 'ashop-cruise';

declare type AshopContact = PersonAlias;

interface NonFishingDay {
  date?: BoatnetDate;
  reason?: string;
  notes?: string;
  location?: LocationEvent;
  inTrip?: boolean;
  tripId?: CouchID;
}

export interface AshopCruise extends Base {
  cruiseNum?: number; // friendly cruiseId
  vessel?: Vessel;
  trips?: CouchID[]; // Trip/ Set UUID's
  debriefer?: AshopContact; // After cruise is done
  observers?: AshopContact[];
  nonFishingDays?: NonFishingDay[];
  startDate?: BoatnetDate;
  endDate?: BoatnetDate;
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
  }],
  "nonFishingDays": [{
    "date": "2019-10-16T08:57:54-07:00",
    "reason": "Other (notes)",
    "notes": "Too much rain",
    "location": {
      "format": "DD",
      "rawInputLocation": [77.5083, 164.1598]
    },
    "tripNum": 1,
    "tripId": "784c4a014bbf175ce136b4bac3069828"
  }],
  "startDate": "2019-10-23T08:57:54-07:00",
  "endDate": "2019-10-28T08:57:54-07:00"
}
*/
