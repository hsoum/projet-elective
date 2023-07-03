import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import store from '@/store/index'
import Users from '@/views/Users.vue'
import AccountView from '@/views/AccountView.vue'
import Home from '@/views/Home.vue'
import EditUser from '@/views/EditUser.vue'
import NotFound from '@/views/NotFound.vue'
import Stat from '@/views/Stat.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/AccountView',
    name: 'AccountView',
    component: AccountView,
  },
  {
    path: '/Users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/EditUser',
    name: 'EditUser',
    component: EditUser,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/Stat',
    name: 'Stat',
    component: Stat,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach(async function (to, from, next) {
//   if (store.getters.isAuthenticated) {
//     next();
//   } else {
//     next({ name: 'AccountView' });
//   }
// })

export default router
