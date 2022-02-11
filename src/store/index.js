import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

function arrayToRange(array = [-Infinity, Infinity]) {
  return {
    min: Math.min(...array),
    max: Math.max(...array),
  };
}

class Filter {
  constructor({
    rooms = [],
    floorRange = arrayToRange(),
    squareRange = arrayToRange(),
    priceRange = arrayToRange(),
  } = {}) {
    this.rooms = [...rooms];
    this.floorRange = { ...floorRange };
    this.squareRange = { ...squareRange };
    this.priceRange = { ...priceRange };
  }

  get priceRangeMillions() {
    return { min: this.priceRange.min / 1000000, max: this.priceRange.max / 1000000 };
  }

  set priceRangeMillions(value) {
    this.priceRange = { min: value.min * 1000000, max: value.max * 1000000 };
  }
}

export default createStore({
  state: {
    truth: [],
    filter: new Filter(),
    filterCache: new Filter(),
  },
  getters: {
    filterSet(state) { // Автособираемый набор фильтров
      return {
        rooms: [...new Set(state.truth.map((item) => item.size))].sort(),
        floorRange: arrayToRange(state.truth.map((item) => item.floor)),
        squareRange: arrayToRange(state.truth.map((item) => item.square)),
        priceRangeMillions: arrayToRange(state.truth.map((item) => item.price / 1000000)),
      };
    },
    filteredTruth(state, getters) {
      let roomsFilter = state.filter.rooms;
      if (roomsFilter.length === 0) roomsFilter = getters.filterSet.rooms;
      return state.truth
        .filter((apart) => roomsFilter.some((size) => size === apart.size))
        .filter((apart) => apart.floor >= state.filter.floorRange.min)
        .filter((apart) => apart.floor <= state.filter.floorRange.max)
        .filter((apart) => apart.square >= state.filter.squareRange.min)
        .filter((apart) => apart.square <= state.filter.squareRange.max)
        .filter((apart) => apart.price >= state.filter.priceRange.min)
        .filter((apart) => apart.price <= state.filter.priceRange.max);
    },
  },
  mutations: {
    fill(state, payload) { state.truth = payload; },
    roomsFilter(state, payload) {
      const rooms = new Set(state.filterCache.rooms);
      Object.keys(payload).forEach((key) => (payload[key] ? rooms.add(key) : rooms.delete(key)));
      state.filterCache.rooms = [...rooms];
    },
    floorFilter(state, payload) { state.filterCache.floorRange = { ...payload }; },
    squareFilter(state, payload) { state.filterCache.squareRange = { ...payload }; },
    priceFilterMillions(state, payload) { state.filterCache.priceRangeMillions = { ...payload }; },
    applyFilter(state) { state.filter = new Filter(state.filterCache); },
    resetFilter(state) {
      state.filterCache = new Filter();
      state.filter = new Filter();
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
