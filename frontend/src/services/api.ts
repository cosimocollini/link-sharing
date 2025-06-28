import axios from 'axios';

import type { APIResponse, User, InputCreateUser, Credentials } from './types';
import { useUserStore } from '@/stores/user';
import router from '@/router';

const publicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});

const authAPI = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true
});

authAPI.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      // 1. Se hai un refresh endpoint, prova a rinfrescare qui
      // 2. Altrimenti, pulisci lo store e reindirizza
      const userStore = useUserStore();
      await userStore.dispatchLogoutUser();
      router.push('/login');
    }
    return Promise.reject(err);
  }
);

async function getUser() {
  return await authAPI.get<APIResponse<User[]>>('register');
}

async function createUser(input: InputCreateUser) {
  return await authAPI.post<APIResponse<User>>('register', input, { headers: {} });
}

async function logout() {
  return await authAPI.post<APIResponse<null>>('logout', {}, { headers: {} });
}

async function login(creds: Credentials) {
  return await authAPI.post<APIResponse<null>>('login', creds, { headers: {} });
}

async function me() {
  return await authAPI.get<APIResponse<User>>('me', { headers: {} });
}

export default { getUser, createUser, logout, login, me };
