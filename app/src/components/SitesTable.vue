<template>
  <div class="sites-table">
    <div v-if="isSitesLoading">
      <progress class="progress w-full"></progress>
    </div>
    <table v-else class="table">
      <thead>
        <th>Name</th>
        <th>URL</th>
      </thead>
      <tbody>
        <tr
          class="table-row"
          v-for="site in sites"
          :key="site.id"
        >
          <td class="font-bold">
            <router-link :to="{ name: 'site', params: { id: site.id } }">
              {{ site.name }}
            </router-link>
          </td>
          <td>
            <a :href="site.url" target="_blank" class="link mr-2">
              {{ site.url }}
            </a>
            <i class="pi pi-link"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSitesStore, Site } from '@/stores/sitesStore'

export default defineComponent({
  name: 'SitesTable',
  setup() {
    const sitesStore = useSitesStore();
    const { getSites} = sitesStore;
    const { isSitesLoading, sites } = storeToRefs(sitesStore)

    onMounted(() => getSites())

    const click = (site: Site) => {
      console.log(site);
    }

    return {
      isSitesLoading,
      sites,
      click,
    }
  },
});
</script>

<style lang="postcss" scoped>
.sites-table {
}
</style>