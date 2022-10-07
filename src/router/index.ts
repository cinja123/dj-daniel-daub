import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AppWrapper from '@/AppWrapper.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: AppWrapper,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
