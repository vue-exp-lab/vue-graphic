import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      sidebar: false,
      user: null,
      loadingProgress: null
    },
    getters: {
      activeUser: (state) => state.user,
      loadingProgress: (state) => state.loadingProgress
    },
    mutations: {
      toggleSidebar (state) {
        state.sidebar = !state.sidebar
      },
      setUser (state, payload) {
        state.user = payload
      },
      setLoadingProgress (state, {value}) {
        state.loadingProgress = value
      }
    }
  })
}

export default createStore
