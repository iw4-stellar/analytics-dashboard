import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { useAuthStore } from "@/stores/authStore"

const routes: readonly RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    redirect: '/login',
    // component: () => import('@/views/Index.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register.vue'),
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      authenticated: true,
    },
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
]


const history = createWebHistory()

export const router = createRouter({
  routes,
  history
})

router.beforeEach((to) => {
  const authStore = useAuthStore();


  if (to.meta.authenticated && !authStore.authenticated) {
    return { name: 'login', query: { next: to.fullPath } }
  }
});