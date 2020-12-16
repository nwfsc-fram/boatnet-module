import { Base } from '../_base';
import { Fishery } from '../_lookups';
import { BoatnetDate, CouchID } from '../_common';
import { Vessel } from '../_lookups';

export const OTSTargetTypeName = 'ots-target';

export interface OTSTarget extends Base {
  fishery: string; // target is specific to a fishery, and may be scoped to a vessel or portGroup
  targetType: string;  // fishery, vessel, or portGroup
  targetVessel?: Vessel; // used if targetType is 'vessel'
  targetPortGroup?: any; // used if targetType is 'portGroup'
  coverageGoal?: number; // target % of trips within targetType to cover
  setRate?: number; // % number used in calculating whether to cover a trip (number used to achieve coverageGoal)
  effectiveDate?: BoatnetDate | undefined; // future targets can be set in advance, so they're given a date range
  expirationDate?: BoatnetDate | undefined; // last date the target is valid
  status?: string; // when a new ots-target supercedes an old one, the old target's status is set to "Inactive"
                        // Older ots-target docs may have status Active with an expirationDate in the past
}

/*
{
  type: "ots-target",
  fishery: "Electronic Monitoring EFP",
  coverageGoal: "35",
  setRate: "40",
  effectiveDate: "2019-05-30T20:38:18-07:00",
  exprirationDate: "2020-01-01T20:38:18-07:00",
  status: "Active",
  targetType: "vessel",
  targetVessel: {
    _id: "d92cbndghnghe2dc5056a65c",,
    type: "vessel",
    port: {
      _id: "d92gh4f8fcvbngh92e2dc501c7edb",
      type: "port",
      name: "ASTORIA / WARRENTON",
      code: "AST",
      group: "AT",
      state: "OR",
      createdBy: 1180,
      createdDate: "2000-01-03T13:54:59-08:00",
      updatedBy: "Bill Wilson",
      updatedDate: "2019-05-02T08:11:22-07:00"
    },
    vesselName: "Fish Master 3000",
    vesselType: {
      description: "OA Fixed Gear",
      _id: "d92c555184bnfghn92e2dc5013e704"
    },
    coastGuardNumber: "543214",
    registeredLength: {
      measurementType: "length",
      value: 56,
      units: "FT"
    }
  }
}

*/
