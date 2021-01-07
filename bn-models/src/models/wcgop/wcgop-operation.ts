/*
WCGOP Operation: Haul / Set (Fishing Activity)

Model designed to store data specific to hauls (trawl) or sets (fixed gear) 
collected by WCGOP observers.  A WcgopTrip will have one or many WcgopOperations. 
These trip documents contain references to the WcgopOperation _id values, but do not contain 
the entire doc (Was this to avoid massive documents?).  WcgopOperations contain 
one or many catch documents, stored as subdocuments in the WcgopCatches array.

{//Basic structure
  ...
  type: wcgop-trip
  operationIds: [123, 456, 789]
  ...
}
...
{
  type: wcgop-operation
  _id: 123
  catches: [
    {
      type: wcgop-catch
      ...
    }
  ]
}

Parent Docs: None*
Legacy Data Source: OBSPROD.FISHING_ACTIVITIES

Open Questions:
  -> What is productDeliveryDate, and why would it be stored here?
  -> Consolidate isDataQualityPassing and haulScore?
  -> What values are allowed for WcgopTargetStrategy?
  -> Do we need key punch values in legacy?

TODO
  -> Create both WCGOP Trawl and Fixed Gear haul types?
  -> ProductDeliveryState?
  -> WcgopTargetStrategy model definition

*NOTE: _ids are referenced in base-trip.operationIds array
*/
import { BaseOperation } from '../_base/base-operation';
import { Measurement, BoatnetDate, CouchID } from '../_common/index';
import { WcgopCatch } from './wcgop-catch';
import { WeightMethod, GearType, GearPerformance } from '../_lookups';
import { FishingLocation } from '../_common/fishing-location';
import { Score } from '../_common/enums';

export const WcgopOperationTypeName = 'wcgop-operation';

declare type WcgopTargetStrategy = any; // TODO
declare type ProductDeliveryState = any; // TODO Lookup

// TODO: Create both WCGOP Trawl and Fixed Gear haul types?
export interface WcgopOperation extends BaseOperation {
  // NOTE: no attributes imported from BaseOperations; everything passed from Base
  biolist?: number; // randomly selected list of protocols for biospecimens
                    // (Trawl: 1-3, random; FG: 4/5, based on depth)
  catches?: WcgopCatch[]; // subdocs w. whats caught; stores taxonomy, weights, counts, biospecs, dissections etc
  operationNum?: number; // sequential, ordered based on retrieval time of haul/set
  locations?: FishingLocation[]; // lat/lon/depth/time; typically two locations (gear set and gear picked up),
                                 // FG sets may have more
  observerTotalCatch?: {
    // observers rough haul weight; not an expanded value, anecdotal
    measurement?: Measurement; // weight and units (always in lbs)
    weightMethod?: WeightMethod; // method observer used; commonly Visual Estimate (14) or Retained + Discard (11)
  };
  gearType?: GearType; // gear used, trawl or FG-specific (e.g. Longline, troll, pot, groundfish trawl etc)
  gearPerformance?: GearPerformance; // any issues with gear? No Problem, Problem-net hung up, Problem...
  targetStrategy?: WcgopTargetStrategy; // grouping of fish targeted (e.g. DOVR, SABL etc)
  isEfpUsed?: boolean; // indicates participation in Experimental Fishing Program (EFP)
  calWeight?: number; // at-sea scale calibration weight
  fit?: number; // value returned by scale after calibration; indicates scale accuracy
  isOperationUnsampled?: boolean; // Unsampled: observer was unable to sample (e.g. they were sick, whatever)
  isGearLost?: boolean; // did we lose all gear?
  isDataQualityPassing?: boolean; // duplicate attribute, remove?  See haulScore attribute below
  sightingEventIds?: CouchID[]; // couch ids referencing marine mammal, sea turtle, seabird sightings / interactions
  productDeliveryState?: ProductDeliveryState;
  beaufortValue?: number; // Possibly replaced with tides/currents data
  // Combine BRD and HLFC into isDeterrentUsed
  isDeterrentUsed?: boolean; // BRD and HLFC related (prompt UI for details required)
  haulScore?: Score; // data quality of the haul
  avgSoakTime?: Measurement; // avg minutes gear spent fishing (not including deploy and retrieval)
  // TODO: Derived from start/end time (calculated field) in minutes? confirm with Neil

