import { Base } from '../_base/base';
import { BoatnetDate, Measurement } from '.';
import { Point } from 'geojson'; // GeoJSON https://tools.ietf.org/html/rfc7946
import {
  Beaufort,
  Confidence,
  Media,
  BirdBand,
  Species,
  BodyLength,
  SightingCondition,
  Behavior,
  TaxonomyAlias
} from '../_lookups/index';
import { CouchID } from './couch-id';

declare type DescriptorIcon = any; // TODO Pick-list images of Cetacea and Pinniped Descriptions (Silhouettes)

interface SilhouetteDescriptor {
  image?: DescriptorIcon; // Pick-list images of Cetacea and Pinniped Descriptions (Silhouettes)
  comments?: string; // colors, scars etc
}

interface GearPresentComment {
  gearType?: string; // TODO lookup
  comments?: string; // gear color etc
}

export declare const SightingEventTypeName = 'sighting-event';

/**
 * Has no discernible impact on the the animal(s) behavior
 */
export interface SightingEvent extends Base {
  species?: TaxonomyAlias;
  operationIDs?: CouchID[];
  confidentOfSpecies?: Confidence; // Y/N/? Might be useful?
  sightingDate?: BoatnetDate;
  location?: Point;
  beaufort?: Beaufort;
  sightingConditions?: SightingCondition;
  minNumSighted?: number;
  maxNumSighted?: number;
  bestNumSighted?: number;
  closestApproach?: Measurement;
  duration?: Measurement; // in minutes
  sightingCue?: string;
  mediaData?: Media[]; // Derive media present for analyst view
  animalBehavior?: Behavior[]; // spy-hopping, tail raised on dive etc
  bodyLengthEstimates?: BodyLength[]; // multiple animals - TODO Ryan to review usefulness

  // for turtles (no data yet)
  tagColor?: string;
  birdBands?: BirdBand[]; // for birds
  // for pinnipeds
  brandId?: string;
  silhouetteDescriptor?: SilhouetteDescriptor[];
  gearPresent?: GearPresentComment;

  legacy?: {
    waterTemp?: Measurement;
  };
}
