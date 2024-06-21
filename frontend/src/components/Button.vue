<template>
  <button type="button" :class="classes" :disabled="props.disabled" @click="onClick">{{ label }}</button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  /**
   * The label of the button
   */
  label: string,
  /**
   * primary or secondary button
   */
  primary?: boolean,
  /**
   * disabled button
   */
  disabled?: boolean,

  fullWidth?: boolean,

}>(), { primary: false });

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const classes = computed(() => ({
  'button': true,
  'button--primary': props.primary,
  'button--secondary': !props.primary,
  'button--full-width': props.fullWidth,
}));

const onClick = () => {
  emit("click", 1)
};

</script>