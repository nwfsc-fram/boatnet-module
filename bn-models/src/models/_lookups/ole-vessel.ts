import { Base } from '../_base';
import { BoatnetDate } from '../_common/index';

export const DeclarationTypeName = 'ole-declaration';
export const OLEVesselTypeName = 'ole-vessel';

export interface Declaration extends Base {
  declarationCode: number; // OLE declaration code (three digit for now)
  declarationDescrip: string; // Carrying declaration code description for app
  observerStatus: string; // type of observer coverage
  efpStatus?: string; // string, if declaration is under an EFP (not finalized
  activityDescrip?: string; // if 69 chosen, further description of declaration
  confrimationNum?: number; // once declaration is in the system it is assigned a confirmation number
  transactionDate?: BoatnetDate; // effective declaration start date
  transactionType?: string; // tbd, but probably going to use it for keeping track of
                            // how the declaration was provided (app, phone, etc)
  staffComments?: string;
  userComments?: string;
}

export interface OLEVessel extends Base {  
    vesselName?: string; // name as listed in vtracks system
    coastGuardNumber?: string;
    stateRegulationNumber?: string;
    vesselPasscode?: number; // Vessel passcode provided by 
    vesselDocNumber?: number; // Vessel doc number from vtracks
    lepOpenAcess?: string; // additional permit information
    vmsTech?: string; // vtracks employee assigned to vessel
    ifqAcct?: string; // additional permit information
    activeDeclarations?: Declaration[]; // array of currently active declarations
    closedDeclarations?: Declaration[]; // array of past declarations
    cartDeclarations?: Declaration[]; // declarations in cart, not yet activated

    // Legacy
    // We still need to decide how/if we're going to keep this information
    // consistant with our other copies of this information
    legacy?: {
      vesselOwner: string;
      vesselAddress: string;
      vesselCity: string;
      vesselState: string;
      vesselZip: number;
      vesselPhone: string;
      vesselEmail: string;
    };
  }



  /* Example Doc

  "_id": "6ec983c88220cad5c56c5a94a37b9230",
  "_rev": "7-192a60cdec0c4a50d4d4d1826a224b3e",
  "type": "ole-vessel",
  "vesselName": "Cats Paw",
  "coastGuardNumber": "Null",
  "stateRegulationNumber": "CF1881SV",
  "vesselPasscode": 43256,
  "vesselDocNumber": 4522,
  "lepOpenAccess": "Open Access",
  "vmsTech": "Cat Stevens",
  "ifqAcct": "tbd",
  "activeDeclarations": [
    {
      "type": "ole-declaration",
      "declarationCode": 221,
      "observerStatus": "N/A",
      "efpStatus": "yes",
      "activityDescrip": "",
      "confirmationNumber": 19824,
      "transactionDate": "2000-01-03T13:54:59-08:00",
      "transactionType": "obs-web",
      "createdBy": "1180",
      "updatedBy": "1111",
      "udpatedDate": "2000-10-03T13:54:59-08:00",
      "staffComments": "1234567",
      "userComments": "",
      "changeLog": ["Sara updated the userComments with the following string '1234567'"]
    }
  ],
  "closedDeclarations": [
    {
      "type": "ole-declaration",
      "declarationCode": 222,
      "observerStatus": "N/A",
      "activityDescrip": "",
      "confirmationNumber": 19822,
      "transactionDate": "2000-01-03T13:54:59-08:00",
      "transactionType": "obs-web",
      "createdBy": "1180",
      "staffComments": "",
      "userComments": ""
    },
    {
      "type": "ole-declaration",
      "declarationCode": 221,
      "observerStatus": "N/A",
      "activityDescrip": "",
      "confirmationNumber": 19821,
      "transactionDate": "2000-01-03T13:54:59-08:00",
      "transactionType": "obs-web",
      "createdBy": "1180",
      "staffComments": "",
      "userComments": ""
    }
  ],
  "cartDeclarations": [],
  "createdBy": "1331",
  "createdDate": "",
  "updatedBy": "",
  "updatedDate": "",
  "notes": "",
  "dataSource": "",
  "isDeleted": false,
  "legacy": {
    "vesselOwner": "Sam Smith",
    "vesselAddress": "123 Green Ave",
    "vesselCity": "Seattle",
    "vesselState": "Washington",
    "vesselZip": 98102,
    "vesselPhone": "123-4567-8910",
    "vesselEmail": "boats@gmail.com"
  },
  "changeLog": [],
  "staffComments": "Only a paper moon."
}

*/
