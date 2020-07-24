import { Base } from '../_base/base';
import { Taxonomy } from '../_lookups/taxonomy';
import { CatchGrouping } from '../_lookups/catch-grouping';
import { IfqArea } from './ifq-area';

export const IfqGroupingTypeName = 'ifq-grouping';

/* 
used to translate species/grouping to IFQ management grouping for in-season VAS reporting and expansions
Example:
  Sablefish (4fa0ab1f2ccf04160ab89da3e3b14d77) caught at latitude 40.266667 in 2020 --> "Sablefish north"
  IfqAreas array will store latitude bounds and taxonomies / groupings that apply
*/
export interface IfqGrouping extends Base {
  groupName?: string; // name used by IFQ for mgmt groupings, see IFQ_SPECIE_GROUPINGS in ORACLE
  regulationYear?: number; // groupings will be refreshed each year, possible they can change
  regulationAreas?: IfqArea[];
}
