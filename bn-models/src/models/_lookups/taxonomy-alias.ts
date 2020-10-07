import { BaseLookup } from '../_base/index';
import { Taxonomy } from './taxonomy';

export const TaxonomyAliasTypeName = 'taxonomy-alias';

declare type AliasType = string; // Lookup
declare type Lifestage = string; // eggs, juvenile, adult
declare type Condition = string; // Might want a different name, this is for decomposed, etc.

export interface TaxonomyAlias extends BaseLookup {
  taxonomy: Taxonomy; // Use this instead of _id for clarity except for top level record
  alias: string; // Rockfish, Canary


  // Possible for multiple unid's (purple v. blue corals)
  // fieldDefinition?: string; // REVIEW REVIEW REVIEW
  isFieldDefinition?: boolean; // custom record added in the field, typically

  // purple v. red anemonae
  // for unid species, like coral #1, coral #2


  wcrIfqSpeciesGroupId?: number;  // From OBSPROD IFQ_SPECIE_GROUPING table
  // may end different


  // CHANGES:
  isEMExpandable?: boolean;
  isEMProtected?: boolean;
  isPriority?: boolean;
  pacfinSpeciesCode?: string; // moved from taxonomy
  commonNames?: string[]; 
  wcgopSpeciesCode?: number;

  //lifestage?: Lifestage; // remove, will go into catch document as individual lookup

  // Groupings at the catch level
  // condition?: Condition; // such as Crushed (for urchins), decomposed, regurgitated
  //    this will go into catch document as individual lookup

  // aliasType: AliasType; // Lookup - Common Name, WCGOP Tally Short Code, Pacfin Species Code, etc.
  //    no longer relevant, replaced with list of all possible aliases

  // QUESTION - What about those species that don't have a taxonomy?
  //    for new species recognized by the NWFSC science teams not yet in itis, 
  //    new taxonomy documents will be created as place holders until further defined







  // Program-specific indicators - now in BaseLookup
  // isAshop?: boolean;
  // isWcgop?: boolean;
  // isTrawlSurvey?: boolean;
  // isHakeSurvey?: boolean;
  // isHookAndLineSurvey?: boolean;
}
