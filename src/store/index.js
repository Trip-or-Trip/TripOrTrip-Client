import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import http from "@/util/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: "",
    user: {},
    log: [],
  },
  getters: {
    getToken: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
    isLoggedIn: (state) => {
      if (Object.keys(state.user).length > 0) return true;
      else return false;
    },
    email: (state) => {
      if (Object.keys(state.user).length > 0)
        return state.user.emailId + "@" + state.user.emailDomain;
      else return "";
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setLog(state, log) {
      state.log = log;
    },
    logout(state) {
      state.user = "";
      state.token = "";
    },
  },
  actions: {
    async getUserFromServer(context) {
      if (context.state.token) {
        http
          .get("/user/token", {
            headers: {
              Authorization: "Bearer " + context.state.token, // the token is a variable which holds the token
            },
          })
          .then((response) => {
            context.commit("setUser", response.data);
          })
          .catch((response) => {
            console.log(response);
            console.log("Error while loading user");
            window.$cookies.remove("TripOrTrip");
            context.commit("setUser", "");
          });
      }
    },
    async getLogById({ commit, state }) {
      console.log("getUserLogById.action");
      if (state.user.id) {
        http
          .get(`/user/diary/?id=${state.user.id}`, {
            headers: {
              Authorization: "Bearer " + state.token, // the token is a variable which holds the token
            },
          })
          .then(
            (resp) => {
              commit("setLog", resp.data);
            },
            (resp) => {
              console.log(resp);
              console.log("Error while loading log ");
            }
          );
      }
    },
  },
});
