import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

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
        // Добавим уникальные идентификаторы, поскольку имеющиеся id в data.json были неуникальными
        .then(async (truth) => truth.map((item) => ({ ...item, uuid: uuidv4() })))
        .then((truth) => commit('fill', truth));
    },
  },
  modules: {
  },
});
