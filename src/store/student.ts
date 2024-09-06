import { defineStore } from 'pinia';

export const useStudentStore = defineStore('student', {
  state: () => {
    return {
      token: '' as string,
    };
  },
  getters: {
    getStudentById: (state) => () => {
      return state.token;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
  persist: true,
});
