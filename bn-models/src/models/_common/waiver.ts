import { Base } from '../_base';
import { WaiverType, WaiverReason, Fishery, Port, Vessel, Permit, Media } from '../_lookups';
import { BoatnetDate } from './boatnet-date';

export const WaiverTypeName = 'waiver';

export interface Waiver extends Base {
  reason: WaiverReason;
  waiverType: WaiverType;
  issueDate: BoatnetDate;
  startDate: BoatnetDate;
  endDate: BoatnetDate;
  vessel: Vessel; // you're always waiving a vessel
  fishery?: Fishery;
  certificateNumber?: Permit;
  landingPort?: Port;
  media?: Media[];

  // ETL Instructions
  // Select * from OBSPROD.LOOKUPS.LOOKUP_TYPE = 'WAIVER_REASON'
  //    nuke Not Active + Carry Over
}
