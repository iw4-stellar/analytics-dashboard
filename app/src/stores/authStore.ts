import { defineStore } from "pinia";
import { axios } from "@/plugins/axios";

type Credentials = {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticated: false,
    }
  },
  actions: {
    async login(credentials: Credentials) {
      const { data } = await axios.post('/auth/login', credentials);

      return data;
    }
  }
})