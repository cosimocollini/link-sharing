<template>
  <svg class="icon" :class="customClass" aria-hidden="true">
    <use :href="spritePath" :fill="props.color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  customClass: { type: String, default: '' },
  color: { type: String, default: '#757575' }
});

const spritePath = computed(() => `#${props.name}`);
</script>

<style scoped>
.icon {
  width: 16px;
  height: 16px;
}
</style>
