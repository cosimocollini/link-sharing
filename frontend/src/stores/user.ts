import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { APIResponse, InputCreateUser, Credentials, UserDetails } from '@/services/types';
import API from '@/services/api';
import type { AxiosError } from 'axios';
import { mapUserResponseToDomain } from '@/services/userMapper';
import router from '@/router';

export const useUserStore = defineStore('user', () => {
  const loading = ref<boolean>(false);
  const user = ref<UserDetails>({
    isAuthenticated: false,
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: undefined
  });
  const isAuthenticated = computed(() => user.value.isAuthenticated);

  const setUserDetails = (data: UserDetails) => {
    user.value = data;
  };

  const resetUser = () => {
    user.value = {
      isAuthenticated: false,
      firstName: '',
      lastName: '',
      email: '',
      profilePicture: undefined
    };
  };

  const logout = () => {
    resetUser();
  };

  async function dispatchRegisterUser(input: InputCreateUser): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.createUser(input);
      if (status === 201) {
        await dispatchFetchCurrentUser();
        return { success: true, content: null };
      }
      return { success: false, content: null };
    } catch (err) {
      return { success: false, content: null };
    }
  }

  async function dispatchPersonalDetails(
    newData: UserDetails
  ): Promise<APIResponse<UserDetails | null>> {
    try {
      const { status, data } = await API.updateUser(newData);
      if (status === 200) {
        return { success: true, content: data.content };
      }
      return { success: false, content: null };
    } catch (err) {
      const _error = err as AxiosError<string>;
      return { success: false, content: null };
    }
  }

  async function dispatchLoginUser(creds: Credentials): Promise<void> {
    try {
      const { status, data } = await API.login(creds);
      console.log('Login response:', { status, data });
      console.log('Login response:', data.content.firstName);
      if (status === 200 && data) {
        setUserDetails(mapUserResponseToDomain(data.content));
        router.replace({ name: 'dashboard' });
      }
    } catch (err) {
      const _error = err as AxiosError<string>;
    }
  }

  async function dispatchLogoutUser(): Promise<void> {
    try {
      await API.logout();
    } catch {
    } finally {
      resetUser();
    }
  }

  async function dispatchFetchCurrentUser(): Promise<void> {
    try {
      const { status, data } = await API.me();
      if (status === 200) {
        setUserDetails(mapUserResponseToDomain(data.content));
      } else {
        resetUser();
      }
    } catch {
      resetUser();
    } finally {
      loading.value = false;
    }
  }

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
    dispatchPersonalDetails,
    init
  };
});
