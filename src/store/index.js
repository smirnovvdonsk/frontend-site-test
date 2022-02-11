import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export class FilterTemplate {
  constructor({ rooms = [] } = {}) {
    this.rooms = [...rooms];
  }
}

export default createStore({
  state: {
    truth: [],
    filter: new FilterTemplate(),
    filterCache: new FilterTemplate(),
  },
  getters: {
    filterSet(state) { // Автособираемый набор фильтров
      return {
        rooms: [...new Set(state.truth.map((item) => item.size))].sort(),
      };
    },
    filteredTruth(state, getters) {
      let roomsFilter = state.filter.rooms;
      if (roomsFilter.length === 0) roomsFilter = getters.filterSet.rooms;
      return state.truth
        .filter((apart) => roomsFilter.some((size) => size === apart.size));
    },
  },
  mutations: {
    fill(state, payload) { state.truth = payload; },
    roomsFilter(state, payload) {
      const rooms = new Set(state.filterCache.rooms);
      Object.keys(payload).forEach((key) => (payload[key] ? rooms.add(key) : rooms.delete(key)));
      state.filterCache.rooms = [...rooms];
    },
    applyFilter(state) { state.filter = new FilterTemplate(state.filterCache); },
    resetFilter(state) {
      state.filterCache = new FilterTemplate();
      state.filter = new FilterTemplate();
    },
  },
  actions: {
    fetch({ commit }) {
      fetch('./data.json')
        .then((response) => response.json())
        // Добавим уникальные идентификаторы, поскольку имеющиеся id в data.json были неуникальными
        .then(async (truth) => truth.map((item) => ({ ...item, uuid: uuidv4() })))
        .then((truth) => commit('fill', truth));
    },
  },
  modules: {
  },
});
