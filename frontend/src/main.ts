import './scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';

import 'virtual:svg-icons-register';

import router from '@/router';
import { useUserStore } from '@/stores/user';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const userStore = useUserStore();
userStore.init().then(() => {
  app.mount('#app');
});
