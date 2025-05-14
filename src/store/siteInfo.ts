import { defineStore } from "pinia";

export const useSiteInfoStore = defineStore("siteInfo", {
  state: () => {
    return {
      baseUrl: import.meta.env.VITE_APP_API_URL,
    };
  },
  persist: true,
  getters: {
    getBaseUrl: (state: { baseUrl: string }) => () => {
      return state.baseUrl;
    },
  },
});
