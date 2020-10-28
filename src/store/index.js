import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo: JSON.parse(localStorage.getItem("userInfo")),
    theme: localStorage.getItem("theme")
  },
  mutations: {
    handleUser(state, userinfo) {
      state.userinfo = userinfo;
      localStorage.setItem("userInfo", JSON.stringify(userinfo));
    },
    theme(state, theme) {
      state.theme = theme;
      localStorage.setItem("theme", theme);
    }
  },
  actions: {},
  modules: {}
});
