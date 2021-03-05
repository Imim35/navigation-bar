export default {
  namespaced: true,
  state  : {
    card   : false,
    menu   : true,
    page   : null
  },
  modules: {},
  getters: {},
  actions: {
    // getPage({ commit }, payload) {
    //   commit('SET_PAGE', payload)
    // }
  },
  mutations: {
    'CARD_TOGGLE'(state, payload) {
      if( payload ) state.card = false
      else state.card = !state.card
    },
    'MENU_TOGGLE'(state) {
      state.menu = !state.menu
    },
    // 'SET_PAGE'(state, payload) {
    //   state.page = payload
    //   console.log(state.page)
    // }
  }
}
