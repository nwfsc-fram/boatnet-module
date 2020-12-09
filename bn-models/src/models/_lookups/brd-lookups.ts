import { BoatnetDate } from '../_common';
import { Base } from '../_base';
import { Species } from './species';

export const BrdTargetTypeName = 'brd-target-type';

export type BrdColor = string; // TODO lookup
export type BrdPattern = string; // TODO lookup
export type BrdManufacturer = string; // TODO lookup
export type BrdLocation = string; // TODO lookup
export type BrdMeshType = string; // TODO lookup

// TODO maybe make generic types
// export type BrdComponentTypes = [
//   'light',
//   'escapement',
//   'sortingGrate',
//   'modifiedCodendMeshConfig',
//   'trawlDoorModConfig',
//   'otherConfig'
//   // ...
// ];

// TODO - Jason to provide a list of strategy types
export type BrdStrategyType = string; // TODO Lookup

export interface BrdLight {
  targets?: Species[] | BrdTarget[];

  numLightsSingleRigged?: number;
  numLightsDoubleRiggedPort?: number;
  numLightsDoubleRiggedStarboard?: number;

  colors?: BrdColor[]; // Usually Green
  locations?: BrdLocation[];

  legacy?: {
    manufacturer?: BrdManufacturer[];
    pattern?: BrdPattern[];
  };
}

// This devices has openings allowing certain species to escape
// while other pass through the net into the codend.
export interface BrdEscapement {
  targets?: Species[] | BrdTarget[]; // species BRD intends to exclude
  locations?: BrdLocation[]; // where holes/windows are found
  isIlluminated?: boolean; // lights used on or near the opening?
}

// Grates/grids used to sort fish. Required in Pink Shrimp fishery
// to reduce rockfish bycatch. Also working on designs to exclude salmon,
// pacific halibut, and other speices in trawl fisheries.
export interface BrdSortingGrateGrid {
  // TODO May be required to collect
  targets?: Species[] | BrdTarget[]; // species BRD indends to exclude
  locations?: BrdLocation[]; // where sorting grids placed
  isIlluminated?: boolean; // lights used on or near the opening of the grates escapement hole
}

// Allows smaller fish to escape when codend is stretched
export interface BrdModifiedCodendMesh {
  targets?: Species[] | BrdTarget[];
  meshType?: BrdMeshType[];
}

export interface BrdTrawlDoorModification {
  targets?: Species[] | BrdTarget[];
}

export interface BrdOther {
  targets?: Species[] | BrdTarget[];
  locations?: BrdLocation[];
  comment?: string;
}

export interface BrdStreamerLine {
  // Seabird-only
  targets?: Species[] | BrdTarget[];
  locations?: BrdLocation[];
  numStreamLines: number;
  numFloats: number;
  numWeights: number;
  isFixedHooksAerialExtentLessThan40m?: boolean;
  isSnapGearAerialExtentLessThan20m?: boolean;
  isSnapGearHorDistLessThan2m?: boolean;
  comment?: string;
}

export interface BrdBuoyLine {
  // Seabird-only
  targets?: Species[] | BrdTarget[];
  locations?: BrdLocation[];
  numBuoyLines: number;
  numFloats: number;
  numWeights: number;

  comment?: string;
}

export interface BrdSnatchBlock {
  // Seabird-only
  targets?: Species[] | BrdTarget[];
  locations?: BrdLocation[];
  comment?: string;
}

export interface BrdWaterSprayer {
  // Seabird-only
  targets?: Species[] | BrdTarget[];
  locations?: BrdLocation[];
  comment?: string;
}

export interface BrdWarpBoom {
  // Seabird-only
  targets?: Species[] | BrdTarget[];
  locations?: BrdLocation[];
  comment?: string;
}

export interface BrdLineWeighting {
  targets?: Species[] | BrdTarget[];
  locations?: BrdLocation[];
  isIntegratedWeightLine?: boolean;
  isAddedWeightLine?: boolean;
  comment?: string;
}

export interface BrdTarget extends Base {
  // From LOOKUPS
  value: string;
  // ETL Note: remove legacy, leading Alpha character
  // Salmon
  // Eulachon
  // PHLB
  // Rockfish
  // Flatfishes
  // Seabirds
  // Other

  legacy?: {
    description?: string;
    lookupVal?: string;
    programId?: number;
    active?: boolean;
    sortOrder?: number;
    lookupId?: number;
    obsprodLoadDate?: BoatnetDate;
    lookupType?: string;
  };
}
