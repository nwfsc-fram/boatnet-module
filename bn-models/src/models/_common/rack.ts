import { Base } from '../_base/base';

export const RackType: string = 'rack';

export interface Rack extends Base {
  rackId?: number;
  rackName?: string;
  dissectionType?: string;
  rackLocation?: string;
  speciesId?: number;
  rackColumns?: number;
  rackRows?: number;
}
