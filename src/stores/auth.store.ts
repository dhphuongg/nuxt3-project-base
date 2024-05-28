import { defineStore, acceptHMRUpdate } from "pinia";

export const useAuthStoreStore = defineStore("auth.store", {
  state: () => ({}),
  getters: {},
  actions: {}
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStoreStore, import.meta.hot));
}
