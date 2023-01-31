import { createStore } from "vuex";
import user from "./modules/user";
import fetchHelper from "@/helper/fetchHelper";

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
    async fetchBoxs({ commit }) {
      try {
        const response = await fetchHelper.getBoxs();
        commit("SET_BOXS", response.data);
      } catch (err) {
        console.error(
          `Il y a eu une erreur lors de la requête vers les boxs [${err.response.status}]`
        );
      }
    },
    async fetchOrder({ commit }) {
      try {
        const response = await fetchHelper.getOrder();
        commit("SET_ORDER", response.data.pop());
      } catch (err) {
        console.error(
          `Il y a eu une erreur lors de la requête vers l'order [${err.response.status}]`
        );
      }
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
    user,
  },
});
