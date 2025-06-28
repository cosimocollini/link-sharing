import './scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import 'virtual:svg-icons-register';
import { useUserStore } from '@/stores/user';

import router from '@/router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const userStore = useUserStore();
userStore.init().then(() => {
  app.mount('#app');
});
// app.mount('#app');
