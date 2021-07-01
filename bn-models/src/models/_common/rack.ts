import { Base } from '../_base/base';
import { BiospeciesLocation } from '../_lookups'

export const RackType = 'rack';

export interface Rack extends Base {
  rackId?: number;
  rackName?: string;
  dissectionType?: string;
  rackLocation?: BiospeciesLocation;
  speciesId?: number;
  rackColumns?: number;
  rackRows?: number;
}
