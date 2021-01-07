import { BaseLookup, Legacy } from '../_base';
import { CatchGrouping } from './catch-grouping';

export const TargetCatchGroupingTypeName = 'target-catch-grouping';

/*

target-catch-grouping documents exist to represent groupings that are valid target strategies
but should not be used as catch-groupings.  Currently they're identical to catch-grouping docs, with the exception of
their membership not being populated.  Program specific attributes may be added target-catch-grouping in the future.

*/

export interface TargetCatchGrouping extends CatchGrouping {
    // no unique attributes, yet.
}

