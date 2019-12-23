import { Base } from './base';

import {
  BoatnetDate,
  CouchID
} from '../_common/index';
import { Vessel, Port, PersonAlias } from '../_lookups/index';

export interface BaseTrip extends Base {
  tripNum?: number; // For internal use, sequential
  operationIDs?: CouchID[]; // Haul/ Set UUID's
  captain?: PersonAlias;
  vessel?: Vessel;
  crew?: PersonAlias[];
  // Do we want plannedDeparturePort?
  departureDate?: BoatnetDate;
  returnDate?: BoatnetDate;
  departurePort?: Port;
  returnPort?: Port;
  // Metadata
  isExpanded?: boolean;
  doExpand?: boolean; // should expand or not after manual calculation

  captainAffirmedDepartureDate?: BoatnetDate;
  captainAffirmedReturnDate?: BoatnetDate;
  closingReason?: string; // taken | cancelled

}
