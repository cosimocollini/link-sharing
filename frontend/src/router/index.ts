import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlankView from '@/views/BlankView.vue'
import Login from '@/components/forms/Login.vue'
import Register from '@/components/forms/Register.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      component: BlankView,
      children: [
        {
          path: '',
          name: 'login',
          component: Login
        }
      ]
    },
    {
      path: '/register',
      component: BlankView,
      children: [
        {
          path: '',
          name: 'register',
          component: Register
        }
      ]
    },
  ]
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isAuthenticated) return { name: 'login' }
})

export default router
