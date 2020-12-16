import { BaseLookup } from '../_base';
import { CouchID } from '../_common';

export const PersonAliasTypeName = 'person-alias';

export interface PersonAlias extends BaseLookup {
    firstName?: string;
    lastName?: string;
    personDocId?: CouchID;
    userName?: string; // email address (minus noaa.gov for noaa, includes @domain.something for external)
    roles?: string[]; // observer, captain, observer-staff, delegate, etc.
    debriefer?: CouchID;
    // isActive: boolean
    // isWcgop: boolean
    // isAshop: boolean
}

    /*
        {
            type: "person-alias",
            firstName: "Bill",
            lastName: "Wilson"
            personDocId: "6bd01c3b39ff036c69rd288d3e2c2582",
            userName: "bill.wilson"
            isActive: true,
            isWcgop: true,
            roles: [
                "debriefer",
                "staff",
                "observer"
            ],
            debriefer: "5qd01c3b39ff036c69rd288d3e2c2582"
        }
    */
