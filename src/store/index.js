import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo: JSON.parse(localStorage.getItem("userInfo"))
  },
  mutations: {
    handleUser(state, userinfo) {
      state.userinfo = userinfo;
      localStorage.setItem("userInfo", JSON.stringify(userinfo));
    }
  },
  actions: {},
  modules: {}
});
