// A-SHOP Trip
import { BaseTrip } from '../_base/base-trip';
import {
  BoatnetDate,
  SightingEvent,
  InteractionEvent,
  BrdConfiguration
} from '../_common/index';

import { PersonAlias, Fishery, VesselType } from '../_lookups/index';

export const AshopTripTypeName = 'ashop-trip';

// unique A-SHOP Observer/ Debriefer
declare type AshopContact = PersonAlias;

interface LostHours {
  hours?: number;
  code?: string;
}

export interface AshopTrip extends BaseTrip {

  /*  From BaseTrip, show the following columns:
      tripNum
      vessel
      departureDate
      returnDate
  */
  fishingDays?: number; // calculated
  fishery?: Fishery; // default to A-SHOP
  crewSize?: number;
  didFishingOccur?: boolean;

  sightingEvents?: SightingEvent[];
  ineractionEvents?: InteractionEvent[]; // todo

  brd?: BrdConfiguration[];
  // TODO include Bird Detterence?

  vesselType?: VesselType;
  legacy?: {
    cruiseNum?: number;
    tripSeq?: number;
    cruiseVesselSeq?: number;
    portCode?: number;
    fishingTimeLostHours?: LostHours[];
  };
}
