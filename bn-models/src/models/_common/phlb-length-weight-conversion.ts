import { Base } from '../_base';

export const phlbLengthWeightConversion = 'phlb-length-weight-conversion';

export interface PHLBLengthWeightConversion extends Base {
  id?: number;
  speciesId?: number;
  length?: number;
  width?: number;
}
