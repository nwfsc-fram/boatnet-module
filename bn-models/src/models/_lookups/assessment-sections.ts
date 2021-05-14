import { BaseLookup } from '../_base/index';

export const AssessmentSectionsTypeName = 'assessment-sections';

export interface AssessmentSections extends BaseLookup {
    sections: string[]; // array of section names
    // isWcgop
    // isAshop

    // createdBy
    // createdDate
    // updatedBy
    // updatedDate
}
