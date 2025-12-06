import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type {
  APIResponse,
  InputCreateUser,
  Credentials,
  UserDetails,
  Link
} from '@/services/types';
import API from '@/services/api';
import type { AxiosError } from 'axios';
import { mapUserResponseToDomain } from '@/services/userMapper';

export const useUserStore = defineStore('user', () => {
  const links = ref<Link[]>([]);
  const loading = ref<boolean>(false);
  const user = ref<UserDetails>({
    isAuthenticated: false,
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: null
  });
  const isAuthenticated = computed(() => user.value.isAuthenticated);

  const setUserDetails = (data: UserDetails) => {
    user.value = data;
  };

  const addLink = () => {
    const newLink: Link = {
      id: crypto.randomUUID(),
      platform: '',
      url: '',
      displayOrder: links.value.length
    };
    links.value.push(newLink);
  };
  const removeLink = (id: string) => {
    links.value = links.value.filter((link) => link.id !== id);
  };
  const updateLink = (newLink: Link) => {
    const link = links.value.find((link) => newLink.id === link.id);
    if (link) {
      link.platform = newLink.platform;
      link.url = newLink.url;
    }
  };

  const getLinks = computed(() => {
    return links.value;
  });

  const resetUser = () => {
    user.value = {
      isAuthenticated: false,
      firstName: '',
      lastName: '',
      email: '',
      profilePicture: null
    };
  };

  const logout = () => {
    resetUser();
  };

  const dispatchRegisterUser = async (
    input: InputCreateUser
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { status, data } = await API.createUser(input);
      if (status === 201) {
        await dispatchFetchCurrentUser();
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false };
    }
  };

  const dispatchPersonalDetails = async (
    newData: UserDetails
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { status, data } = await API.updateUser(newData);
      if (status === 200) {
        setUserDetails(mapUserResponseToDomain(data.content));
        return { success: true };
      }
      return { success: false, error: 'Failed to update user details' };
    } catch (err) {
      const _error = err as AxiosError<string>;
      return { success: false, error: _error.message };
    }
  };

  const dispatchLoginUser = async (
    creds: Credentials
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data } = await API.login(creds);
      if (data.success) {
        setUserDetails(mapUserResponseToDomain(data.content));
        return { success: true };
      }
      return { success: false, error: 'Failed login' };
    } catch (err) {
      const _error = err as AxiosError<string>;
      return { success: false, error: _error.message };
    }
  };

  const dispatchLogoutUser = async (): Promise<void> => {
    try {
      await API.logout();
    } catch {
    } finally {
      resetUser();
    }
  };

  const dispatchFetchCurrentUser = async (): Promise<void> => {
    try {
      const { status, data } = await API.me();
      if (status === 200) {
        setUserDetails(mapUserResponseToDomain(data.content));
      }
    } catch {
      resetUser();
    } finally {
      loading.value = false;
    }
  };

  const init = async () => {
    await dispatchFetchCurrentUser();
  };

  return {
    user,
    isAuthenticated,
    logout,
    dispatchRegisterUser,
    dispatchLogoutUser,
    dispatchFetchCurrentUser,
    dispatchLoginUser,
    dispatchPersonalDetails,
    init,
    addLink,
    removeLink,
    updateLink,
    getLinks,
    links
  };
});
