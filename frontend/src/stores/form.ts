import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

interface Link {
  id: string;
  name: string;
  url: string;
}

export const useFormStore = defineStore('form', () => {
  const links = ref<Link[]>([
    { id: crypto.randomUUID(), name: 'github', url: 'https://example.com' }
  ]);

  const addLink = (name: string, url: string) => {
    const newLink: Link = {
      id: crypto.randomUUID(),
      name,
      url
    };
    links.value.push(newLink);
  };
  const removeLink = (id: string) => {
    links.value = links.value.filter((link) => link.id !== id);
  };
  const updateLink = (id: string, name: string, url: string) => {
    const link = links.value.find((link) => link.id === id);
    if (link) {
      link.name = name;
      link.url = url;
    }
  };

  return { links, addLink, removeLink, updateLink };
});
