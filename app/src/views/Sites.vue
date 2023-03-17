<template>
  <section class="sites section">
    <div>
      <h1>Sites</h1>

      <button class="btn btn-sm btn-primary gap-2">
        <i class="pi pi-plus"></i>
        New site
      </button>
    </div>

    <div>
      <sites-table />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SitesTable from '@/components/SitesTable.vue';

export default defineComponent({
  name: 'SitesView',
  components: {
    SitesTable,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="postcss" scoped>
.sites {

}
</style>