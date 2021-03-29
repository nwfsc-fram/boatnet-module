import { Base } from '../_base/index';

export const AssessmentAnswerSetTypeName = 'assessment-answer-set';

export interface AssessmentAnswerSet extends Base {
    name: string; // unique name of set
    description?: string; // optional description of set
    options: string[]; // the actual set of options
    isActive: boolean; // default true - only false when no program uses the set
    isWcgop?: boolean;
    isAshop?: boolean;
    // createdBy
    // createdDate
    // updatedBy
    // updatedDate
}
