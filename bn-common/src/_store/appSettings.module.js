import Vue from 'vue';
import Vuex from 'vuex';
import { pouchService } from '@boatnet/bn-pouch';
Vue.use(Vuex);
const state = {
    isKeyboardEnabled: true,
    isSoundEnabled: true,
    appMode: 'wcgop',
    defaultLocationFormat: 'DMS',
    appConfig: {
        validAppViews: [],
        navigationDrawerItems: [],
        login: {},
        trips: {},
        hauls: {},
        catch: {}
    }
};
const actions = {
    setKeyboardStatus({ commit }, isEnabled) {
        commit('setKeyboardStatus', isEnabled);
    },
    setSoundEnabled({ commit }, isEnabled) {
        commit('setSoundEnabled', isEnabled);
    },
    setAppMode({ commit }, appMode) {
        commit('setAppMode', appMode);
    },
    setDefaultLocationFormat({ commit }, format) {
        commit('setDefaultLocationFormat', format);
    },
    setAppConfig({ commit }) {
        commit('setAppConfig');
    }
};
const mutations = {
    setKeyboardStatus(newState, isEnabled) {
        newState.isKeyboardEnabled = isEnabled;
    },
    setSoundEnabled(newState, isEnabled) {
        newState.isSoundEnabled = isEnabled;
    },
    setAppMode(newState, appMode) {
        newState.appMode = appMode;
    },
    setDefaultLocationFormat(newState, format) {
        newState.defaultLocationFormat = format;
    },
    async setAppConfig(newState) {
        try {
            const db = pouchService.db;
            const queryOptions = {
                limit: 1,
                start_key: newState.appMode,
                inclusive_end: true,
                descending: false,
                include_docs: true
            };
            const config = await db.query('LookupDocs/boatnet-config-lookup', queryOptions, pouchService.lookupsDBName);
            newState.appConfig = config.rows[0].doc;
        }
        catch (err) {
            console.log(err);
        }
    }
};
const getters = {
    isSoundEnabled(getState) {
        return getState.isSoundEnabled;
    },
    isKeyboardEnabled(getState) {
        return getState.isKeyboardEnabled;
    },
    appMode(getState) {
        return getState.appMode;
    },
    defaultLocationFormat(getState) {
        return getState.defaultLocationFormat;
    },
    appConfig(getState) {
        return getState.appConfig;
    }
};
export const appSettings = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
//# sourceMappingURL=appSettings.module.js.map