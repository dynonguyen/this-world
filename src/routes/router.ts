import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { PATH } from '~/constants/path'
import MainLayout from '~/layouts/MainLayout.vue'

// -----------------------------
const OverviewPage = () => import('~/pages/OverviewPage.vue')
const DiscoveryPage = () => import('~/pages/DiscoveryPage.vue')
const CountryDetailPage = () => import('~/pages/CountryDetailPage.vue')
const MapPage = () => import('~/pages/MapPage.vue')
const GuessingGamePage = () => import('~/pages/GuessingGamePage.vue')

// -----------------------------
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: PATH.OVERVIEW, name: 'Overview', component: OverviewPage },
      { path: PATH.DISCOVERY, name: 'Discovery', component: DiscoveryPage },
      { path: PATH.COUNTRY, name: 'Country', component: CountryDetailPage },
      { path: PATH.MAP, name: 'Map', component: MapPage },
      { path: PATH.GAME, name: 'Guessing Game', component: GuessingGamePage },
      { path: '', redirect: PATH.OVERVIEW },
      { path: '/:p*', redirect: PATH.OVERVIEW }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    document.title = to.name ? `This World | ${to.name as string}` : 'This World'
  }
  next()
})

export default router
