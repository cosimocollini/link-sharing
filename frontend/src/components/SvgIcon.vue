<template>
  <svg class="icon" :class="customClass">
    <use :xlink:href="spritePath"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: { String, required: true },
  customClass: { String, default: '' }
});

const spritePath = computed(() => `/src/assets/stack/svg/sprite.css.svg#${props.name}`);
</script>

<style scoped>
.icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
