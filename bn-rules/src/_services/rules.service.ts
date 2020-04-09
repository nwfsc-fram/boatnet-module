// Boatnet Rules Engine Service

/* tslint:disable:no-console */

import defaultRulesJSON from '../assets/default.rules.json';
import { BoatnetBaseRule } from '../_store';

class RulesService {

  private defaultRules = new Map<string, any>();
  constructor() {
    console.log('[Rules Service] Instantiated.');
    // Build hash table of defaultRules
    this.buildDefaultRules();
  }

  private buildDefaultRules() {
    for(const k in defaultRulesJSON.rules) {
      this.defaultRules.set(defaultRulesJSON.rules[k].ruleId, defaultRulesJSON.rules[k]);
    }
  }

  public getRule(ruleName: string): any {
    return this.defaultRules.get(ruleName);
  }
}

export const rulesService = new RulesService();
