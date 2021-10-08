// Vuex CouchDB Module

import { mongoService } from '../_services/mongo.service';
import { oracleClient } from '../_services/oracle.service';
import { ClientInfoState, ClientCredentials } from './types';

import Vue from 'vue';
import Vuex, { Module, ActionTree, MutationTree } from 'vuex';

Vue.use(Vuex);

export const state: ClientInfoState =  { };

const actions: ActionTree<ClientInfoState, any> = {
  async mongoConnect({ dispatch, commit }: any, credentials: ClientCredentials) {
    commit('mongoConnectRequest', credentials);
    mongoService.connect(credentials);
  },
  async mongoReconnect({ commit }: any) {
    // will fail if credentials not already set
    commit('mongoReconnectRequest');
  },
  async oracleConnect({ dispatch, commit }: any, credentials: ClientCredentials) {
    commit('oracleConnectRequest', credentials);
    oracleClient.connect(credentials);
  },
  async oracleReconnect({ commit }: any) {
    // will fail if credentials not already set
    commit('oracleReconnectRequest');
  },
};

const mutations: MutationTree<ClientInfoState> = {
  mongoConnectRequest(newState: any, credentials: ClientCredentials) {
    newState.mongoCredentials = credentials;
  },
  mongoReconnectRequest(newState: ClientInfoState) {
    if (!newState.mongoCredentials) {
      throw new Error('Please log out and back in for mongoDB connection.');
    } else {
        mongoService.connect(newState.mongoCredentials);
    }
  },
  oracleConnectRequest(newState: any, credentials: ClientCredentials) {
    newState.oracleCredentials = credentials;
  },
  oracleReconnectRequest(newState: ClientInfoState) {
    if (!newState.oracleCredentials) {
      throw new Error('Please log out and back in for oracleDB connection.');
    } else {
        mongoService.connect(newState.oracleCredentials);
    }
  },  
};

export const clientConnector: Module<ClientInfoState, any> = {
  namespaced: true,
  state,
  actions,
  mutations
};
