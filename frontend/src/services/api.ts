import axios, { type AxiosResponse } from 'axios';

import type {
  APIResponse,
  User,
  InputCreateUser,
  Credentials,
  UserDetails,
  UserDetailsResponse
} from './types';
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
  return await publicAPI.post<APIResponse<User>>('register', input, { headers: {} });
}

async function logout() {
  return await authAPI.post<APIResponse<null>>('logout', {}, { headers: {} });
}

async function login(creds: Credentials): Promise<AxiosResponse<APIResponse<UserDetailsResponse>>> {
  return await authAPI.post('login', creds, { headers: {} });
}

async function me() {
  return await authAPI.get<APIResponse<UserDetailsResponse>>('me', { headers: {} });
}

async function updateUser(input: UserDetails) {
  return await authAPI.put<APIResponse<UserDetailsResponse>>('update-user', input, { headers: {} });
}

export default { getUser, createUser, logout, login, me, updateUser };
