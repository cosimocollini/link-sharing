import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import BlankView from '@/views/BlankView.vue';
import Login from '@/components/forms/Login.vue';
import Register from '@/components/forms/Register.vue';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
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
    }
  ]
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const isAuth = userStore.isAuthenticated;

  if ((to.path === '/login' || to.path === '/register') && userStore.isAuthenticated) {
    return { name: 'dashboard' };
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) return { name: 'login' };
});

export default router;
