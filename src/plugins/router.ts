import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: readonly RouteRecordRaw[] = [
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  }
]

const history = createWebHistory()

export const router = createRouter({
  routes,
  history
})