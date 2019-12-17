// Base Event - Fishing Locations, etc

import { BoatnetDate, Measurement } from '../_common/index';
import { Point } from 'geojson'; // GeoJSON https://tools.ietf.org/html/rfc7946
import { Base } from './base';

export enum Format {
    DD = 'dd',
    DMS = 'dms',
    DMM = 'dmm'
}

export interface BaseEvent extends Base  {
    type?: string;
    rawInputLocation?: Point;
    ddLocation?: Point;
    depth?: Measurement;
    date?: BoatnetDate;
    format?: Format;
}
