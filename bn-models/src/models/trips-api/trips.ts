import { Base } from '../_base/base';

export interface Trips extends Base {
    tripId?: number;
    vesselId?: string;
    vesselName?: string;
    departurePort?: string;
    returnPort?: string;
    departureDate?: string;
    returnDate?: string;
    fishery?: string;
    permits?: string[];
    captain?: string;
  }