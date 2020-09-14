import { BaseLookup } from '../_base';
import { BoatnetDate } from '../_common';

export const ProgramTypeName = 'program';

export interface Program extends BaseLookup {
  name?: string;
  // description?: string;
}
