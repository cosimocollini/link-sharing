<script lang="ts" setup>
import { computed } from 'vue';
import SvgIcon from './SvgIcon.vue';

const props = withDefaults(
  defineProps<{
    label: string;
    type?: 'button' | 'submit' | 'reset';
    level?: 'primary' | 'secondary' | 'tertiary' | 'blank';
    disable?: boolean;
    fullWidth?: boolean;
    iconLeft?: string;
    iconRight?: string;
  }>(),
  { level: 'primary', disabled: false, fullWidth: false, type: 'button' }
);

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const classes = computed(() => ({
  button: true,
  'button--primary': props.level === 'primary',
  'button--tertiary': props.level === 'tertiary',
  'button--secondary': props.level === 'secondary',
  'button--blank': props.level === 'blank',
  'button--full-width': props.fullWidth,
  'button--disabled': props.disable === true
}));

const onClick = () => {
  emit('click', 2);
};
</script>

<template>
  <button
    :type="props.type"
    :class="classes"
    :disabled="props.disable"
    @click="onClick"
    :aria-disabled="props.disable"
  >
    <SvgIcon v-if="props.iconLeft" :name="props.iconLeft" class="mr-2" />
    {{ label }}
    <SvgIcon v-if="props.iconRight" :name="props.iconRight" class="ml-2" />
  </button>
</template>
