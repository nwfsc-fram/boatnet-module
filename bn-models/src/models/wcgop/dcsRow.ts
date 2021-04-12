import { Base } from '../_base/base';
import { BoatnetDate, CouchID, FishingLocation } from '../_common';

export const DcsRowTypeName = 'dcs-row';

export interface DcsRow extends Base {
    // _id?: CouchID;
    // _rev?: string;
    // type?: string;
    // createdBy?: BoatnetUserName;
    // createdDate?: BoatnetDate;
    // updatedBy?: BoatnetUserName;
    // updatedDate?: BoatnetDate;
    // changeLog?: ChangeLog[]; - change history log
    observerId?: CouchID;
    collectionMethod?: CollectionMethod;
    tripNum?: number;
    haulNum?: number;
    level?: TripLevel;
    issue?: string;
    dcsErrorType?: DcsErrorType;
    isResolved?: boolean;
    isHidden?: boolean;
    afiFlag?: AfiFlag;
    afiDate?: BoatnetDate;
    observerNotes?: string;
    tripReturnDate?: BoatnetDate;
}

export enum TripLevel {
    trip = 'Trip',
    haul = 'Haul',
    catch = 'Catch',
    sc = 'SC',
    bs = 'BS',
    deckForm = 'Deck Form',
    brd = 'BRD',
    hlfc = 'HLFC',
    mmsbt = 'MMSBT',
    pst = 'PST',
    spid = 'SPID'
  }

export enum CollectionMethod {
    optecs = "OPTECS",
    deckForm = "Deck Form",
    hybrid = "hybrid"
}

export enum DcsErrorType {
    cl = 'Calcs',
    df = 'Data Form',
    tr = 'Transcription',
    bs = 'Biosampling',
    db = 'Database',
    rd = 'Raw Data',
    sp = 'Sampling Procedure',
    ss = 'Sample Size',
    op = 'OPTECS',
    z = 'Repeating'
}

export enum AfiFlag {
    improvement = 'Improvement',
    requirement = 'Requirement',
    task = 'Task',
    pending = 'Pending'
}
