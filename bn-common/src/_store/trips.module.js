import Vue from 'vue';
import Vuex from 'vuex';
import { pouchService } from '@boatnet/bn-pouch';
Vue.use(Vuex);
const state = {
    currentCruise: undefined,
    currentTrip: undefined,
    currentHaul: undefined,
    currentCatch: undefined,
    currentRev: undefined
};
const actions = {
    save({ commit }, trip) {
        commit('save', trip);
    },
    setCurrentCruise({ commit }, cruise) {
        commit('setCurrentCruise', cruise);
    },
    setCurrentTrip({ commit }, trip) {
        commit('setCurrentTrip', trip);
    },
    setCurrentHaul({ commit }, haul) {
        commit('setCurrentHaul', haul);
    },
    setCurrentCatch({ commit }, wCatch) {
        commit('setCurrentCatch', wCatch);
    },
    clear({ commit }) {
        commit('setCurrentTrip', undefined);
    },
};
const mutations = {
    save(newState, record) {
        try {
            if (record._id && newState.currentRev !== record._rev) {
                pouchService.db
                    .put(record)
                    .then((response) => {
                    record._rev = response.rev;
                });
                newState.currentRev = record._rev;
            }
        }
        catch (err) {
            console.log('not properly save to the database');
        }
    },
    setCurrentCruise(newState, cruise) {
        newState.currentCruise = cruise;
    },
    setCurrentTrip(newState, trip) {
        newState.currentTrip = trip;
    },
    setCurrentHaul(newState, haul) {
        newState.currentHaul = haul;
    },
    setCurrentCatch(newState, wCatch) {
        newState.currentCatch = wCatch; // catch is a reserved keyword
    }
};
const getters = {
    currentCruise(getState) {
        return getState.currentCruise;
    },
    currentTrip(getState) {
        return getState.currentTrip;
    },
    currentHaul(getState) {
        return getState.currentHaul;
    },
    currentCatch(getState) {
        return getState.currentCatch;
    }
};
export const tripsState = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
//# sourceMappingURL=trips.module.js.map