import { BaseLookup } from '../_base';

export const TribalDeliveryReasonCodeTypeName = 'tribal-delivery-reason-code';

export interface TribalDeliveryReasonCode extends BaseLookup {
    cdqCode?: string;
}

/* Example doc
{
  "_id": "b3a7b71d1f22ba639a1edd20d318b264",
  "_rev": "1-769b0bedc6fe9e7c6b877b5f4e362571",
  "type": "ashop-tribal-delivery",
  "cdqCode": "M01",
  "description": "Makah Tribe Whiting Association"
  "isAshop": true
}
*/