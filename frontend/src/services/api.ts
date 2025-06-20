import axios from 'axios';

import type { APIResponse, User, InputCreateUser } from './types';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
});

async function getUser() {
  return await http.get<APIResponse<User[]>>('register');
}

async function createUser(input: InputCreateUser) {
  return await http.post<APIResponse<User>>('register', input, { headers: {} });
}

export default { getUser, createUser };
