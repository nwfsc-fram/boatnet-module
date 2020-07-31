
import { Base } from '../_base/index';
import { CatchDisposition, WeightMethod } from '../_lookups';
import { Measurement, BoatnetDate } from '../_common';
import { WcgopDiscardReason } from './wcgop-discard-reason';
import { WcgopCatchNew } from './wcgop-catch-new';
import { WcgopExpansions } from './wcgop-expansions';

export const DispWMGroupTypeName = 'disp-wm-group';

export interface DispWMGroup extends Base {
    disposition: CatchDisposition;
    weightMethod: WeightMethod;
    measuredWeight?: Measurement;
    calculatedWeight?: Measurement; // should this value be stored, or always calculated?
    count?: number;
    expansionData?: WcgopExpansions;  // do any expansions get performed on the entire wm/disp?

    ratio?: number; // decimal representation

    catchItems: WcgopCatchNew[]

    legacy?: {
        catchCategoryId?: number;
        catchCategoryName?: string;
        catchCategoryCode?: string;
        catchPurity?: string;

        obsProdLoadDate?: BoatnetDate;
    }
}