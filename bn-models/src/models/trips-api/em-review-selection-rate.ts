import { BaseLookup } from '../_base';
export const EmReviewSelectionReviewTypeName = 'em-review-selection-rate';

/*
    document to store the current em-review-selection rate.
    when a new rate supercedes an old one, the old doc should be set isActive: false
*/

export interface EmReviewSelectionRate extends BaseLookup {
    rate: number;  // percentage of hauls to select for review
    minHauls: number;  // if hauls/rate is less than 1,
                       // minHauls is the minimum number of hauls that need to be reviewed
    exemptions: string[];  // trip attributes that exclude a trip from haul rate review -
                           // so 100% of hauls are reviewed
    // description - will always be "percent of a trip's haul that need to be reviewed by 3rd party provider"
    // isActive - true for current rate, false for older rates
    // createdBy
    // createdDate
    // updatedBy
    // updatedDate
}

    /*
        {
            type: "em-review-selection-rate",
            rate: 25,
            minHauls: 1,
            exepmtions: [
                "isMaximizedRetention",
                "Mothership Catcher Vessel",
                "Shoreside Hake"
            ],
            description: "percent of a trip's hauls that need to be reviewed by 3rd party provider",
            isActive: true,
            "createdBy": "seth.gerou",
            "createdDate": "2021-03-21T23:26:18.961Z",
            "updatedBy": "seth.gerou",
            "updatedDate": "2021-03-21T23:26:18.961Z",
        }

    */