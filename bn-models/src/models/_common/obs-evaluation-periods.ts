import { BoatnetDate } from '.';
import { Base } from '../_base';
import { CouchID } from './couch-id';
import { EvaluationPeriodTypes } from './enums';

export const EvaluationPeriodTypeName = 'observer-evaluation-periods';

interface EvaluationPeriod {
    debriefer?: CouchID;
    type?: EvaluationPeriodTypes;
    startDate?: BoatnetDate;
    endDate?: BoatnetDate;
    tripIds?: CouchID[];
}

export interface ObserverEvaluationPeriods extends Base {
    observer?: CouchID;
    evaluationPeriods?: EvaluationPeriod[];
}
