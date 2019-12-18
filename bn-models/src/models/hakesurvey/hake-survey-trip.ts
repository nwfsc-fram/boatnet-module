// Unique fields of WCGOP trips
import { BaseTrip } from '../_base/base-trip';
import { PersonAlias, Fishery, FirstReceiver, VesselLogbookType, TripStatus, GearType } from '../_lookups/index';
import { BoatnetDate } from '../_common';

export const HakeSurveyTripTypeName = 'hake-survey-trip';

export interface HakeSurveyTrip extends BaseTrip {
  cruiseNum: number // 6-digit - YYYY + CC (cruise #)
  scienceCrew?: PersonAlias[];
  plannedDepartureDate?: BoatnetDate;
  plannedReturnDate?: BoatnetDate;

}
