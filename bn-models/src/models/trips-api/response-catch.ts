import { Base } from '../_base/base';
import { Disposition } from '../_common/enums'
import { BoatnetDate } from '../_common/index';

export const ResponseCatchTypeName = 'trip-expansions';

export enum ExpansionType {
    selectiveDiscards = 'selectiveDiscards',
    lostcodend = 'lostcodend'
}

export enum WeightType {
    expansion = 'expasion',
    none = 'none'
}

export interface CatchResults extends Base {
    tripNum?: number;
    createDate?: string;
    updateDate?: string;
    updatedBy?: string;
    logbookCatch?: Record[];
    thirdPartyReviewCatch?: Record[];
    nwfscAuditCatch?: Record[];
    debitSourceCatch?: DebitSourceRecord[];
    ifqTripReporting?: IfqTripLevelRecord[];
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
    speciesCode?: string;
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