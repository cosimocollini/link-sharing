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

let initialized = false;

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!initialized) {
    await userStore.dispatchFetchCurrentUser();
    initialized = true;
  }

  const isAuth = userStore.isAuthenticated;
  if ((to.path === '/login' || to.path === '/register') && isAuth) {
    return next({ name: 'dashboard' });
  }

  if (to.meta.requiresAuth && !isAuth) return next({ name: 'login' });

  next();
});

export default router;
