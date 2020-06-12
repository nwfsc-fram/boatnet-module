import { BaseLookup } from '../_base';
import { BoatnetDate } from '../_common';

export const WeightMethodTypeName = 'weight-method';

export enum WeightMethodValue {
  basketWeightDetermination = 3,
  OTCRetained = 5,
  other = 6,
  vesselEstimatedRetainedOnly = 7,
  extrapolation = 8,
  pacificHalibutLengthWeightConveresion = 9,
  visualExperience = 14,
  visualSpatial = 15,
  pacificHalibutLengthWeightExtrapolation = 19,
  actualWeightWholeHaul = 20,
  actualWeightSubsample = 21
}

export interface WeightMethod extends BaseLookup {
  // description?: string;

  legacy?: {
    lookupVal?: WeightMethodValue;
    programId?: number;
    active?: boolean;
    sortOrder?: number;
    lookupId?: number;
    obsprodLoadDate?: BoatnetDate;
    lookupType?: string;
  };
}
