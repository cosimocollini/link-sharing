<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import Preview from './Preview.vue';
</script>

<template>
  <main>
    <Navigation />
    <div class="dashboard">
      <div class="preview-container box" tabindex="-1"><Preview></Preview></div>
      <div class="settings-container box" id="tab-content"></div>
    </div>
  </main>
</template>
