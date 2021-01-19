import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: ''
    },
    isVisible: true,
    token: '',
  },
  mutations: {
    isVisibleTrue(state) {
       state.isVisible = true;
     },
     isVisibleFalse(state) {
      state.isVisible = false;
    }
  },
  actions: {

  }
})
