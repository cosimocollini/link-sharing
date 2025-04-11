<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<template>
  <div class="tab-content">
    <div class="p-5 links-container">
      <h1 class="heading-m mt-0">Customize your links</h1>
      <p class="body-m">
        Add/edit/remove links below and then share all your profiles with the world!
      </p>
      <Button label="+ Add new link" :full-width="true" level="secondary"></Button>
    </div>

    <div class="footer py-4 px-3">
      <Button label="Save" level="primary"></Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/abstracts' as *;

.tab-content {
  display: flex;
  flex-direction: column;
  height: 100%;

  .links-container {
    flex: 1 1 auto;
  }

  .footer {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid $color-grey-medium;
    position: sticky;
    bottom: 0;
    left: 0;
  }
}
</style>
