<script setup lang="ts">
import { computed, defineAsyncComponent, type Component } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  customClass: { type: String, default: '' },
  color: { type: String, default: '#757575' }
});

// Import dinamico dell'icona
const iconComponent = computed(() => {
  return defineAsyncComponent(() =>
    import(`@/assets/icons/${props.name}.svg?component`).catch((err) => {
      console.error(`Icona "${props.name}" non trovata`, err);
      return import('@/assets/icons/logo.svg?component');
    })
  );
});
</script>

<template>
  <div :class="['icon', customClass]">
    <component :is="iconComponent" />
  </div>
</template>

<style scoped>
.icon {
  display: block;
  width: 20px;
  height: 20px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}
</style>
