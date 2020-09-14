import { BaseLookup } from '../_base';

export const WaiverTypeTypeName = 'waiver-type';

export type WaiverType = BaseLookup;
// notes:
// description?: string; // Trip, Selection Cycle, Coverage Period
// Selection Cycle = remainder of the year, remainder of 6-month cycle
// lookupVal?: number; // T, SC, CP