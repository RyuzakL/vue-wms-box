const state = () => ({
  user: {
    isLogged: false,
    password: "",
    username: "",
    domain: "",
  },
});

const actions = {
  setUser({ commit }, userInfo) {
    commit("SET_USER", userInfo);
  },
};

const mutations = {
  SET_USER(state, userInfo) {
    state.user = userInfo;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
