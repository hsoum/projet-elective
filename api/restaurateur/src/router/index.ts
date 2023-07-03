import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import Checkout from '@/views/Checkout.vue'
import Article from '@/views/Article.vue'

import AccountView from '@/views/AccountView.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import AjouterResto from '@/views/AjouterResto.vue'
import HCommandes from '@/views/HCommandes.vue'
import Vcommandes from '@/views/Vcommandes.vue'
import Menu from '@/views/Menu.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/Article',
    name: 'Article',
    component: Article,
  },
  {
    path: '/Vcommandes',
    name: 'Vcommandes',
    component: Vcommandes,
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: Menu ,
  },
  {
    path: '/AjouterResto',
    name: 'AjouterResto',
    component: AjouterResto,
  },

  {
    path: '/HCommandes',
    name: 'HCommandes',
    component: HCommandes,
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
