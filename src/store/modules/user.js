const state = () => ({
  isUserLogged: true,
});

const actions = {
  logUser({ commit }, bool) {
    commit("IS_USER_LOGGED", bool);
  },
};

const mutations = {
  IS_USER_LOGGED(state, bool) {
    state.isUserLogged = bool;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
