import { defineStore } from "pinia";
import { axios } from "@/plugins/axios";
import { getLocalStorageValue, setLocalStorageValue } from "@/utils/localStorage";

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
    const authenticated = getLocalStorageValue<boolean>("authenticated") || false;

    return {
      authenticated,
    }
  },
  actions: {
    setAuthenticated(status: boolean) {
      this.authenticated = status;
      setLocalStorageValue("authenticated", status)
    },
    login(credentials: LoginCredentials) {
      return axios. post('/auth/login', credentials);
    },
    register(data: RegistrationData) {
      return axios.post('/auth/register', data);
    },
    logout() {
      this.setAuthenticated(false); 
    },
  },
})