import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { APIResponse, InputCreateUser, User, Credentials } from '@/services/types';
import API from '@/services/api';
import type { AxiosError } from 'axios';

export const useUserStore = defineStore('user', () => {
  const loading = ref<boolean>(false);
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  const logout = () => {
    user.value = null;
  };

  const setUser = (response: User | null) => {
    user.value = response;
  };

  async function dispatchRegisterUser(input: InputCreateUser): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.createUser(input);
      if (status === 201) {
        // backend imposta cookie HttpOnly
        // Fetchamo subito il profilo utente
        await dispatchFetchCurrentUser();
        return { success: true, content: null };
      }
      return { success: false, content: null, status };
    } catch (err) {
      const _error = err as AxiosError<string>;
      return { success: false, status: _error.response?.status, content: null };
    }
  }

  async function dispatchLoginUser(creds: Credentials): Promise<APIResponse<null>> {
    try {
      const { status } = await API.login(creds);
      if (status === 200) {
        await dispatchFetchCurrentUser();
        return { success: true, content: null };
      }
      return { success: false, content: null, status };
    } catch (err) {
      const _error = err as AxiosError<string>;
      return { success: false, status: _error.response?.status, content: null };
    }
  }

  async function dispatchLogoutUser(): Promise<void> {
    try {
      await API.logout();
    } catch {
      // ignora errori, tanto puliamo lo stato
    } finally {
      setUser(null);
    }
  }

  async function dispatchFetchCurrentUser(): Promise<void> {
    try {
      const { status, data } = await API.me();
      if (status === 200) {
        setUser(data.content);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      loading.value = false;
    }
  }

  // Inizializzazione del store: chiama “me” al caricamento dell’app
  async function init() {
    await dispatchFetchCurrentUser();
  }

  return {
    user,
    isAuthenticated,
    logout,
    dispatchRegisterUser,
    dispatchLogoutUser,
    dispatchFetchCurrentUser,
    dispatchLoginUser,
    init
  };
});
