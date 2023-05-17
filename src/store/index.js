import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import http from "@/util/http-common";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    count: 0,
    token: '',
    user: {
    },
    log: []
  },
  getters: {
    getCountValue: state => {
      return state.count
    },
    getToken: state => {
      return state.token
    },
    getUser: state => {
      return state.user
    },
    getLog: state => {
      return state.log
    },
    isLoggedIn: state => {
      if (Object.keys(state.user).length > 0)
        return true;
      else
        return false;
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    },
    setLog (state, log) {
      state.log = log
    },
    logout (state) {
      state.user = ''
      state.token = ''
    }
  },
  actions: {
    async getUserFromServer (context) {
      if (context.state.token) {
        console.log("getUserFromServer 호출");
        http.get('/user/token', {
          headers: {
            Authorization: 'Bearer ' + context.state.token // the token is a variable which holds the token
          }
        })
          .then((response) => {
            console.log('getUserFromServer.action.afterAxios')
            console.log(response.data);
            context.commit('setUser', response.data)
          })
          .catch((response) => {
            console.log(response);
            console.log('Error while loading user')
            window.$cookies.remove('TripOrTrip')
            context.commit('setUser', '')
          })
      }
    },
    async getLogById ({commit, state}) {
      console.log('getUserLogById.action')
      if (state.user.id) {
        http.get(`/user/diary/?id=${state.user.id}`, {
          headers: {
            Authorization: 'Bearer ' + state.token // the token is a variable which holds the token
          }
        }).then((resp) => {
          commit('setLog', resp.data)
        }, (resp) => {
          console.log(resp);
          console.log('Error while loading log ')
        })
      }
    }
  }
})