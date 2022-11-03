import { createRouter, createWebHistory } from 'vue-router'
import AutoInterfaceView from '../views/AutoInterfaceView.vue'
import HomeView from '../views/HomeView.vue'

import DirectLEDVue from '@/views/DirectLED.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AutoInterfaceView
    },
    {
      path: '/leds',
      name: 'leds',
      component: DirectLEDVue
    },
    {
      path: '/auto',
      name: 'auto',
      component: AutoInterfaceView
    },
  ]
})

export default router
