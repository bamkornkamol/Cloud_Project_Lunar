import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/HomePage.vue')
  },
  {
    path: '/HomeLogin',
    name: 'HomeLogin',
    component: () => import('./views/HomeLogin.vue')
  },
  {
    path: '/NotiPayment',
    name: 'NotiPayment',
    component: () => import('./views/NotiPayment.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router