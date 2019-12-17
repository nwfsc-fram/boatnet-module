import { BaseLookup } from '../_base';

export const ConditionTypeName = 'condition';

export interface Condition extends BaseLookup {
  animalCode?: string; // ashop code to delineate the type of animal, pulled from animal type lookup in norpac
  animalDescription?: string; // ashop description of animal code used, pulled from animal type lookup in norpac

  legacy?: {
    conditionCode?: string;
  };
}