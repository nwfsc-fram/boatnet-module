import { BaseLookup } from '../_base';
export const userColumnConfigType = 'column-config';

/**
 * Each file represents a profile for a user. It stores
 * the column configuration for the debriefer tool including
 * column order and width.
 * Docs are stored in the obs_web/column-config view 
 */

export interface ColumnConfig extends BaseLookup {
    personDocId: string, // unique id from person.ts file
    columnConfig: any // specifies config for different table types
}

/**
 * Example
  {
  "_id": "1b235bde67f734bba1b4a6c88c081ce7",
  "_rev": "4-817d84389e36a1df45611d9819424479",
  "columnConfig": {
    "wcgop-Trips": [
      {
        "field": "tripStatus-description",
        "header": "Status",
        "type": "toggle",
        "listType": "fetch",
        "lookupKey": "trip-status",
        "lookupField": "description",
        "key": "wcgopStatus",
        "isEditable": true,
        "width": "90"
      },
      {
        "field": "legacy-tripId",
        "header": "Id",
        "type": "number",
        "key": "wcgopId",
        "isEditable": false,
        "width": "100"
      }
    ],
    "wcgop-Operations": [
      {
        "field": "legacy-tripId",
        "header": "Trip Id",
        "type": "number",
        "key": "wcgopOpTripId",
        "width": "80"
      }
    ]
  },
  "type": "column-config",
  "personDocId": "2e4bdd5e978c34814d68eb86c3e54688"
  }
 */