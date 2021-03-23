import { Base } from '../_base';
import { BoatnetDate } from '../_common';
import { Fishery, FisherySector } from '../_lookups';
export const EmHaulReviewSelectionTypeName = 'em-haul-review-selection';

/*
    Each EM trip will have one em-haul-review-selection doc.
    The doc stores which hauls the third party provider is expected to review,
    and the criteria used to determine this selection.
*/

export interface EMHaulReviewSelection extends Base {
    tripNum: number;
    vesselName?: string;
    vesselNumber?: string;
    logbookHauls?: number[]; //these are haulNum values - not to be confused with array positions
    selectedHauls: number[]; //these are haulNum values - not to be confused with array positions
    selectionRate: number; // from the active em-review-selection-rate
    selectionDate?: BoatnetDate;
    dueDate?: BoatnetDate;
    fishery?: Fishery; // from the ots trip
    fisherySector?: FisherySector; // from the ots trip
    maximizedRetention?: boolean; // from the ots trip
    notes?: string; // describes the reason the selected hauls were selected?
                   // eg. "max retention trip - all hauls selected", or "Single haul trip"
    provider?: string; // em provider - taken from logbook submission or lookup of vessel within em roster
    //createdBy
    //createdDate
    //updatedBy
    //updatedDate
}

    /*
        {
            type: "em-haul-review-selection",
            tripNum: 123456,
            vesselName: 'Fishmaster 3000",
            vesselNumber: "123abc",
            logbookHauls: [1,2,3,4,5,6,7],
            selectedHauls: [2,7],
            selectionRate: 25,
            selectionDate: "2021-03-21T23:26:18.961Z",
            dueDate: "2021-04-14T23:26:18.961Z",
            fishery: "Electronic Monitoring EFP",
            fisherySector: "Bottom Trawl",
            maximizedRetention: false,
            notes: "optimized retention trip hauls selected using selection rate",
            provider: "Saltwater",
            createdBy: "seth.gerou",
            createdDate": "2021-03-21T23:26:18.961Z",
            updatedBy: "seth.gerou",
            updatedDate: "2021-03-21T23:26:18.961Z",
        }
    */