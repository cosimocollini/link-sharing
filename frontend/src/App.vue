<script setup lang="ts">
import { RouterView } from 'vue-router';
import Notification from '@/components/Notification.vue';
</script>

<template>
  <Notification>
    <RouterView />
  </Notification>
</template>
