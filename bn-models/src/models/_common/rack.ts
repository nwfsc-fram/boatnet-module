import { Base } from '../_base/base';
import { BiospeciesLocation, BiostructureType } from '../_lookups'

export const RackType = 'rack';

export interface Rack extends Base {
  rackId?: number;
  rackName?: string;
  dissectionType?: BiostructureType;
  rackLocation?: BiospeciesLocation;
  speciesId?: RackSpecies;
  rackColumns?: number;
  rackRows?: number;
}
interface RackSpecies {
  _id?: string;
  commonNames?: string[];
  wcgopSpeciesId?: number;
}