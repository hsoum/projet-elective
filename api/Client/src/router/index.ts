import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import Checkout from '@/views/Checkout.vue'
import Articles from '@/views/Articles.vue'
import Restaurants from '@/views/Restaurants.vue'
import AccountView from '@/views/AccountView.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import ModifAccount from '@/views/ModifAccount.vue'
import parrainer from '@/views/parrainer.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/articles/:id',
    name: 'Articles',
    component: Articles,
  },
  {
    path: '/ModifAccount',
    name: 'ModifAccount',
    component: ModifAccount,
  },

  {
    path: '/parrainer',
    name: 'parrainer',
    component: parrainer,
  },

  {
    path: '/AccountView',
    name: 'AccountView',
    component: AccountView,
  },
  {
    path: '/CreateAccount',
    name: 'CreateAccount',
    component: CreateAccount,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/Restaurants',
    name: 'Restaurants',
    component: Restaurants,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
