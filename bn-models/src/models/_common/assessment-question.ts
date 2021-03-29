import { Base } from '../_base/index';

export const AssessmentQuestionTypeName = 'assessment-question';

export interface AssessmentQuestion extends Base {
    section: string; // name of section on assessment
    order: number; // used to put questions in order (supports decimals)
    question: string; // text of the assessment question
    answerSet: string; // name of answer set to use
    isActive: boolean; // default true - only false when no program uses the question
    isWcgop?: boolean;
    isAshop?: boolean;

    // createdBy
    // createdDate
    // updatedBy
    // updatedDate
}
