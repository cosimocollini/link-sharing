<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';
import TabContentDetails from './TabContentDetails.vue';
import TabContentLinks from './TabContentLinks.vue';
</script>

<template>
  <TabsRoot class="TabsRoot" default-value="tab1">
    <TabsList class="TabsList" aria-label="Manage your account">
      <TabsIndicator class="TagsIndicator">
        <div style="width: 100%; height: 100%" class="bg-grass8 w-full h-full" />
      </TabsIndicator>
      <TabsTrigger class="TabsTrigger" value="tab1"> Links </TabsTrigger>
      <TabsTrigger class="TabsTrigger" value="tab2"> Profile Details </TabsTrigger>
    </TabsList>
    <Teleport defer to="#tab-content">
      <TabsContent class="TabsContent" value="tab1">
        <TabContentLinks />
      </TabsContent>
      <TabsContent class="TabsContent" value="tab2">
        <TabContentDetails />
      </TabsContent>
    </Teleport>
  </TabsRoot>
</template>

<style scoped lang="scss">
@use '@/scss/abstracts' as *;

button,
fieldset,
input {
  all: unset;
}

.TabsRoot {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.TabsList {
  flex-shrink: 0;
  display: flex;
  position: relative;
  gap: 16px;
}

.TagsIndicator {
  position: absolute;
  padding-left: 2rem;
  left: 0;
  height: 100%;
  bottom: 0;
  width: var(--reka-tabs-indicator-size);
  transform: translateX(var(--reka-tabs-indicator-position));
  border-radius: 8px;
  transition-property: width, transform;
  transition-duration: 300ms;
  background-color: $color-purple-light;
}

.TabsTrigger {
  position: relative;
  font-family: inherit;
  background-color: none;
  // background-color: white;
  padding: 11px 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: rem(16);
  line-height: 1;
  color: $color-grey-dark;
  user-select: none;
  border-radius: 8px;
  cursor: pointer;
}

.TabsTrigger:hover {
  color: $color-main;
}
.TabsTrigger[data-state='active'] {
  color: $color-main;
  // background-color: $color-purple-light;
}
.TabsTrigger:focus-visible {
  position: relative;
  box-shadow: 0 0 0 2px $color-purple;
}

.TabsContent {
  flex-grow: 1;
  // padding: 40px;
  background-color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  outline: none;
  height: 100%;
}
.TabsContent:focus {
  box-shadow: 0 0 0 2px $color-purple;
}
</style>
