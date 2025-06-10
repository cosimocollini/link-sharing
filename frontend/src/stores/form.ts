import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

interface Link {
  id: string;
  name: string;
  url: string;
}

export const useFormStore = defineStore('form', () => {
  const links = ref<Link[]>([]);

  // const doubleCount = computed(() => count.value * 2);

  // function increment() {
  //   count.value++;
  // }

  return { links };
});
