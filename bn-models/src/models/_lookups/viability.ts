import { BaseLookup } from '../_base';
import { BoatnetDate } from '../_common';

export const ViabilityTypeName = 'viability';

export interface Viability extends BaseLookup {
  legacy?: {
    programId?: number;
    active?: boolean;
    sortOrder?: number;
    lookupId?: number;
    obsprodLoadDate?: BoatnetDate;
    lookupType?: string;
  };
}
