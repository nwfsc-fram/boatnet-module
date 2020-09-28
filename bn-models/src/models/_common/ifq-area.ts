import { Base } from '../_base/base';
import { TaxonomyAlias } from '../_lookups/taxonomy-alias';
import { CatchGrouping } from '../_lookups/catch-grouping';

export const IfqAreaTypeName = 'ifq-area';

export interface IfqArea extends Base {
  upperLatitude?: number; // upper lat. bound for grouping, replaces FISHING_AREA code
  lowerLatitude?: number; // upper lat. bound for grouping, replaces FISHING_AREA code
  catchGroupings?: CatchGrouping[]; // array w. all related groupings
  taxonomyAliases?: TaxonomyAlias[]; // array w. all related taxonomyAliases
  legacy?: {
    fishingAreaIds: number[];
    ifqSpeciesGroupingIds: number[];
  };
}
