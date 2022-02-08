import { createStore } from 'vuex';

export default createStore({
  state: {
    truth: [],
  },
  mutations: {
    fill(state, payload) { state.truth = payload; },
  },
  actions: {
    fetch({ commit }) {
      fetch('./data.json')
        .then((response) => response.json())
        .then((truth) => commit('fill', truth));
    },
  },
  modules: {
  },
});
