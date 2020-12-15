import { Base } from '../_base/base';
import { Disposition } from '../_common/enums'
import { BoatnetDate } from '../_common/index';

export const ResponseCatchTypeName = 'trip-expansions';

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

interface DebitSourceRecord extends CommonRecord{
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