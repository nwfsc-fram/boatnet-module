import { BoatnetDate, LocationEvent } from '../_common/index';

export interface NonFishingDay {
    date?: BoatnetDate;
    reason?: string;
    location?: LocationEvent;
}

/* Example doc
 "nonFishingDays": {
    "date": "2019-10-16T08:57:54-07:00",
    "reason": "Weather",
    "location": {
      "format": "DD",
      "rawInputLocation": [77.5083, 164.1598]
    }
  }
 */