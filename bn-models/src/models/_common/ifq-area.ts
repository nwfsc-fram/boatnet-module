import { Base } from '../_base/base';
import { Taxonomy } from '../_lookups/taxonomy';
import { CatchGrouping } from '../_lookups/catch-grouping';

export const IfqAreaTypeName = 'ifq-area';

export interface IfqArea extends Base {
  upperLatitude?: number; // upper lat. bound for grouping, replaces FISHING_AREA code
  lowerLatitude?: number; // upper lat. bound for grouping, replaces FISHING_AREA code
  catchGroupings?: CatchGrouping[]; // array w. all related groupings
  taxonomies?: Taxonomy[]; // array w. all related taxonomies
  legacy?: {
    fishingAreaIds: number[];
    ifqSpeciesGroupingIds: number[];
  };
}
