import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    isAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    },
  },
  actions: {
    setIsAuthenticated ({ commit }, isAuthenticated) {
      commit('isAuthenticated', isAuthenticated)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
  },
  modules: {
  }
})