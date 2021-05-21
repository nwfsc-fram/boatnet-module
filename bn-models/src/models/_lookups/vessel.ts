// TODO Full implementation
import { Port } from './port';
import { Base, BaseLookup } from '../_base';
import { VesselType } from './vessel-type';
import { VesselStatus } from './vessel-status';
import { BoatnetDate, Measurement, CouchID } from '../_common/index';
import { Media } from './media';
import { Permit } from './permit';
import { Fishery } from './fishery';

export const VesselTypeName = 'vessel';

interface SafetyMeasure extends Base {
  safetyType: string; // - lookup - CPR, Wheel watch, Equipment, Emergency Instructions
  equipmentDescription: string;
  // lookup - liferaft, EPIRB, Flare, Fire Extinguisher, PFD Type 4, Decal
  count?: number;
  location?: string; //
  expirationDate?: BoatnetDate;
}

export interface VesselPortAssignment {
  port?: Port;
  startDate?: BoatnetDate;
  endDate?: BoatnetDate;
}
export interface Vessel extends BaseLookup {
  vesselName?: string;
  vesselType?: VesselType;
  permits?: Permit[]; // IPHC will be considered a permit
    // Note - everyone has access to Federal WC OA FG fishery
  homePort?: Port;
  tempPort?: VesselPortAssignment;
  coastGuardNumber?: string;
  stateRegulationNumber?: string;
  registeredLength?: Measurement;
  vesselStatus?: VesselStatus;
  safetyMeasures?: SafetyMeasure[]; // 30+ items
  media?: Media[];
  isActive?: boolean;
  emHardware?: string;
  thirdPartyReviewer?: string;
  passCode?: string; // user must supply correct vessel passcode to gain access to vessel.

  // TODO store crew at Vessel level?
  legacy?: {
    vesselId?: number;
    obsprodLoadDate?: BoatnetDate;
    safetyDecalExpiration?: BoatnetDate; // replace by the Safety Checklist
  };
}
