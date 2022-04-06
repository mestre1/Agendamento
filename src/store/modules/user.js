const state = {
  user: null,
  hasSession: false,
};

const getters = {
  currentUser: () => state.user,
  hasSession: () => state.hasSession,
};

const actions = {
  addUser({ commit }, payload) {
    commit("setUser", payload);
    if (payload) {
      commit("setSession", true);
    }
  },
};

const mutations = {
  setUser($state, payload) {
    const stateCopy = $state;
    stateCopy.user = payload;
  },
  setSession($state, payload) {
    const stateCopy = $state;
    stateCopy.hasSession = payload;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
