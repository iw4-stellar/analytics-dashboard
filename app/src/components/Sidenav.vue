<template>
  <div class="sidenav">
    <div class="brand">AD</div>
    <nav class="nav">
      <ul class="links">
        <li>
          <div
            v-for="link in links"
            :key="link.to"
            class="tooltip tooltip-right"
            :data-tip="link.tip"
          >
            <router-link :to="link.to" class="btn btn-ghost btn-square">
              <i class="pi" :class="{[link.icon]: true }"></i>
            </router-link>
          </div>
        </li>
      </ul>
    </nav>
    <div class="actions">
      <div v-if="authenticated" class="tooltip tooltip-right" data-tip="Log out">
        <button class="btn btn-ghost btn-square" @click="logout()">
          <i class="pi pi-sign-out"></i>
        </button>
      </div>
      <theme-switch />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import ThemeSwitch from '@/components/ThemeSwitch.vue'

export default defineComponent({
  name: 'Sidenav',
  components: {
    ThemeSwitch,
  },
  setup() {
    const authStore = useAuthStore();

    const authenticated = computed(() => authStore.authenticated)

    const allLinks = [
      {
        tip: 'Dashboard',
        icon: 'pi-home',
        to: '/dashboard',
        authenticated: true,
      },
    ]

    const links = computed(() => {
      return allLinks.filter((link) => {
        if (link.authenticated) return authenticated.value;

        return true;
      })
    })

    const logout = () => {
      const exit = window.confirm("Confirm log out ?")

      if (exit) {
        authStore.setAuthenticated(false);
      }
    }

    return {
      authenticated,
      links,
      logout,
    }
  },
})
</script>

<style lang="postcss" scoped>
.sidenav {
  @apply h-full p-2 bg-primary text-primary-content flex flex-col items-center;
}

.brand {
  @apply aspect-square h-16 flex items-center justify-center font-bold;
}

.nav {
  @apply flex-1;
}

.actions {
  @apply flex flex-col items-center gap-2;
}

</style>