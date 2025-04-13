<script lang="ts" setup>
import SvgIcon from './SvgIcon.vue';
import NavigationTabs from '@/components/NavigationTabs.vue';
import Button from '@/components/CustomButton.vue';
</script>

<template>
  <nav>
    <div class="box">
      <SvgIcon name="logo"></SvgIcon>
      <NavigationTabs />
      <Button label="Preview" level="secondary"></Button>
    </div>
  </nav>
</template>
