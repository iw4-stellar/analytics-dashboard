import { defineStore } from "pinia";
import { axios } from "@/plugins/axios";

interface LoginCredentials {
  email: string;
  password: string;
}

type RegistrationData = {
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
    login(credentials: LoginCredentials) {
      return axios.post('/auth/login', credentials);
    },
    register(data: RegistrationData) {
      return axios.post('/auth/register', data);
    },
  }
})