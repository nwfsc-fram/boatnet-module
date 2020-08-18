import { Base } from '../_base/base';

/*
TODO implement similar to catches doc just add weigh expansions field
*/
export interface ResponseCatch extends Base {
    catches: DebitRecord[];
}

interface DebitRecord {
    speciesCode?: string;
    weight?: number;
}