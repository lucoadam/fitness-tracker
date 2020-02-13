import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    distances: [
      {
        "date": "2020-01-12T08:00:00.000Z",
        "distance": "5",
        "id": 1
      },
      {
        "date": "2020-01-12T08:00:00.000Z",
        "distance": "10",
        "id": 2
      }
    ]
  },
  mutations: {
    setDistances(state, payload) {
      state.distances = payload;
    }
  },
  actions: {}
});