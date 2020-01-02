// Base Event - Fishing Locations, etc

import { BoatnetDate, Measurement } from '../_common/index';
import { Point } from 'geojson'; // GeoJSON https://tools.ietf.org/html/rfc7946
import { Base } from './base';

export enum GPSFormat {
    DD = 'DD',
    DMS = 'DMS',
    DMM = 'DMM'
}

export interface BaseEvent extends Base  {
    type?: string;
    rawInputLocation?: string[];
    rawInputFormat?: GPSFormat;
    ddLocation?: Point;
    depth?: Measurement;
    date?: BoatnetDate;
}
