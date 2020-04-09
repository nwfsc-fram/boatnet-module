
export interface BoatnetBaseRule {
  ruleId: string;
  name: string;
  description: string;
  ruleData?: any;
}

export interface RulesState {
  rules?: BoatnetBaseRule[];
}