  // fields below are Fixed Gear only:
  totalHooks?: number; // total hooks in set
  totalHooksLost?: number; // number of hooks lost in haul
  totalGearSegments?: number; // segments in set
  gearSegmentsLost?: number; // lost segments in set
  hooksSampled?: number; // total sampled by observer; pull up from WcgopCatch records (should be the same number)
  avgNumHooksPerSegment?: number; // auto-calculate, new data field
  avgSetSpeed?: Measurement; // Longline + Snap gear types only
  floatsUsed?: boolean; // Longline + Snap gear types only
  floatsPerSegment?: number; // Longline + Snap gear types only
  sinkersUsed?: boolean; // Longline + Snap gear types only
  weightPerSinker?: Measurement; // oz or lbs - Longline + Snap gear types only
  avgNumSinkersPerSegment?: number; // Longline + Snap gear types only

  legacy?: {
    fishingActivityId?: number; // primary db key, OBSPROD.FISHING_ACTIVITIES
    tripId?: number; // primary db key, OBSPROD.TRIPS
    catchWeightKp?: number; // QAQC sum "key punch" value to check weights, do we need it in couch?
    catchCountKp?: number; // QAQC sum "key punch" value to check counts, do we need it in couch?
    volume?: Measurement; // cubic meters, used to estimate weight, method not used since 2008
    density?: Measurement; // lbs per cubic meter, used to estimate weight, method not used since 2008;
    obsprodLoadDate?: BoatnetDate; // date loaded to oracle
    excluderType?: string; // BRD related, Present / Absent; not used since 2016
    isBrdPresent?: boolean; // bycatch reduction device used; combined into isDeterrentUsed above
    deterrentUsed?: string; // translate into mitigationTypes HLFC record (values translate to mitigation type)
  };
}

/*
Trying to find a fixed gear trip...
Example Document:
{
    "_id": "47328112dc1397093a0799ef575220d2",
    "_rev": "1-54d113b45a5dc1ba6cefe63e3dcd209f",
    "type": "wcgop-operation",
    "createdBy": 1234,
    "createdDate": "2019-12-16T00:52:00-08:00",
    "updatedBy": "Captain Ahab (1234)",
    "updatedDate": "2019-12-17T10:38:08-08:00",
    "uploadedBy": "nicholas.shaffer@noaa.gov",
    "uploadedDate": "2020-01-03T12:22:26.720-08:00",
    "notes": " Biolist #2",
    "dataSource": "optecs g2-6385",
    "operationNum": 5,
    "locations": [
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    43.02983,
                    -124.90100000000001
                ]
            },
            "depth": {
                "measurementType": "length",
                "value": 250,
                "units": "FM"
            },
            "position": -1,
            "locationDate": "2019-12-15T19:50:00-08:00",
            "_id": "47328112dc1397093a0799ef57517447",
            "type": "fishing-location",
            "createdBy": 1234,
            "createdDate": "2019-12-17T10:22:00-08:00",
            "updatedBy": "Captain Ahab (1234)",
            "updatedDate": "2019-12-17T10:38:08-08:00",
            "legacy": {
                "fishingLocationId": 476605,
                "fishingActivityId": 234731
            }
        },
        {
            "location": {
                "type": "Point",
                "coordinates": [
                    42.372000000000004,
                    -124.89183
                ]
            },
            "depth": {
                "measurementType": "length",
                "value": 200,
                "units": "FM"
            },
            "position": 0,
            "locationDate": "2019-12-16T00:10:00-08:00",
            "_id": "47328112dc1397093a0799ef575179b5",
            "type": "fishing-location",
            "createdBy": 1234,
            "createdDate": "2019-12-17T10:23:00-08:00",
            "updatedBy": "Captain Ahab (1234)",
            "updatedDate": "2019-12-17T10:38:08-08:00",
            "legacy": {
                "fishingLocationId": 476606,
                "fishingActivityId": 234731
            }
        }
    ],
    "observerTotalCatch": {
        "measurement": {
            "measurementType": "weight",
            "value": 9999,
            "units": "lbs"
        },
        "weightMethod": {
            "description": "Visual Experience",
            "_id": "f129bb19a290d658401c49cf3e94c962"
        }
    },
    "gearType": {
        "description": "Groundfish trawl, footrope > 8 inches (large footrope)",
        "_id": "f129bb19a290d658401c49cf3e97ceae"
    },
    "gearPerformance": {
        "description": "No problem",
        "_id": "f129bb19a290d658401c49cf3e97452a"
    },
    "beaufortValue": "4",
    "isEfpUsed": false,
    "calWeight": "11.00",
    "fit": "24",
    "isDataQualityPassing": true,
    "catches": [
      SEE WCGOP-CATCH DOCUMENTATION
    ]
    "legacy": {
        "obsprodLoadDate": "2019-12-17T10:38:08-08:00",
        "fishingActivityId": 234731,
        "tripId": 40738
    }
}
*/
