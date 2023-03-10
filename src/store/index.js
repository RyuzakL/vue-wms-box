import { createStore } from "vuex";
import userModule from "./modules/user";

export default createStore({
  state: {
    boxs: {},
    order: {},
    addedBoxs: [],
    isCommandRegistered: false,
    siteClient: {},
  },
  mutations: {
    SET_BOXS(state, boxs) {
      state.boxs = boxs;
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
    ADD_BOX(state, box) {
      state.addedBoxs.push(box);
    },
    SET_REF_ORDER(state, updatedOrder) {
      state.order = updatedOrder;
    },
    SET_ITEMS_ORDER(state, updatedOrder) {
      state.order = updatedOrder;
    },
    SET_COMMAND_REGISTERED(state, bool) {
      state.isCommandRegistered = bool;
    },
    SET_SITE_CLIENT(state, newSiteClient) {
      state.siteClient = newSiteClient;
    },
  },
  actions: {
    async fetchOrder({ commit }) {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/RyuzakL/wms/orders"
        );
        const data = await response.json();
        commit("SET_ORDER", data.pop());
      } catch (err) {
        console.error(
          `Il y a eu une erreur lors de la requête vers l'order [${err.message}]`
        );
      }
    },
    setBoxs({ commit }, boxs) {
      commit("SET_BOXS", boxs);
    },
    addBox({ commit }, box) {
      commit("ADD_BOX", box);
    },
    updateOrderRef({ commit, state }, ref) {
      commit("SET_REF_ORDER", { ...state.order, reference: ref });
    },
    updatesOrderItems({ commit, state }, newItems) {
      commit("SET_ITEMS_ORDER", { ...state.order, items: newItems });
    },
    setCommandRegisterd({ commit }, bool) {
      commit("SET_COMMAND_REGISTERED", bool);
    },
    updateSiteClient({ commit }, newSite) {
      commit("SET_SITE_CLIENT", newSite);
    },
  },
  modules: {
    userModule,
  },
});
