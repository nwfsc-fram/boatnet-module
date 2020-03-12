
// TODO Rules types

export interface BoatnetBaseRule {
  name: string;
  description: string;
}

export interface RulesState {
  rules?: BoatnetBaseRule[];
}