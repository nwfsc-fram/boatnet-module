import { BaseContainer } from '../_base/index';
import { BoatnetDate } from '.';

export const BasketTypeName = 'basket';

export interface Basket extends BaseContainer {
  isPartial?: boolean;

  legacy?: {
    speciesCompItemId?: number;
    speciesCompBasketId?: number;
    obsprodLoadDate?: BoatnetDate;
  };
}
