import { defineStore } from "pinia";

export const useFirstLoginStore = defineStore("firstLogin", {
  state: () => ({
    isFirstLogin: false,
  }),
  actions: {
    setFirstLogin(value: boolean) {
      this.isFirstLogin = value;
    },
  },
  persist: true,
}); 