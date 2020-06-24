import { BoatnetDate } from './index';

type BoatnetUserName = string;

export interface ChangeLog {
    updatedBy?: BoatnetUserName;
    updateDate?: BoatnetDate;
    change?: string;  // attribute changed from oldval to newval
    app?: string;  // Boatnet app the change was made in
  }