import { BaseLookup } from '../_base';
import { CouchID } from '../_common';

export const PersonAliasTypeName = 'person-alias';

export interface PersonAlias extends BaseLookup {
    // uses isAshop, etc. booleans from BaseLookup
    // uses isActive boolean
    firstName?: string;
    lastName?: string;
    personDocId?: CouchID;
    userName?: string; // email address
    roles?: string[]; // observer, captain, observer-staff, delegate, etc.
    debriefer?: CouchID;
}
