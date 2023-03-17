<template>
  <div class="not-found">
    <button class="btn btn-ghost btn-xs mb-4 gap-2" @click="goBack">
      <i class="pi pi-arrow-left"></i>
      Go back
    </button>
    <div class="prose">
      <h1>Page not found</h1>
      <kbd class="kbd">{{ path }}</kbd>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFoundView',
  computed: {
    path() {
      const path = this.$route.fullPath.split('').splice(1).join('')

      return decodeURIComponent(path)
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
})
</script>

<style lang="postcss" scoped>
.not-found {
  @apply p-8;
}
</style>