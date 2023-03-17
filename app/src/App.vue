<template>
  <div class="app">
    <header>
      <sidenav />
    </header>
    <main class="prose">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/stores/appStore'
import Sidenav from './components/Sidenav.vue';

export default defineComponent({
  name: 'App',
  components: {
    Sidenav,
  },
  setup() {
    const appStore = useAppStore();

    const appName = computed(() => appStore.name)

    return {
      appName,
    }
  }
})
</script>

<style lang="postcss" scoped>
.app {
  @apply flex justify-center h-screen;
}

main {
  @apply flex-1 h-screen overflow-y-auto;
}
</style>
