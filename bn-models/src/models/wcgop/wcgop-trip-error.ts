import { Base } from '../_base/base';
import { BoatnetDate, CouchID, FishingLocation } from '../_common';

export const WcgopTripErrorTypeName = 'wcgop-trip-error';

export interface WcgopTripError extends Base {
    // _id?: CouchID;
    // _rev?: string;
    // type?: string;
    // createdBy?: BoatnetUserName;
    // createdDate?: BoatnetDate;
    // updatedBy?: BoatnetUserName;
    // updatedDate?: BoatnetDate;
    // changeLog?: ChangeLog[]; - change history log
    tripNum?: number;
    errors?: WcgopError[];
}

export interface WcgopError {
    description?: string;
    dateCreated?: BoatnetDate;  // should this exist on the individual error ?
    observer?: string; // firstName + lastName?  or should we store the observer object from the trip?
    status?: StatusType; // user selectable
    notes?: string; // user editable
    severity?: Severity; // set by rules engine
    dateFixed?: BoatnetDate; // equivalent of obsprod 'RESOLVED_DATE'
    operationId?: CouchID; // equivalent of obsprod 'FISHING_ACTIVITY_ID'
    operationNum?: number; // sequential haul number - do we need to store this?
    fishingLocation?: FishingLocation;
    catchId?: number;  // is this still used?  if so, needs to be moved from legacy
    catchNum?: number; // sequential catch number within operation - do we need to store this?
    speciesCompId?: number; // equivalent of obsprod 'SPECIES_COMPOSITION_ID'
    speciesCompItemId?: number; // equivalent of obsprod 'SPECIES_COMP_ITEM_ID'
    biospecimenId?: number; // equivalent of obsprod 'BIO_SPECIMEN_ID'
    dissectionId?: number; // is this still used?  it's currently only referenced in biostructure.legacy.
    errorValue?: string; // still valid, or should description store a complete summary of the error?
    errorItem?: string;  // still valid, or should description store a complete summary of the error?
    fishTicketNumber?: string; // error needs to store PACFIN fish ticket numbert to look up fish ticket
                               // couch does not store fish ticket info.
    legacy?: {
        tripCheck?: number;
    };
  }

  export enum StatusType {
    flag = 'Flag',
    ignore = 'Ignore',
    pending = 'Pending',
    resolved = 'Resolved',
    unresolved = 'Unresolved',
    valid = 'Valid'
  }

  export enum Severity {
    error = 'Error',
    warning = 'Warning'
  }
