<template>
  <main class="blank-view">
    <SvgIcon name="logo-complete" class="logo-desktop"></SvgIcon>
    <RouterView />
  </main>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue';
</script>

<style lang="scss">
@use '@/scss/abstracts' as *;

.blank-view {
  .logo-desktop {
    width: 100%;
    height: rem(50);
    max-width: 182px;
    margin: 0 auto;
  }
}
</style>
