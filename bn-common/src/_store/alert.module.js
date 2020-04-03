import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    type: null,
    message: null
};
const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }) {
        commit('clear');
    }
};
const mutations = {
    success(newState, message) {
        newState.type = 'alert-success';
        newState.message = message;
    },
    error(newState, message) {
        newState.type = 'alert-danger';
        newState.message = message;
    },
    clear(newState) {
        newState.type = null;
        newState.message = null;
    }
};
export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
//# sourceMappingURL=alert.module.js.map