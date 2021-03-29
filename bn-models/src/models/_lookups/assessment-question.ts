import { BaseLookup } from '../_base/index';

export const AssessmentQuestionTypeName = 'assessment-question';

export interface AssessmentQuestion extends BaseLookup {
    section: string; // name of section on assessment
    order: number; // used to put questions in order (supports decimals)
    question: string; // text of the assessment question
    answerSet: string; // name of answer set to use
    // isActive // default true - only false when no program uses the question
    // isWcgop
    // isAshop

    // createdBy
    // createdDate
    // updatedBy
    // updatedDate
}
