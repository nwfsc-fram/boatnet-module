import { BaseLookup } from '../_base';

export const nonFlowScaleReasonCode = 'non-flow-scale-reason';

export interface nonFlowScaleReasonCode extends BaseLookup {
    reason: string
}

/* Example doc 
{
  "_id": "6ec983c88220cad5c56c5a94a3d8670f",
  "_rev": "2-13da8e51779e3b751dd7679d35d0dcf6",
  "type": "non-flow-scale-reason",
  "reason": "CV DISCARD",
  "isActive": "true",
  "isAshop": "true"
}
*/