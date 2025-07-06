import { ref, computed, inject } from 'vue';
import { defineStore } from 'pinia';
import type {
  APIResponse,
  InputCreateUser,
  Credentials,
  UserDetails,
  UserDetailsResponse,
  Link
} from '@/services/types';
import API from '@/services/api';
import type { AxiosError } from 'axios';
import { mapUserResponseToDomain } from '@/services/userMapper';
import router from '@/router';

export const useUserStore = defineStore('user', () => {
  const links = ref<Link[]>([]);
  const loading = ref<boolean>(false);
  const user = ref<UserDetails>({
    isAuthenticated: false,
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: undefined
  });
  const isAuthenticated = computed(() => user.value.isAuthenticated);

  const startNotification = inject('notification') as () => void;

  const setUserDetails = (data: UserDetails) => {
    user.value = data;
  };

  const addLink = () => {
    const newLink: Link = {
      id: crypto.randomUUID(),
      name: '',
      url: ''
    };
    links.value.push(newLink);
  };
  const removeLink = (id: string) => {
    links.value = links.value.filter((link) => link.id !== id);
  };
  const updateLink = (newLink: Link) => {
    const link = links.value.find((link) => newLink.id === link.id);
    if (link) {
      link.name = newLink.name;
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
        startNotification();
        setUserDetails(mapUserResponseToDomain(data.content));
        return { success: true, content: mapUserResponseToDomain(data.content) };
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
        console.log('ME:', data, user.value);
        setUserDetails(mapUserResponseToDomain(data.content));
        console.log('ME:', data, user.value);
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
    init,
    addLink,
    removeLink,
    updateLink,
    getLinks,
    links
  };
});
