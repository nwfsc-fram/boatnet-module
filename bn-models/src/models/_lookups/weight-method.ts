import { BaseLookup } from '../_base';

export const WeightMethodTypeName = 'weight-method';

export enum WeightMethodValue {
  basketWeightDetermination = 3,
  OTCRetained = 5,
  other = 6,
  vesselEstimatedRetainedOnly = 7,
  extrapolation = 8,
  pacificHalibutLengthWeightConveresion = 9,
  tallySample = 13,
  visualExperience = 14,
  visualSpatial = 15,
  pacificHalibutLengthWeightExtrapolation = 19,
  actualWeightWholeHaul = 20,
  actualWeightSubsample = 21
}

export type WeightMethod = BaseLookup;
