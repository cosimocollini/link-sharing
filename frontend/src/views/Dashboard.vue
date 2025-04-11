<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
</script>

<template>
  <main>
    <Navigation />
    <div class="dashboard">
      <div class="preview-container box"></div>
      <div class="settings-container box" id="tab-content"></div>
    </div>
  </main>
</template>
