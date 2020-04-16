// Unique fields of WCGOP trips
import { BaseTrip } from '../_base/base-trip';
import {
  Certificate,
  BoatnetDate,
  SightingEvent,
  InteractionEvent,
  Waiver
} from '../_common/index';

import { WcgopFishTicket } from './index';
import { BrdConfiguration } from '../_common/brd-configuration';
import { PersonAlias, Fishery, FirstReceiver, VesselLogbookType,
  TripStatus, GearType, Program } from '../_lookups/index';
import { Score } from '../_common/enums';

export const WcgopTripTypeName = 'wcgop-trip';

export interface WcgopTrip extends BaseTrip {
  gearType?: string;
  observer?: PersonAlias; // formerly User ID, TODO Specifics
  program?: Program;
  isPartialTrip?: boolean;
  fishingDays?: number;
  fishery?: Fishery;
  crewSize?: number;
  firstReceivers?: FirstReceiver[]; // FR lookups are in Permits DB
  logbookNum?: number;
  logbookType?: VesselLogbookType;
  observerLogbookNum?: number;
  isFishProcessed?: boolean;
  tripStatus?: TripStatus;
  debriefer?: PersonAlias;
  isSelected?: boolean;

  sightingEvents?: SightingEvent[];
  interactionEvents?: InteractionEvent[]; // TODO
  brd?: BrdConfiguration[];

  fishTickets?: WcgopFishTicket[];
  certificates?: Certificate[]; // Permits and Licenses
  waiver?: Waiver[];
  intendedGearType?: GearType; // only for when there is no Haul data (no fishing activity)
  tripScore?: Score // defaults to true (passed) and debriefer can change it to false (failed)
  legacy?: {
    tripId?: number;
    otcKp?: number;
    totalHooksKp?: number;
    export?: number; // status of expansion, ETL to isExpanded
    runTer?: boolean;
    evaluationId?: number; // TODO Evaluation parent
    permitNum?: string; // ETL to Certificate
    licenseNum?: string; // ETL to Certificate
    isNoFishingActivity?: boolean; // did fishing NOT occur?

    obsprodLoadDate?: BoatnetDate;
  };
}
