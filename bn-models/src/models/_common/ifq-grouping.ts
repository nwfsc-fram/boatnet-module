import { Base } from '../_base/base';
import { Taxonomy } from '../_lookups/taxonomy';
import { CatchGrouping } from '../_lookups/catch-grouping';

export const IfqGroupingTypeName = 'ifq-grouping';

/* 
used to translate species/grouping to IFQ management grouping for in-season VAS reporting and expansions
Example:
  Sablefish (4fa0ab1f2ccf04160ab89da3e3b14d77) caught at latitude 40.266667 in 2020 --> "Sablefish north"
*/
export interface IfqGrouping extends Base {
  ifqGrouping?: string; // name used by IFQ for mgmt groupings, see IFQ_SPECIE_GROUPINGS in ORACLE
  regulationYear?: number; // groupings will be refreshed each year, possible they can change
  upperLatitude?: number; // upper lat. bound for grouping, replaces FISHING_AREA code
  lowerLatitude?: number; // upper lat. bound for grouping, replaces FISHING_AREA code
  groupings?: CatchGrouping[]; // array w. all related groupings
  taxonomies?: Taxonomy[]; // array w. all related taxonomies
}
