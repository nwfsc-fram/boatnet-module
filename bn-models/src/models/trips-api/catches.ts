import { Base } from '../_base/base';
import { BoatnetDate } from '../_common/index';

export interface Catches extends Base {
    tripNum?: number;
    source?: string;
    logbookPageNumber?: number;
    fisherySector?: string;
    year?: string;
    vesselName?: string;
    vesselNumber?: string;
    permitNumber?: string;
    isEFPTrip?: boolean;
    isObserved?: boolean;
    crewSize?: number;
    departureDateTime?: BoatnetDate;
    departureState?: string;
    departurePortCode?: string;
    returnDateTime?: BoatnetDate;
    returnPortState?: string;
    returnPortCode?: string;
    buyers?: string[];
    isSigned?: boolean;
    skipperName?: string;
    fishTicketNumber?: string[];
    fishTicketDate?: BoatnetDate;
    comment?: string;
    submissionDateTime?: BoatnetDate;
    resubmission?: boolean;
    provider?: string;
    reviewerName?: string;
    totalReviewTime?: string;
    hauls?: Haul[];
  }
  
interface Haul {
    haulNum?: number;
    deliveryDate?: BoatnetDate;
    gearTypeCode?: string;
    gearPerSet?: number;
    gearLost?: number;
    avgHooksPerSeg?: number;
    startDateTime?: BoatnetDate;
    startDepth?: number;
    startLatitude?: number;
    startLongitude?: number;
    endDateTime?: BoatnetDate;
    endDepth?: number;
    endLatitude?: number;
    endLongitude?: number;
    codendCapacity?: number;
    comments?: string;
    targetStrategy?: string;
    systemPerformance?: number;
    catchHandlingPerformance?: number;
    catch?: Catch[];
}

interface Catch {
  catchId?: number;
  disposition?: string;
  fate?: string;
  speciesCode?: string;
  weight?: number;
  speciesCount?: number;
  calcWeightType?: string;
  length?: number;
  timeOnDeck?: number;
  comments?: string;
  screenShotId?: string;
  screenShotDescription?: string;
}
