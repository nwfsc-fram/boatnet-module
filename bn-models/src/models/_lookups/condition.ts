import { BaseLookup } from '../_base';

export const ConditionTypeName = 'condition';

export interface Condition extends BaseLookup {
  animalCode?: string; 
  animalDescription?: string;

  legacy?: {
    conditionCode?: string;
  };
}