import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    showKeyboard: false,
    keyboardType: 'normal',
    keyboardInputTarget: undefined,
    activeFieldName: '',
    valueSelected: false
};
const actions = {
    setKeyboard({ commit }, isEnabled) {
        commit('setKeyboard', isEnabled);
    },
    setKeyboardType({ commit }, type) {
        commit('setKeyboardType', type);
    },
    setKeyboardInputTarget({ commit }, target) {
        commit('setKeyboardInputTarget', target);
    },
    setActiveFieldName({ commit }, activeFieldName) {
        commit('setActiveFieldName', activeFieldName);
    },
    setValueSelected({ commit }, selectedValue) {
        commit('setValueSelected', selectedValue);
    }
};
const mutations = {
    setKeyboard(newState, isEnabled) {
        newState.showKeyboard = isEnabled;
    },
    setKeyboardType(newState, type) {
        newState.keyboardType = type;
    },
    setKeyboardInputTarget(newState, target) {
        newState.keyboardInputTarget = target;
    },
    setActiveFieldName(newState, activeFieldName) {
        newState.activeFieldName = activeFieldName;
    },
    setValueSelected(newState, selectedValue) {
        newState.valueSelected = selectedValue;
    }
};
export const keyboard = {
    namespaced: true,
    state,
    actions,
    mutations
};
//# sourceMappingURL=keyboard.module.js.map