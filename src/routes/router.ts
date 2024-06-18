import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { PATH } from '~/constants/path'
import MainLayout from '~/layouts/MainLayout.vue'

// -----------------------------
const HomePage = () => import('~/pages/HomePage.vue')

// -----------------------------
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: PATH.HOME, name: 'Home', component: HomePage },
      { path: '/:*', redirect: PATH.HOME }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.name ? `This World | ${to.name as string}` : 'This World'
  next()
})

export default router
