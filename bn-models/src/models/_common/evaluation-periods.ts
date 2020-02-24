import { BoatnetDate } from '.';
import { Base } from '../_base';
import { CouchID } from './couch-id';

export const EvaluationPeriodTypeName = 'evaluation-periods';

export interface EvaluationPeriods extends Base {
    observer?: CouchID;
    debriefer?: CouchID;
    type?: string;
    startDate?: BoatnetDate;
    endDate?: BoatnetDate;
    tripIds?: CouchID[];
}
