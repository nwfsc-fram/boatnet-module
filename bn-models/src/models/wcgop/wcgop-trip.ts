/**
 * WCGOP Trip
 * Formal Documentation: https://docs.google.com/document/d/1dUImuYyCs5EPQIbso8tGV0F7HtWuKJDF7EB8h6mnVSM/edit?ts=5e5d528a#bookmark=id.rr53ua1roauf
 * 
 * Represents a trip from the OBSPROD.TRIPS table. This is defined as a port-to-port
 * event on a single vessel with a single observer. This model also combines data from
 * other obsprod tables to include: Brd_configuration, HLFC, and species 
 * interaction/sighting info.
 * 
 * 
 * Parent Docs: None*
 * Legacy Data Source: OBSPROD.TRIPS
 *    These fields are populated from the following OBSPROD tables
 *     - BRD Configuration: BRD, BRD_HAULS_XREF, BRD_TYPE
 *     - HLFC: HLFC_HAULS_XREF
 *     - Species Interaction/Sighting: SPECIES_SIGHTINGS, SPECIES_INTERACTIONS, SPECIES_INTERACT_HAULS_XREF
 * 
 */
import { BaseTrip } from '../_base/base-trip';
import {
  SightingEvent,
  InteractionEvent,
} from '../_common/index';

import { WcgopFishTicket } from './index';
import { BoatnetDate, Waiver, Certificate } from '../_common/index';
import { BrdConfiguration } from '../_common/brd-configuration';
import { PersonAlias, Fishery, FirstReceiver, VesselLogbookType,
  TripStatus, GearType, Program } from '../_lookups/index';
import { Score } from '../_common/enums';
import { WcgopHlfcConfiguration } from './wcgop-hlfc-configuration';

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

  // Marine mammals, sea birds, and turtles with an emphasis placed on rare/endangered spcies
  // Stored at trip level since these events can occur in between operations
  sightingEvents?: SightingEvent[]; // no impact on animal's behavior
  interactionEvents?: InteractionEvent[]; // ship's presence causes an animal to change it's behavior

  brd?: BrdConfiguration[]; // List of bycatch reduction devices used.
                            // Currently this is entered as a seperate form and stored
                            // in its own table. In the new model we are adding this as
                            // a trip level field.
  hlfc?: WcgopHlfcConfiguration; // hook and line field configuration

  fishTickets?: WcgopFishTicket[];
  certificates?: Certificate[]; // Permits and Licenses
  waiver?: Waiver[];
  intendedGearType?: GearType; // only for when there is no Haul data (no fishing activity)
  tripScore?: Score; // defaults to true (passed) and debriefer can change it to false (failed)
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

