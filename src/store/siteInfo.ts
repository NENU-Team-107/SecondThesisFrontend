import { defineStore } from 'pinia';

export const useSiteInfoStore = defineStore('siteInfo', {
  state: () => {
    return {
      baseUrl: 'http://139.9.138.253/api/v1',
      // baseUrl: 'http://localhost:8080/api/v1',
    };
  },
  persist: true,
  getters: {
    getBaseUrl: (state: { baseUrl: string }) => () => {
      return state.baseUrl;
    },
  },
});