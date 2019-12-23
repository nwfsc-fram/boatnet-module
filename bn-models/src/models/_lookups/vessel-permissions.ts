import { BaseLookup, Base } from '../_base';
import { CouchID } from '../_common';
import { PersonAlias } from './person-alias';

export const VesselPermissionsTypeName = 'vessel-permissions';
export const VesselAuthorizationTypeName = 'vessel-authorization';

export interface VesselAuthorization extends BaseLookup {
    vesselIdNum: string; // Coast Guard Number or Stete Regulation Number
    authorizedPeople?: CouchID[]; // ids of personAlias docs - the thinking here is that a given vessel will have a small number of autorized users, so it shouldn't be a big deal to look up the person-alias (stored in lookups) details by _id - the vesselPermissions doc will be dramatically smaller as a result.
}

export interface VesselPermissions extends Base {
    // uses changeLog from Base
    vesselsAuthorizations: VesselAuthorization[]
}

// NOTES: *  Vessel no longer stores captains
//        *  Trip stores PersonAlias of captain (not full Person doc)
//        *  Person Doc can continue to store full Active Vessel as Captain Person is no longer stored on Trip.
//        ** For any given vessel, you can get the associated captains by looking up the Vessel in
//           the Vessel Authorizations doc (stored in lookups) by Vessel Id Number,
//           then get the authorizedPeople by _id to find personAlias with role 'captain'

/* sample vessel-permissions implementation

{
    _id: 'rsevs54ttgt43gsegg43s',
    _rev: '4srgdr5th6r44s5hts45',
    type: 'vessel-permissions',
    vesselAuthorizations: [
                            {
                                vesselIdNum: '123ABC',
                                'autorizedPeople': [
                                    'vfe34rfsq34qrq23fvq23',
                                    'df34qrqfsergwgwttsers',
                                    'sggwtgsrtgy4tw5ggr5gx',
                                ]
                            },
                            {
                                vesselIdNum: 'KED836',
                                'autorizedPeople': [
                                    '4sergstrgw45ttwrgs443'
                                ]
                            }
    ]
}

*/
