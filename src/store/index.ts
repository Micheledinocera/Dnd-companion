import { Campagna } from "@/model/Campagna";
import { createStore } from "vuex";
import firebaseStore from "./firebaseStore";

export default createStore({
  state: {
    selectedCampagna: new Campagna() as Campagna,
  },
  getters: {
    getSelectedCampagna: (state: any): Campagna =>
      state.selectedCampagna as Campagna,
  },
  mutations: {
    setSelectedCampagna: (state: any, selectedCampagna: Campagna) =>
      (state.selectedCampagna = selectedCampagna as Campagna),
  },
  actions: {
    setSelectedCampagna: (context, selectedCampagna: Campagna) =>
      context.commit("setSelectedCampagna", selectedCampagna as Campagna),
  },
  modules: { firebaseStore },
});
