import { Base } from "../_base";
export const ObserverAssessmentTypeName = 'observer-assessment';
import { CouchID, BoatnetDate } from ".";
import {AssessmentQuestion, AssessmentAnswerSet } from "../_lookups";

export interface AssessmentResponse {
    question?: AssessmentQuestion;
    response?: string;
}

export interface ObserverAssessment extends Base {
    evaluationPeriod: CouchID;
    vesselCount?: number;
    tripCount?: number;
    haulCount?: number;
    assessmentResponses?: AssessmentResponse[];

    // createdBy
    // createdDate
    // updatedBy
    // pdatedDate
}