/**
 * Example Doc
 * {
  "_id": "916975c39b316dfdbece7e2c4178969b",
  "_rev": "78-ad23d2c877eb71c1dbd3df278b2ff80e",
  "type": "wcgop-trip",
  "createdBy": 2074,
  "createdDate": "2019-06-21T22:52:00-07:00",
  "updatedBy": "Rebecca Hoch (1517)",
  "updatedDate": "2019-09-04T10:58:12-07:00",
  "uploadedBy": "nicholas.shaffer@noaa.gov",
  "uploadedDate": "2020-01-03T12:22:26.720-08:00",
  "dataSource": "6015-mackenzie",
  "tripScore": "Pass",
  "operationIDs": [
    "e96b5d20892bc50fcbc1f00d361f7655",
    "e96b5d20892bc50fcbc1f00d361f818c",
    "e96b5d20892bc50fcbc1f00d361f8e63",
    "e96b5d20892bc50fcbc1f00d361f9410",
    "e96b5d20892bc50fcbc1f00d361f9ef0",
    "e96b5d20892bc50fcbc1f00d361fa345",
    "e96b5d20892bc50fcbc1f00d361fa884",
    "e96b5d20892bc50fcbc1f00d361fb107",
    "e96b5d20892bc50fcbc1f00d361fbd2f",
    "e96b5d20892bc50fcbc1f00d361fbe7c",
    "e96b5d20892bc50fcbc1f00d361fc03b",
    "e96b5d20892bc50fcbc1f00d361fcba3",
    "e96b5d20892bc50fcbc1f00d361fd032",
    "e96b5d20892bc50fcbc1f00d361fdb84",
    "e96b5d20892bc50fcbc1f00d361fe4ca",
    "e96b5d20892bc50fcbc1f00d361feec4",
    "e96b5d20892bc50fcbc1f00d361ff13a",
    "e96b5d20892bc50fcbc1f00d361ffd37"
  ],
  "vessel": {
    "_id": "f129bb19a290d658401c49cf3eecfc6b",
    "_rev": "1-ec30ee55de64bf09f2bbaabb0193b304",
    "type": "vessel",
    "homePort": {
      "_id": "f129bb19a290d658401c49cf3e9c4738",
      "_rev": "1-8dde191977adefdc16d37dea504cfac4",
      "type": "port",
      "name": "CHARLESTON (COOS BAY)",
      "code": "COS",
      "group": "CB",
      "state": "OR",
      "createdBy": 1180,
      "createdDate": "2000-01-03T14:54:59-08:00",
      "updatedBy": "Neil Riley (1331)",
      "updatedDate": "2019-10-16T09:57:54-07:00"
    },
    "vesselName": "Ms. Julie",
    "vesselType": {
      "description": "LE Trawl",
      "_id": "f129bb19a290d658401c49cf3e9459c5"
    },
    "coastGuardNumber": "909150",
    "registeredLength": {
      "measurementType": "length",
      "value": 70,
      "units": "FT"
    },
    "vesselStatus": {
      "description": "Active",
      "_id": "f129bb19a290d658401c49cf3e942784"
    },
    "createdBy": 1180,
    "createdDate": "2002-02-25T11:29:44-08:00",
    "updatedDate": "2006-02-21T16:14:15-08:00",
    "isActive": true,
    "captains": [
      {
        "_id": "f129bb19a290d658401c49cf3ea5b43a",
        "_rev": "1-7552b6f9120cde7b9137646370eedcec",
        "type": "person",
        "firstName": "Charles",
        "lastName": "Hurlocker",
        "epirbNum": [
          null,
          null,
          null
        ],
        "createdBy": 1180,
        "createdDate": "2005-11-21T17:21:38-08:00",
        "updatedBy": "Neil Riley (1331)",
        "updatedDate": "2019-05-08T10:30:33-07:00",
        "legacy": {
          "PersonId": 4109
        },
        "isLegacy": true
      },
      {
        "_id": "f129bb19a290d658401c49cf3ed616cc",
        "_rev": "1-9bd734c1fa9f030d7bdf649daae17420",
        "type": "person",
        "firstName": "Cody",
        "lastName": "Leach",
        "epirbNum": [
          null,
          null,
          null
        ],
        "createdBy": 1331,
        "createdDate": "2016-02-29T16:09:22-08:00",
        "updatedBy": "Neil Riley (1331)",
        "updatedDate": "2019-06-24T14:43:48-07:00",
        "legacy": {
          "PersonId": 5969
        },
        "isLegacy": true
      },
      {
        "_id": "f129bb19a290d658401c49cf3ee23152",
        "_rev": "1-63171249661f62e3e793e45041977b0c",
        "type": "person",
        "firstName": "Kevin",
        "lastName": "Porter",
        "homePhone": "(541) 404-6978",
        "epirbNum": [
          null,
          null,
          null
        ],
        "createdBy": 1180,
        "createdDate": "2005-11-21T17:21:38-08:00",
        "updatedBy": "Kevin Stockmann (1465)",
        "updatedDate": "2019-10-17T17:21:30-07:00",
        "legacy": {
          "PersonId": 4182
        },
        "isLegacy": true
      }
    ]
  },
  "departurePort": {
    "_id": "f129bb19a290d658401c49cf3e9c4738",
    "_rev": "1-8dde191977adefdc16d37dea504cfac4",
    "type": "port",
    "name": "BLAINE",
    "code": "COS",
    "group": "CB",
    "state": "OR",
    "createdBy": 1180,
    "createdDate": "2000-01-03T14:54:59-08:00",
    "updatedBy": "Neil Riley (1331)",
    "updatedDate": "2019-10-16T09:57:54-07:00"
  },
  "departureDate": "2019-06-18T21:00:00-07:00",
  "returnPort": {
    "_id": "f129bb19a290d658401c49cf3e9c4738",
    "_rev": "1-8dde191977adefdc16d37dea504cfac4",
    "type": "port",
    "name": "BANDON",
    "code": "COS",
    "group": "CB",
    "state": "OR",
    "createdBy": 1180,
    "createdDate": "2000-01-03T14:54:59-08:00",
    "updatedBy": "Neil Riley (1331)",
    "updatedDate": "2019-10-16T09:57:54-07:00"
  },
  "returnDate": "2019-06-22T17:00:00-07:00",
  "observer": {
    "_id": "852949f4bbd4095bd4a70a8ad1379300",
    "_rev": "1-2e6a82ac95286641d3981dd3cd12205d",
    "type": "person",
    "createdDate": "2019-03-06T19:09:49.000Z",
    "updatedBy": "Neil Riley (1331)",
    "updatedDate": "2019-08-23T19:37:37.502Z",
    "uploadedBy": "nicholas.shaffer@noaa.gov",
    "uploadedDate": "2020-01-03T12:22:26.720-08:00",
    "firstName": "melinae",
    "lastName": "Shak",
    "isActive": false,
    "isWcgopOBserver": true,
    "legacy": {
      "obsprodLoadDate": "2019-03-06T19:09:49.490Z",
      "userId": 2074
    }
  },
  "program": {
    "_id": "f129bb19a290d658401c49cf3ea15dd3",
    "_rev": "1-5bb458b20eb2b401efe6cd3294dec0c5",
    "type": "program",
    "name": "Catch Shares",
    "description": "Open Access Fleet (CA, OR)",
    "createdBy": 1180,
    "createdDate": "2002-09-19T09:27:41-07:00",
    "updatedBy": "Neil Riley (1331)",
    "updatedDate": "2015-05-11T13:06:49-07:00"
  },
  "isPartialTrip": false,
  "fishery": {
    "description": "OR Pink Shrimp",
    "_id": "f129bb19a290d658401c49cf3e9ae312"
  },
  "crewSize": 3,
  "firstReceivers": [
    null
  ],
  "logbookNum": 84855,
  "logbookType": "3",
  "observerLogbookNum": 11,
  "isFishProcessed": false,
  "tripStatus": {
    "description": "Closed",
    "_id": "f129bb19a290d658401c49cf3e9419f8"
  },
  "debriefer": 5936,
  "fishTickets": [
    {
      "fishTicketNumber": "3373160",
      "createdBy": 2074,
      "createdDate": "2019-06-23T16:56:00-07:00",
      "updatedDate": "2019-08-01T12:02:52-07:00",
      "tripId": 39439,
      "stateAgency": "O",
      "fishTicketDate": "2019-06-23T08:00:00.000Z",
      "dataSoure": "6015-mackenzie",
      "legacy": {
        "fishTicketId": 40660,
        "obsprodLoadDate": "2019-07-01T13:29:02-07:00"
      }
    }
  ],
  "legacy": {
    "tripId": 39439,
    "otcKp": 13900,
    "runTer": "1",
    "evaluationId": 3306,
    "isNoFishingActivity": false,
    "obsprodLoadDate": "2019-07-01T13:29:02-07:00"
  },
  "legacy.tripId": "39439",
  "tripStatus.description": "Closed"
}
 * 
 */