import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    playState: false,
    playList: [],
    playCurrentMusic: 0
  },
  getters: {
    getPlayState(state) {
      return state.playState
    },
    getPlayList(state) {
      return state.playList
    },
    getPlayCurrentMusic(state) {
      return state.playCurrentMusic
    }
  },
  mutations: {
    setPlayState(state, payload) {
      state.playState = payload
    },
    setPlayList(state, payload) {
      state.playList = payload
    },
    setPlayCurrentMusic(state, payload) {
      state.playCurrentMusic = payload
    }
  },
  actions: {
    setPlayState(context, payload) {
      context.commit('setPlayState', payload)
    },
    setPlayList(context, payload) {
      context.commit('setPlayList', payload)
    },
    setPlayCurrentMusic(context, payload) {
      context.commit('setPlayCurrentMusic', payload)
    }
  }
})
export {store}
