import { BaseLookup } from '../_base';
import { BoatnetDate } from '../_common';

export const MaturityTypeName = 'maturity';

export interface Maturity extends BaseLookup {
  legacy?: {
    programId?: number;
    active?: boolean;
    sortOrder?: number;
    lookupId?: number;
    obsprodLoadDate?: BoatnetDate;
    lookupType?: string;
  };
}