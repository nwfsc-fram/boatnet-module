import { Base } from '../_base/base';
import { BoatnetDate } from '../_common/index';
import { Disposition } from '../_common/enums'

export enum sourceType {
  logbook = 'logbook',
  thirdParty = 'thirdParty',
  nwfscAudit = 'nwfscAudit'
}

export enum errorType {
  warning = 'warning',
  showStopper = 'showStopper',
}

export interface Catches extends Base {
    tripNum?: number;
    source?: sourceType;
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
    fishTickets?: FishTicket[];
    comment?: string;
    submissionDateTime?: BoatnetDate;
    resubmission?: boolean;
    provider?: string;
    reviewerName?: string;
    totalReviewTime?: string;
    hauls?: Haul[];
    updatedBy?: string;
    errors?: Error[];
    revision? : number;
    history?: Catches[];
  }

  interface Error {
    message?: string;
    field?: string;
    type?: errorType;
    haulNum?: number;
    catchId?: string;
  }

  interface FishTicket {
    fishTicketNumber?: string;
    fishTicketDate?: string;
  }

interface Haul {
    haulNum?: number;
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
    isCodendLost?: boolean;
    comments?: string;
    targetStrategy?: string;
    systemPerformance?: number;
    catchHandlingPerformance?: number;
    catch?: Catch[];
}

export interface Catch {
  catchId?: number;
  disposition?: Disposition;
  fate?: string;
  speciesCode?: string | number;
  speciesWeight?: number;
  speciesCount?: number;
  calcWeightType?: string;
  speciesLength?: number;
  timeOnDeck?: number; // minutes
  comments?: string;
  screenShotId?: string;
  screenShotDescription?: string;
  isWcgopEmPriority?: boolean;
  isProtected?: boolean;
}
