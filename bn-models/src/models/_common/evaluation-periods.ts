import { BoatnetDate } from '.';
import { Base } from '../_base';
import { CouchID } from './couch-id';
import { EvaluationPeriodTypes } from './enums';

export const EvaluationPeriodTypeName = 'evaluation-periods';

export interface EvaluationPeriods extends Base {
    observer?: CouchID;
    debriefer?: CouchID;
    type?: EvaluationPeriodTypes;
    startDate?: BoatnetDate;
    endDate?: BoatnetDate;
    tripIds?: CouchID[];
}
