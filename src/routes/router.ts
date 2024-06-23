import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { PATH } from '~/constants/path'
import MainLayout from '~/layouts/MainLayout.vue'

// -----------------------------
const HomePage = () => import('~/pages/HomePage.vue')
const DiscoveryPage = () => import('~/pages/DiscoveryPage.vue')
const ComingSoonPage = () => import('~/pages/ComingSoonPage.vue')

// -----------------------------
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: PATH.HOME, name: 'Overview', component: HomePage },
      { path: PATH.DISCOVERY, name: 'Discovery', component: DiscoveryPage },
      { path: PATH.MAP, name: 'Map', component: ComingSoonPage },
      { path: PATH.GAME, name: 'Game', component: ComingSoonPage },
      { path: '', redirect: PATH.HOME },
      { path: '/:p*', redirect: PATH.HOME }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  document.title = to.name ? `This World | ${to.name as string}` : 'This World'
  next()
})

export default router
