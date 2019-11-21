import { BaseLookup } from '../_base';
import { BoatnetDate } from '../_common';

export const VesselStatusTypeName = 'vessel-status';

export interface VesselStatus extends BaseLookup {
  // description?: string;

  legacy?: {
    lookupVal?: number;
    programId?: number;
    active?: boolean;
    sortOrder?: number;
    lookupId?: number;
    obsprodLoadDate?: BoatnetDate;
    lookupType?: string;
  };
}
