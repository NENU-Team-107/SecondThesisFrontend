import { defineStore } from 'pinia';

export const useSiteInfoStore = defineStore('siteInfo', {
  state: () => {
    return {
      baseUrl: 'http://localhost:8080/api/v1',
    };
  },
  persist: true,
  getters: {
    getBaseUrl: (state: { baseUrl: string }) => () => {
      return state.baseUrl;
    },
  },
});