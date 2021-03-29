import { BaseLookup } from '../_base/index';

export const AssessmentAnswerSetTypeName = 'assessment-answer-set';

export interface AssessmentAnswerSet extends BaseLookup {
    name: string; // unique name of set
    description?: string; // optional description of set
    options: string[]; // the actual set of options
    // isActive // default true - only false when no program uses the set
    // isWcgop
    // isAshop

    // createdBy
    // createdDate
    // updatedBy
    // updatedDate
}
