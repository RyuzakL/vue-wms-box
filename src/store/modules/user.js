const state = () => ({
  isUserLogged: false,
  password: "",
  username: "",
  domain: "",
});

const actions = {
  logUser({ commit }, bool) {
    commit("IS_USER_LOGGED", bool);
  },
  setPassword({ commit }, paswword) {
    commit("UPDATE_PASSWORD", paswword);
  },
  setUsername({ commit }, username) {
    commit("UPDATE_USERNAME", username);
  },
  setDomain({ commit }, domain) {
    commit("UPDATE_DOMAIN", domain);
  },
};

const mutations = {
  IS_USER_LOGGED(state, bool) {
    state.isUserLogged = bool;
  },
  UPDATE_PASSWORD(state, password) {
    state.password = password;
  },
  UPDATE_USERNAME(state, username) {
    state.username = username;
  },
  UPDATE_DOMAIN(state, domain) {
    state.domain = domain;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
