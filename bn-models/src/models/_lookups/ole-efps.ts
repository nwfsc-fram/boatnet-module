import { Base } from '../_base';

export const OLEEFPsTypeName = 'oleefps'

export interface EFPEntry {
  [someStrKeyDynamic: string]: string[]; // key is EFP name, value is [] of dec codes
}

export interface OLEEFPs extends Base {  
    efpCollection: EFPEntry; // object containing current EFPs
  }


/* Example Doc
  {
    "_id": "2be27a48aff4ae3f984619b45428eb53",
    "_rev": "7-bfbadfba8b07c878242ea27d87ccad42",
    "type": "oleefps",
    "efpCollection": {
      "Trawl Gear (Midwater)": [
        "Non-Whiting IFQ [20]"
      ],
      "Trawl Gear (Bottom)": [
        "Bottom Trawl IFQ [30]"
      ],
      "Cowcod": [
        "Other Gear (or Activity) [69]"
      ],
      "Deep Side Buoy Gear": [
        "Other Gear (or Activity) [69]"
      ],
      "Electronic Monitoring": [
        "Non-Whiting IFQ [20]",
        "Whiting Shorebased IFQ [21]",
        "Whiting CV (Mothership Sector) [23]",
        "Whiting MS [23]",
        "Bottom Trawl IFQ [30]"
      ],
      "Real Good Fish": [
        "NA"
      ],
      "SFCFA": [
        "Other Gear (or Activity) [69]"
      ],
      "CPS": [
        "Other Gear (or Activity) [69]"
      ],
      "Cook (OR Rockfish)": [
        "Groundfish (line*) [35]"
      ]
    },
    "createdBy": "",
    "createdDate": "",
    "updatedBy": "",
    "updatedDate": ""
  }
*/
