import { boolean } from 'mathjs';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    autoRngSeed: false,
    simulationResolutionWarning: true,
  },
  mutations: {
    toggleAutoRngSeed(state) {
      console.log('toggle');
      state.autoRngSeed = !state.autoRngSeed;
    },
  },
  actions: {},
});
