import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AppWrapper from '@/AppWrapper.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: AppWrapper,
  },
  {
    path: '/pictures',
    name: 'pictures',
    component: () => import('@/components/EmailPictures.vue'),
  },
  {
    path: '/impressum',
    name: 'impressum',
    component: () => import('@/views/ImprintView.vue'),
  },
  {
    path: '/datenschutz',
    name: 'dataProtection',
    component: () => import('@/views/DataProtection.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
