import { BaseLookup } from '../_base';

export const ErrorTypeTypeName = 'error-type';

// Source - OBSPROD.LOOKUPS.FISHING_AREA
export interface ErrorType extends BaseLookup {
    // from Base
    // createdBy?: string;
    // createdDate?: string;
    // updatedBy?: string;
    // updatedDate?: string;

    // from BaseLookup
    // description?: string;
    // isActive?: boolean;
    // isAshop?: boolean;
    // isWcgop?: boolean;
    // isTrawlSurvey?: boolean;
    // isHakeSurvey?: boolean;
    // isHookAndLineSurvey?: boolean;
    // isEm?: boolean;
    checkCode?: number;
    onEntry?: boolean;
    tripCheck?: boolean;
    checkType?: string;
}