/*

  Fisheries

  Lookup describing a distinct fishery, with booleans denoting which programs use the lookup,
  whether the fishery is permitted, etc.

  ETL from OBSPROD.LOOKUPS.LOOKUP_TYPE = FISHERIES and ACTIVE IS NULL

  Permits exists for a given, single Fishery
  Permit is associated with a:
  - vessel or
  - person (CA nearshore) (pocket permit)
    -- person can walk onto any vessel at any time
  - endorsement (WA pink shrimp) (effectively a vessel permit)

  Open Access - West Coast Groundfish Open Access Fixed Gear (WCOA)
  - No open access trawling in federal waters
  - Need a more expanded FG GEAR TYPE than what's in OBSPROD.LOOKUPS.FG_GEAR_TYPE

  - any number of species that can be targeted, with nothing
    more than a commercial fishing license
  - The state has not increased regulation and federal
    regulation is that anyone can do it, but there is a amount limit
  - Species include (4 of primary interest of WCGOP):
    -- Sablefish
    -- Lingcod
    -- Thornyhead (mostly short)
    -- Rockfish
    -- Sanddab

    Others
    -- Minor Slope Rockfish / Dark-blotched Rockfish
    -- Pacific Ocean Perch
    -- Short Spine Thornyhead
    -- Longspine Thornyhead
    -- Dover sole, etc.
    -- Pacific hake
    -- Minor Shelf Rockfish
    -- Yellowtail Rockfish
    -- etc.

*/

import { BaseLookup } from '../_base';
import { FisherySector } from './fishery-sector';

// TODO Full implementation
export const FisheryTypeName = 'fishery';
export type Sector = object; // sector lookups
export type GovernmentOrganization = string;

export enum governmentOrganization {
  noaaFisheries = 'NOAA Fisheries',
  odfw = 'ODFW',
  wdfw = 'WDFW',
  cdfw = 'CDFW',
  iphc = 'IPHC'
}

export interface Fishery extends BaseLookup {
  // description?: string;
  // lookupValue?: string;
  organization?: governmentOrganization;

  // isActive?: boolean;
  // isEm?: boolean;  // vessel is participating in the fishery using EM gear
  isIfq?: boolean;
  isEfp?: boolean; // is a pilot program
  isOpenAccess?: boolean; // does not require a permit to fish
  isLimitedEntry?: boolean; // restricted access
  isFederal?: boolean; // permit is federal
  isState?: boolean; // permit is state

  sectors?: FisherySector[]; // array of all valid sectors (if any) for the fishery

  // legacy?: {
  //   lookupVal?: number;
  //   programId?: number;
  //   ...
  // };
}

/*

  {
    description: 'LE Sable Fixed Gear EM',
    lookupValue: 'LE Sable Fixed Gear EM',
    organization: 'NOAA Fisheries',
    isActive: true,
    isEm: true,
    isIfq: true,
    isEfp: false,
    isFederal: true,
    isLimitedEntry: true,
    sectors: [{description: 'Tier fishery (1, 2, 3)'}, {description: 'Zero Tier'}],
    legacy: {
      lookupVal: "2",
      programId: 1,
      lookupId: 586,
      lookupType: "FISHERY"
    }
  }

*/
