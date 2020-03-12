// Boatnet Rules Module
// Unclear if we'll need this Vuex functionality.

import { rulesService } from '../_services/rules.service';

import Vue from 'vue';
import Vuex, { Module, ActionTree, MutationTree } from 'vuex';
import { BoatnetBaseRule, RulesState } from './types/types';

Vue.use(Vuex);

export const state: RulesState =  { };

const actions: ActionTree<RulesState, any> = {
  async setRules({ dispatch, commit }: any, rules: BoatnetBaseRule[]) {
    commit('setRules', rules);
  }
};

const mutations: MutationTree<RulesState> = {
  setRules(newState: any, rules: BoatnetBaseRule[]) {
    newState.rules = rules;
  }
};

export const baseRules: Module<RulesState, any> = {
  namespaced: true,
  state,
  actions,
  mutations
};
