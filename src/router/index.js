import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: () => import(/* webpackChunkName: "about" */ '../views/Monitoring.vue')
  },
  {
    path: '/merchand',
    name: 'Merchand',
    component: () => import(/* webpackChunkName: "about" */ '../views/Merchand.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
