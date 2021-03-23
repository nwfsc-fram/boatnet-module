import { BaseCatch } from "../_base";
import { Measurement, CouchID, BoatnetDate, Basket } from "../_common";
import { WcgopExpansions } from "./wcgop-expansions";
import { WcgopDiscardReason } from "./wcgop-discard-reason";
import { WcgopSpecimen } from "./wcgop-specimen";
import { CatchContent, Protocol } from "../_lookups";

export const WcgopCatchTypeName = 'wcgop-catch-new';
declare type RockfishHandlingCode = string; // TODO
declare type CatchType = string; /// TODO Lookups - codend, pocket net, mix, submix, sample, subsample

export interface WcgopCatch extends BaseCatch {
     /* From BaseCatch
        // catchNum?: number; // Unique per Operation sequential
             // Lookups - TaxonomyAlias, UnsortedCatch (Codend, Pocket Net, Mix, Submix), CatchGrouping, Debris
        // catchType?: CatchType;
        // selectedName?: String (The Scientific Name, Group Name, or Specific Common name chosen by user)
        // catchContent?: CatchContent;
        // baskets?: Basket[];
        //  protocols?: Protocol[]; // Include sampling strategy (randomly selected, etc.)
    */

    measuredWeight?: Measurement;
    calculatedWeight?: Measurement; // should this value be stored, or always calculated?
    count?: number;
    sampleWeight?: Measurement;  // still needed?
    sampleCount?: number;  // still needed?
    expansionData?: WcgopExpansions;  // do expansion results get stored here?  In another doc?
    gearSegmentsSampled?: number;

    discardReason?: WcgopDiscardReason;
    totalTally?: number;
    handling?: RockfishHandlingCode;
    sightingEventIds?: CouchID[];

    specimens?: WcgopSpecimen[];
    children?: WcgopCatch[];

    legacy?: {
        catchId?: number;

        volume?: Measurement;
        density?: Measurement;

        basketsWeightItq?: number;
        totalBasketsItq?: number;
        partialBasketWeightItq?: number;
        unitsSampledItq?: number;
        totalUnitsItq?: number;
        // All other _ITQ fields NULL, can ignore (confirm with Neil)

        basketWeightKp?: number;
        addlBasketWeightKp?: number;
        basketWeightCountKp?: number;

        obsprodLoadDate?: BoatnetDate;
        hooksSampled?: number; // pulled up to Operation

        // WcgopCatchSpecies - legacy items
        speciesCompDataSource?: string;
        speciesCompItemDataSource?: string;

        speciesCompId?: number;
        speciesCompItemId?: number;
        biospecimenId?: number;
        // catchId?: number;
        speciesWeightKp?: number;
        speciesWeightKpItq?: number;
        speciesNumberKp?: number;
        speciesNumberKpItq?: number;
        catchSampleMethod?: string;
        basketNumber?: number;
        // obsprodLoadDate?: BoatnetDate;
    };
}