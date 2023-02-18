<script setup lang="ts">
import { defineComponent } from 'vue';

</script>

<template>
  <div class="app">
    <header>
      <div class="brand" title="Analytics Dashboard">AD</div>
      <nav>
        <ul class="flex flex-col items-center">
          <li>
            <div class="tooltip tooltip-right" data-tip="Home">
              <router-link to="/" class="btn btn-ghost btn-square">
                <i class="pi pi-home"></i>
              </router-link>
            </div>
          </li>
        </ul>
      </nav>
      <div class="actions">
        <theme-switch />
      </div>
    </header>
    <main class="prose">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue'

export default defineComponent({
  name: 'App',
  components: {

  },
})
</script>

<style lang="postcss" scoped>
.app {
  @apply flex justify-center h-screen;
}

header {
  @apply flex flex-col gap-4 p-2 bg-primary text-primary-content;
}

main {
  @apply flex-1 h-screen overflow-y-auto;
}

.brand {
  @apply aspect-square h-16 flex items-center justify-center;
}

.actions {
  @apply justify-self-end mt-auto flex justify-center;
}

:deep(.btn-square i) {
  @apply text-xl;
}
</style>
