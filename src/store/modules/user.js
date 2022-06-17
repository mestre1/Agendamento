const state = {
  user: null,
  hasSession: false,
  userUID: "",
};

const getters = {
  currentUser: () => state.user,
  hasSession: () => state.hasSession,
  getUID: () => state.userUID,
};

const actions = {
  addUser({ commit }, payload) {
    commit("setUser", payload);
    if (payload) {
      commit("setSession", true);
    }
  },
  addUID({ commit }, payload) {
    commit("setUID", payload);
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
  setUID($state, payload) {
    const stateCopy = $state;
    stateCopy.userUID = payload;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
