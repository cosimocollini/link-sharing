import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { InputCreateUser, User } from '@/services/users/types';
import type { APIResponse } from '@/services/types';
import { API } from '@/services';
import type { AxiosError } from 'axios';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  const logout = () => {
    user.value = null;
  };

  const addUser = (response: User) => {
    user.value = response
  }

  async function dispatchRegisterUser(
    input: InputCreateUser
  ): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.users.createUser(input);
      if (status === 200) {
        addUser(data.content);
        return {
          success: true,
          content: null,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      };
    }
    return {
      success: false,
      content: null,
      status: 400,
    };
  }

  return {
    user,
    isAuthenticated,
    logout,
    dispatchRegisterUser
  };
});

