import { BaseLookup } from '../_base';
import { BoatnetDate } from '../_common/boatnet-date';

export const PortTypeName = 'port';

// TODO add an at-sea transfer Port ID to DB

export interface Port extends BaseLookup {
  name?: string;  // PORT_NAME from OBSPROD PORTS table
  state?: string; // STATE from PORTS table
  pacfinPortCode: string; // PORT_CODE from PORTS table
  pacfinPortGroupCode: string; // PCGROUP from PORT_DECODER table
  wcgopPortGroup?: string; // PORT_GROUP from PORTS table

  legacy?: {
    portId?: number; // PORT_ID from PORTS table
    ifqPortId?: number; // not sure where this comes from
    ifqPortCode?: number; // IFQ_PORT_CODE from PORTS table
    obsprodLoadDate?: BoatnetDate; // from PORTS table
  };
}



/* Example Doc

{
  "_id": "42e32d2f590983b0ec662157ce1f57ba",
  "_rev": "1-e65da588c46ec95951c6157b0b9cb754",
  "type": "port",
  "name": "CHARLESTON (COOS BAY)",
  "state": "OR",
  "pacfinPortCode": "COS",
  "pacfinPortGroupCode": "CBA",
  "wcgopPortGroup": "CB",
  "ifqPortId": 262,
  "ifqPortCode": 34,
  "createdBy": 1180,
  "createdDate": "2000-01-03T13:54:59-08:00",
  "updatedBy": "**** ***** (1331)",
  "updatedDate": "2019-10-16T08:57:54-07:00",
  "legacy": {
    "portId": 11419,
    "obsprodLoadDate": "Invalid date",
  }

  ...optionally:
  isAshop: true
  isActive: true
}

*/

