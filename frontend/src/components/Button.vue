<template>
  <button :type="props.type" :class="classes" :disabled="props.disabled" @click="onClick">{{ label }}</button>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  const props = withDefaults(defineProps<{
    label: string,
    primary?: boolean,
    disabled?: boolean,
    fullWidth?: boolean,
  }>(), { primary: true, disabled: false, fullWidth: true, type: "button" });

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