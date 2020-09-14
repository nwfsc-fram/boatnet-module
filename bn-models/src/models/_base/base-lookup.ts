
import { Base } from './base';
import { BoatnetDate } from '../_common';

export interface BaseLookup extends Base  {

    description?: string;
    lookupValue?: string;
    isActive?: boolean;

    isAshop?: boolean;
    isWcgop?: boolean;
    isTrawlSurvey?: boolean;
    isHakeSurvey?: boolean;
    isHookAndLineSurvey?: boolean;
    isCommon?: boolean;
    legacy?: Legacy;
    isEM?: boolean;
}

export interface Legacy {
    lookupVal?: number;
    active?: boolean;
    programId?: number;
    sortOrder?: number;
    lookupId?: number;
    obsprodLoadDate?: BoatnetDate;
    lookupType?: string;
}