import { defineStore } from "pinia";
import { axios } from "@/plugins/axios";

export interface Site {
  id: string;
  name: string;
  url: string;
}

export interface State {
  isSitesLoading: boolean;
  sites: Site[],

  isSiteLoading: boolean,
  site: Site | null,
}


export const useSitesStore = defineStore("sites", {
  state: (): State => {  
    return {
      isSitesLoading: false,
      sites: [],
      isSiteLoading: false,
      site: null,
    }
  },

  actions: {
    async getSites() {
      try {
        this.isSitesLoading = true
        const { data } = await axios.get('/sites')
        this.sites = data;

        return data;
      } finally {
        this.isSitesLoading = false;
      }
    },
    async getSite(id: string): Promise<Site| null> {
      try {
        this.isSiteLoading = true;
        const { data } = await axios.get(`/sites/${id}`)
        this.site = data;

        return data;
      } finally {
        this.isSiteLoading = false;
      }
    },
  },
});