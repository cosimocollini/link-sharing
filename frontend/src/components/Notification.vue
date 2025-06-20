<script setup lang="ts">
import { ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui';
import { ref, provide } from 'vue';

const isOpen = ref(false);

const startNotification = () => {
  isOpen.value = true;
};

provide('notification', startNotification);
</script>

<template>
  <ToastProvider swipeDirection="down" class="ToastProvider">
    <ToastRoot v-model:open="isOpen" class="ToastRoot">
      <ToastTitle class="heading-s"
        ><SvgIcon name="save" class="mr-1" />Your changes have been successfully saved!</ToastTitle
      >
    </ToastRoot>

    <slot></slot>
    <ToastViewport class="ToastViewport" />
  </ToastProvider>
</template>

<style lang="scss">
@use '@/scss/abstracts' as *;

.ToastViewport {
  position: fixed;
  bottom: 0;
  left: 50%;
  list-style-type: none;
  padding: 0;
  margin-bottom: rem(40);
  transform: translateX(-50%);

  .ToastRoot {
    background-color: $color-dark;
    border-radius: 12px;
    padding: 24px;

    .heading-s {
      color: $white;
      margin: 0;
    }

    &[data-state='open'] {
      animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    &[data-state='closed'] {
      animation: hide 100ms ease-in;
    }
    &[data-swipe='move'] {
      transform: translateY(0);
    }
    &[data-swipe='cancel'] {
      transform: translateY(0);
      transition: transform 200ms ease-out;
    }
    &[data-swipe='end'] {
      animation: swipeOut 100ms ease-out;
    }
  }
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes swipeOut {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
