import { BaseTrip } from '../_base/index';
import { BoatnetDate } from '.';
import { Base } from '../_base';
import { CouchID } from './couch-id';

export const EvaluationPeriodTypeName = 'evaluation-period';

export interface Basket extends Base {
    observer?: CouchID;
    debriefer?: CouchID;
    type?: string; // Initial Deployment, Monly Performance, Mid Cruise, Exit
    startDate?: BoatnetDate;
    endDate?: BoatnetDate;
    tripIds?: CouchID[];
}
