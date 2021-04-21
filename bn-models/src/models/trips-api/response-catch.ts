import { Base } from '../_base/base';
import { Disposition } from '../_common/enums'
import { BoatnetDate } from '../_common/index';

/**
 * Whenever an EM logbook or review is submitted/updated using the tripsAPI,
 * expansions are run to determines the amount of fish to debit from a fisher's account. 
 * The resulting values are stored here in multiple formats. The ifqTripReporting 
 * format will be consumed by SDM to debit accounts.
 *    Formats this doc supports:
 *     - original doc
 *     - haul level - list of IFQ groupings aggregated at the haul level
 *     - trip level - same as above but aggregated at trip level
 *     - ifqTripReporting - combines IFQ records from logbook and review. This
 *                          is passed to SDM to debit accounts.
 * 
 * These documents are currently stored under the TripsApi/expansion_results view
 * 
 * IFQ Species: Species where IFQType = IFQ
 * https://docs.google.com/spreadsheets/d/1DLxs6uU3t7i1mBEHbWNxTboQGv5K1Gj-tSL0acfxPUk/edit?usp=sharing
 */

export const ResponseCatchTypeName = 'trip-expansions';
export const MinimalResponseCatchTypeName = 'minimal-trip-expansions';

enum ExpansionType {
    discardMortalityRate = 'discardMortalityRate',
    lostCodend = 'lostcodend',
    lostFixedGear = 'lostFixedGear',
    missingWeight = 'missingWeights',
    selectiveDiscards = 'selectiveDiscards',
    unsortedCatch = 'unsortedCatch',
}

enum WeightType {
    expansion = 'expasion',
    none = 'none'
}

export interface CatchResults extends Base {
    tripNum?: number;
    createDate?: string;
    updateDate?: string;
    updatedBy?: string;

    // list of catch records
    logbookCatch?: Record[];
    thirdPartyReviewCatch?: Record[];
    nwfscAuditCatch?: Record[];

    // list of IFQ groupings aggregated at the haul level
    // filter out non IFQ groupings
    // example record: { ifqGrouping, disposition, weight, haulNum } 
    ifqLogbookHaulLevel?: DebitSourceRecord[];
    ifqThirdPartyReviewHaulLevel?: DebitSourceRecord[];
    ifqNwfscAuditHaulLevel?: DebitSourceRecord[];

    // IFQ species aggregated at the trip level
    ifqLogbookTripLevel?: DebitSourceRecord[];
    ifqThirdPartyReviewTripLevel?: DebitSourceRecord[];
    ifqNwfscAuditTripLevel?: DebitSourceRecord[];

    // combines IFQ records from logbook and third party review
    // this is what is passed to SDM to debit accounts
    ifqTripReporting?: IfqTripLevelRecord[];

    // change log
    revisionHistory?: RevisionHistoryItem[];
}

interface CommonRecord {
    disposition?: Disposition;
    haulNum?: number;
    weight?: number;
    count?: number;
    createDate?: BoatnetDate;
    updateDate?: BoatnetDate;
}

interface Record extends CommonRecord {
    wcgopSpeciesCode?: number; // number code
    pacfinSpeciesCode?: string; // 4 letter string code, doesn't exist for all species
    docId?: string; // id of taxonomy-alias or catch-grouping. An identifier that can be used across program.
    calcWeightType?: string;
    expansionType?: ExpansionType;
    startDepth?: number;
    startLatitude?: number;
    startLongitude?: number;
    endDepth?: number;
    endLatitude?: number;
    endLongitude?: number;
    gearType?: string;
    fisherySector?: string;
    fishery?: string;
}

interface DebitSourceRecord extends CommonRecord {
    ifqGrouping?: string;
}

interface IfqTripLevelRecord {
    fishingArea?: string;
    ifqSpeciesGroupName?: string;
    ifqGrouping?: string;
    disposition?: Disposition;
    weight?: number;
}

interface RevisionHistoryItem {
    oldVal?: any;
    updateDate?: string;
}

