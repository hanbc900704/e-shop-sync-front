export const state = () => ({
  pages: {
    home: '/home'
  },
  time: new Date().getTime()
})

export const getters = {
  homePage(state) {
    return state.pages.home;
  },
  time(state) {
    return state.time;
  }
}

export const mutations = {
  updateTime(state, payload) {
    state.time = payload;
  }
}

export const actions = {
  starttick(context, payload) {

    const { commit } = context;

    commit('updateTime', Date.now());
  }
}