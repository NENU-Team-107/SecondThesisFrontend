import { defineStore } from 'pinia';

export const useSiteInfoStore = defineStore('siteInfo', {
  state: () => {
    return {
      baseUrl: '',
    };
  },
  persist: true,
  getters: {
    getBaseUrl: (state: { baseUrl: string }) => () => {
      return state.baseUrl;
    },
  },
});