import { Base } from '../_base/base';
import { Taxonomy } from '../_lookups/taxonomy';
import { CatchGrouping } from '../_lookups/catch-grouping';

export const IfqGroupingTypeName = 'ifq-grouping';

export interface IfqGrouping extends Base {
  ifqGrouping?: string;
  regulationYear?: number;
  upperLatitude?: number;
  lowerLatitude?: number;
  groupings?: CatchGrouping[];
  taxonomies?: Taxonomy[];
}
