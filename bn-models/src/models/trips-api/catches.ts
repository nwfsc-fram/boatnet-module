import { Base } from '../_base/base';
import { BoatnetDate } from '../_common/index';
import { Disposition } from '../_common/enums';
import { netTypeLookupValueEnum } from './net-type';
import { gearTypeLookupValueEnum } from './gear';

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
    fisherySector?: string; // for review, accepted values: https://www.webapps.nwfsc.noaa.gov/trips/lookups#fishery-sector
    fishery?: string; // for logbook, accepted values: https://www.webapps.nwfsc.noaa.gov/trips/lookups#fishery
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
    gear?: gearTypeLookupValueEnum;
    netType?: netTypeLookupValueEnum; // required if gear = 'trawl'
    codendCapacity?: number;          // required if gear = 'trawl'
    isCodendLost?: boolean;           // required if gear = 'trawl'
    gearPerSet?: number;              // required if gear = 'hook & line', 'fish pot', or 'longline (snap)'
    gearLost?: number;                // required if gear = 'hook & line', 'fish pot', or 'longline (snap)'
    avgHooksPerSeg?: number;          // required if gear = 'hook & line', 'fish pot', or 'longline (snap)'
    startDateTime?: BoatnetDate;
    startDepth?: number;
    startLatitude?: number;
    startLongitude?: number;
    endDateTime?: BoatnetDate;
    endDepth?: number;
    endLatitude?: number;
    endLongitude?: number;
    comments?: string;
    targetStrategy?: string;
    systemPerformance?: number;
    catchHandlingPerformance?: number;
    catch?: Catch[];
}

export interface Catch {
  catchId?: number; // sequential catch index
  disposition?: Disposition; // was catch discared or retained
  fate?: string; // reason catch was discarded
  speciesCode?: string | number; // if source == logbook, must be string (pacfin code)
                                 // if source == thirdParty, must be a number (wcgop code)
  speciesWeight?: number;  // weight in LBs
  speciesCount?: number;  // count of catch
  calcWeightType?: string; // = estimatedWeight when speciesWeight is supplied,
                           // otherwise indicates how speciesWeight was calculated.
  speciesLength?: number;  // length of catch - only applicable if speciesCount <= 1
  timeOnDeck?: number; // minutes catch was on deck - PHLB/101 (Pacific Halibut) only
  comments?: string; // any comments relevant to catch species
  isWcgopEmPriority?: boolean; // indicates a priority species - auto-populated by tripsApi
  isProtected?: boolean; // indicates a protected species - auto-populated by tripsApi
}
