import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { Link, UserDetails } from '@/services/types';
import type { User } from '@/services/users/types';

export const useFormStore = defineStore('form', () => {
  const links = ref<Link[]>([]);

  const userDetails = ref<UserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: undefined
  });

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

  return { links, userDetails, addLink, removeLink, updateLink, getLinks };
});
