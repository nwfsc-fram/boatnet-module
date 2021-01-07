import { BaseLookup, Legacy } from '../_base';
import { MarineDebris } from './marine-debris';
import { TaxonomyAlias } from './taxonomy-alias';

export const CatchGroupingTypeName = 'catch-grouping';
declare type GroupDefinition = string; // TODO Lookup - define these

/*
CatchGrouping Type
  - Species
     -- Management Group - IFQ, FMP, etc
     -- Multi Species Group - blue/deacon, vermilion/sunset, etc.
  - Marine Debris
*/

export interface CatchGrouping extends BaseLookup {
  name: string;
  code?: string; // arbitrary code by which this is known by from various programs/systems
  members?: TaxonomyAlias[] | MarineDebris[]; // Could be an empty member list (e.g. sharks)
  parentTaxonomy?: TaxonomyAlias;
  definition?: GroupDefinition;
  isEmExpandable?: boolean;
  isTargetStrategy?: boolean;  // is grouping used as a 'target strategy' on logbooks.

  // managementArea: ManagementArea;
  wcrIfqSpeciesGroupId?: number;
  isInactive?: boolean;

  // CHANGES:
  pacfinSpeciesCode?: string; // moved from taxonomy
  wcgopSpeciesCode?: number;

  // ETL Note - Only for multi-species catch categories
  legacy?: CatchGroupingLegacy;
}

interface CatchGroupingLegacy extends Legacy {
  wcgopCatchCategoryCode?: string;
  wcgopCatchCategoryId?: number;
}

/*
Taxonomy Tasks
1. Categorize the types of potential CatchGroupings (Beth)
3. ETL Taxonomy records (Nick)
4. Learn how to ETL in TypeScript + Visual Studio Code (Beth)

Questions
- TaxonomyAlias - multiple unidentified for both Marine Debris + Taxonomy


*/
