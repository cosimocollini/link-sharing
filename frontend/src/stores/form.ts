import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import type { Link } from '@/services/types';

export const useFormStore = defineStore('form', () => {
  const links = ref<Link[]>([
    { id: crypto.randomUUID(), name: 'github', url: 'https://example.com' }
  ]);

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

  return { links, addLink, removeLink, updateLink, getLinks };
});
