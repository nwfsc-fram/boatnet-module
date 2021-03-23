
import { Base } from '../_base/index';
import { CatchDisposition, WeightMethod } from '../_lookups';
import { Measurement, BoatnetDate } from '../_common';
import { WcgopDiscardReason } from './wcgop-discard-reason';
import { WcgopCatch } from './wcgop-catch';
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

    catchItems: WcgopCatch[];

    legacy?: {
        catchCategoryId?: number;
        catchCategoryName?: string;
        catchCategoryCode?: string;
        catchPurity?: string;

        obsProdLoadDate?: BoatnetDate;
    };
}