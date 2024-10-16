import { ProfileDetail } from '@/types/apis/student';
import { defineStore } from 'pinia';

export const useStudentStore = defineStore('student', {
  state: () => {
    return {
      token: '' as string,
      profile: {} as ProfileDetail,
    };
  },
  getters: {
    getStudentToken: (state) => () => {
      return state.token;
    },
    getStudentProfile: (state) => () => {
      return state.profile;
    },
    getPhoto: (state) => () => {
      return state.profile.photo;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    removeToken() {
      this.token = '';
    },
    setProfile(profile: ProfileDetail) {
      this.profile = profile;
    },
    setPhoto(photo: string) {
      this.profile.photo = photo;
    },
  },
  persist: true,
});
