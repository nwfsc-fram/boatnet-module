import { BoatnetDate } from './index';

type BoatnetUserName = string;

export interface ChangeLog {
    updatedBy: BoatnetUserName;
    updateDate: BoatnetDate;
    property: string;
    oldVal?: string;
    newVal: string;
    app: string;  // Boatnet app the change was made in
  }
