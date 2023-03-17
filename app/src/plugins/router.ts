import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

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