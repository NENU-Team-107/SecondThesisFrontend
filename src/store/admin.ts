import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      token: '' as string,
    };
  },
  getters: {
    getAdminToken: (state) => () => {
      return state.token;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    removeToken() { 
      this.token = '';
    },
  },
  persist: true,
});