/**
 * Example doc 
 * {
  "_id": "fbd17221e34e7b6730d32536c12e06e1",
  "_rev": "33-18ae2bfcdeae67b0cfd0012aee86bc64",
  "type": "trip-expansions",
  "tripNum": 100030,
  "logbookCatch": [
    {
      "disposition": "Discarded",
      "haulNum": 1,
      "speciesWeight": 10,
      "speciesCount": 5,
      "pacfinSpeciesCode": "YEYE",
      "wcgopSpeciesCode": 322,
      "docId": "22f26efc097ff8682bf3aae78161e363",
      "startDepth": "260",
      "startLatitude": 44.245,
      "startLongitude": -124.945,
      "endDepth": "260",
      "endLatitude": 44.776,
      "endLongitude": -124.447,
      "gear": "trawl",
      "ifqGrouping": "Yelloweye Rockfish"
    },
    {
      "disposition": "Discarded",
      "haulNum": 1,
      "speciesWeight": 50,
      "speciesCount": 15,
      "pacfinSpeciesCode": "CWCD",
      "wcgopSpeciesCode": 360,
      "docId": "22f26efc097ff8682bf3aae781625384",
      "startDepth": "260",
      "startLatitude": 44.245,
      "startLongitude": -124.945,
      "endDepth": "260",
      "endLatitude": 44.776,
      "endLongitude": -124.447,
      "gear": "trawl",
      "ifqGrouping": "Minor Shelf Rockfish North"
    },
    {
      "disposition": "Discarded",
      "haulNum": 1,
      "speciesWeight": 40,
      "speciesCount": null,
      "pacfinSpeciesCode": "DBRK",
      "wcgopSpeciesCode": 311,
      "docId": "22f26efc097ff8682bf3aae78161353f",
      "startDepth": "260",
      "startLatitude": 44.245,
      "startLongitude": -124.945,
      "endDepth": "260",
      "endLatitude": 44.776,
      "endLongitude": -124.447,
      "gear": "trawl",
      "ifqGrouping": "Darkblotched rockfish"
    }
  ],
  "thirdPartyReviewCatch": [
    {
      "disposition": "Discarded",
      "haulNum": 1,
      "speciesWeight": 300000,
      "speciesCount": 12,
      "pacfinSpeciesCode": "YEYE",
      "wcgopSpeciesCode": 322,
      "docId": "22f26efc097ff8682bf3aae78161e363",
      "startDepth": 260,
      "startLatitude": 44.245,
      "startLongitude": -124.945,
      "endDepth": 260,
      "endLatitude": 44.776,
      "endLongitude": -124.447,
      "gear": "fish pot",
      "fisherySector": "Whiting",
      "ifqGrouping": "Yelloweye Rockfish"
    },
    {
      "disposition": "Discarded",
      "haulNum": 1,
      "speciesWeight": 40,
      "speciesCount": null,
      "pacfinSpeciesCode": "DOVR",
      "wcgopSpeciesCode": 107,
      "docId": "22f26efc097ff8682bf3aae781737c47",
      "startDepth": 260,
      "startLatitude": 44.245,
      "startLongitude": -124.945,
      "endDepth": 260,
      "endLatitude": 44.776,
      "endLongitude": -124.447,
      "gear": "fish pot",
      "fisherySector": "Whiting",
      "ifqGrouping": "Dover sole"
    },
    {
      "disposition": "Discarded",
      "haulNum": 1,
      "speciesWeight": 10,
      "speciesCount": null,
      "pacfinSpeciesCode": "EGLS",
      "wcgopSpeciesCode": 108,
      "docId": "22f26efc097ff8682bf3aae78173cabf",
      "startDepth": 260,
      "startLatitude": 44.245,
      "startLongitude": -124.945,
      "endDepth": 260,
      "endLatitude": 44.776,
      "endLongitude": -124.447,
      "gear": "fish pot",
      "fisherySector": "Whiting",
      "ifqGrouping": "English sole"
    }
  ],
  "nwfscAuditCatch": [],
  "ifqLogbookCatchHaulLevel": [
    {
      "ifqGrouping": "Yelloweye Rockfish",
      "disposition": "Discarded",
      "speciesWeight": 10,
      "haulNum": 1
    },
    {
      "ifqGrouping": "Minor Shelf Rockfish North",
      "disposition": "Discarded",
      "speciesWeight": 50,
      "haulNum": 1
    },
    {
      "ifqGrouping": "Darkblotched rockfish",
      "disposition": "Discarded",
      "speciesWeight": 40,
      "haulNum": 1
    }
  ],
  "ifqThirdPartyReviewCatchHaulLevel": [
    {
      "ifqGrouping": "Yelloweye Rockfish",
      "disposition": "Discarded",
      "speciesWeight": 300000,
      "haulNum": 1
    },
    {
      "ifqGrouping": "Dover sole",
      "disposition": "Discarded",
      "speciesWeight": 40,
      "haulNum": 1
    },
    {
      "ifqGrouping": "English sole",
      "disposition": "Discarded",
      "speciesWeight": 10,
      "haulNum": 1
    }
  ],
  "ifqNwfscAuditHaulLevel": [],
  "ifqLogbookTripLevel": [
    {
      "ifqGrouping": "Yelloweye Rockfish",
      "disposition": "Discarded",
      "speciesWeight": 10
    },
    {
      "ifqGrouping": "Minor Shelf Rockfish North",
      "disposition": "Discarded",
      "speciesWeight": 50
    },
    {
      "ifqGrouping": "Darkblotched rockfish",
      "disposition": "Discarded",
      "speciesWeight": 40
    }
  ],
  "ifqThirdPartyReviewTripLevel": [
    {
      "ifqGrouping": "Yelloweye Rockfish",
      "disposition": "Discarded",
      "speciesWeight": 300000
    },
    {
      "ifqGrouping": "Dover sole",
      "disposition": "Discarded",
      "speciesWeight": 40
    },
    {
      "ifqGrouping": "English sole",
      "disposition": "Discarded",
      "speciesWeight": 10
    }
  ],
  "ifqNwfscAuditTripLevel": [],
  "ifqTripReporting": [
    {
      "ifqGrouping": "Yelloweye Rockfish",
      "disposition": "Discarded",
      "speciesWeight": 300000
    },
    {
      "ifqGrouping": "Minor Shelf Rockfish North",
      "disposition": "Discarded",
      "speciesWeight": 50
    },
    {
      "ifqGrouping": "Darkblotched rockfish",
      "disposition": "Discarded",
      "speciesWeight": 40
    },
    {
      "ifqGrouping": "Dover sole",
      "disposition": "Discarded",
      "speciesWeight": 40
    },
    {
      "ifqGrouping": "English sole",
      "disposition": "Discarded",
      "speciesWeight": 10
    }
  ],
  "updateDate": "2020-12-23T14:17:32-08:00",
  "createDate": "2020-11-16T16:53:13-08:00"
}
 */