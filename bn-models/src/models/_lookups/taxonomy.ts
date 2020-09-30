import { Base } from '../_base/index';
import { BoatnetDate, CouchID } from '../_common';
import { TaxonomyAlias } from './taxonomy-alias';

export const TaxonomyTypeName = 'taxonomy';

declare type TaxonomyLevel = string; // TODO Lookup
export type TaxonomyId = CouchID;

// Each taxonomic record will be in a different document
export interface Taxonomy extends Base {
  taxonomyId: TaxonomyId; // Use this instead of _id for clarity except for top level record
  level: TaxonomyLevel;
  taxonomyName: string; // name at the given level, i.e. Sebastes, etc.
  scientificName?: string; // species and below concatenation/population (species + subspecies, etc.)
  children?: TaxonomyId[];
  parent?: TaxonomyId;

  // TASK - Survey team investigate: (Beth/Nick to pursue)
  // 1. non-scientific name species
  // 2. cf entries - "seem to refer to ..."


  // QUESTION - What about for analysis?
  //   Do we need a flattened view of all of this?  How would that work?

  // WCGOP specific usage
  // wcgopTallyShortCode?: string; // moved to TaxonomyAlias
  // pacfinSpeciesCode?: string;  // This is used by EDC - moved to TaxonomyAlias

  // Obs Analysts - might be used by observer analysts, confirm
  // pacfinNomCode?: string; // when a landing does not have species comp

  // External species ID records / References
  // Priorities of us
  // fish - use AFS, everything else use ITIS

  afsId?: number; // Check if NWFSC has an AFS membership and if so, use this to get the IDs
  itisTSN?: number;
  wormsAphiaId?: number;

  legacy?: {
    wcgopSpeciesId?: number; // primary key
    ashopSpeciesId?: number; // NORPAC ID
    dwId?: number[]; // multiple warehouse records may refer to the same
                     // taxonomy due to structural changes in taxonomy data from ITIS
    raceBaseCodeNW?: number; // AFSC RaceBase code + 1 digit

    // changes:
    // wcgopSpeciesCode?: number; // 3-4 digit code, adopted from AFSC
    //      this is no longer in taxonomy, or in legacy, is actively used for EM purposes in taxonomy-alias
    // wcgopCatchCategoryCode?: string; // ETL Note - only for single species catch category codes

    // obsAnalystCode?: string; // ToDo - Kayleigh spreadsheet - remove
    // edcCode?: number; - remove
    
    // look into items that are pacfin only
  };
}
