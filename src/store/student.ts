import { defineStore } from 'pinia';

export const useStudentStore = defineStore('student', {
  state: () => {
    return {
      token: '' as string,
    };
  },
  getters: {
    getStudentToken: (state) => () => {
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
