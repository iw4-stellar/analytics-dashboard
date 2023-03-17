<template>
  <div class="site section">
    <!-- Breadcrumbs -->
    <div class="text-sm breadcrumbs">
      <ul>
        <li>
          <i class="pi pi-home mr-2"></i>
          <a class="link link-hover">
            Dashboard
          </a>
        </li> 
        <li>
          <i class="pi pi-globe mr-2"></i>
          <a class="link link-hover">
            Sites
          </a>
        </li> 
        <li>1</li>
      </ul>
    </div>
    <progress v-if="isSiteLoading" class="progress"></progress>
    <div v-else class="header">
      <!-- Heading -->
      <div>
        <span>Site</span>
        <h1>
          {{  site?.name }}
        </h1>
        <div>
          <a :href="site?.url" target="_blank" class="link mr-2">
            {{  site?.url }}
          </a>
          <i class="pi pi-link"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSitesStore } from '@/stores/sitesStore';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SiteView',
  setup() {
    const router = useRouter();
    const route = router.currentRoute.value;

    const sitesStore = useSitesStore()
    const { getSite } = sitesStore;
    const { site, isSiteLoading } = storeToRefs(sitesStore);

    onMounted(async () => {
      const id = route.params.id as string;
      
      try {
        await getSite(id);
      } catch (e) {
        router.replace({ name: 'not-found', params: { pathMatch: route.fullPath } })
      }
    })

    return {
      site,
      isSiteLoading,
    }
  }
});
</script>

<style lang="postcss" scoped>
</style>