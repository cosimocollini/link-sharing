import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlankView from '@/views/BlankView.vue'
import Login from '@/components/forms/Login.vue'
import Register from '@/components/forms/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: BlankView,
      children: [
        {
          path: '',
          name: 'loginForm',
          component: Login
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: BlankView,
      children: [
        {
          path: '',
          name: 'registerForm',
          component: Register
        }
      ]
    },
  ]
})

// router.beforeEach(async (to, from) => {
//   // canUserAccess() returns `true` or `false`
//   // const canAccess = await canUserAccess(to)
//   const canAccess = false
//   if (!canAccess) return { name: 'login' }
// })

export default router
