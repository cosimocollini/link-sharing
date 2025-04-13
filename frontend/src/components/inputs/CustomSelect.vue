<script setup lang="ts">
import SvgIcon from '../SvgIcon.vue';
import { ref } from 'vue';
import {
  Label,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from 'radix-vue';

import { LINKS } from '@/constants';

const fruit = ref();
</script>

<template>
  <Label>
    <span class="body-s">Platform</span>
    <SelectRoot v-model="fruit">
      <SelectTrigger class="SelectTrigger" aria-label="Customise options">
        <SelectValue placeholder="Select a platform..." />
        <SvgIcon name="arrow"></SvgIcon>
      </SelectTrigger>

      <SelectContent
        class="SelectContent box shadow"
        :side-offset="8"
        :align="'start'"
        :position="'popper'"
      >
        <SelectViewport class="SelectViewport">
          <SelectGroup>
            <SelectItem
              v-for="(option, index) in LINKS"
              :key="index"
              class="SelectItem"
              :value="option.label"
            >
              <SvgIcon :name="option.icon"></SvgIcon>
              <SelectItemText>
                {{ option.label }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>
      </SelectContent>
    </SelectRoot>
  </Label>
</template>

<style lang="scss">
@use '@/scss/abstracts' as *;

.SelectTrigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 0 16px;
  line-height: 1;
  height: rem(48);
  gap: 5px;
  background-color: white;
  border: 1px solid $color-grey-medium;
  cursor: pointer;
  width: 100%;

  > svg {
    transition: 0.2s ease-in-out;
  }

  &[data-state='open'] {
    border-color: $color-main;
    box-shadow: 0px 0px 32px rgba(99, 60, 255, 0.25);

    > svg {
      transform: rotate(180deg);
    }
  }
}
.SelectTrigger:hover {
  box-shadow: 0px 0px 32px rgba(99, 60, 255, 0.25);
  border: 1px solid $color-main;
}
.SelectTrigger:focus {
  box-shadow: 0px 0px 32px rgba(99, 60, 255, 0.25);
}
.SelectTrigger[data-placeholder] {
  color: $color-dark;
}

.SelectContent {
  overflow: hidden;
  background-color: $white;
  border-radius: 8px;
  border: 1px solid $color-grey-medium;
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  // max-height: 176px;
}

.SelectViewport {
  padding: 0 16px;
  background-color: $white;
}

.SelectItem {
  display: flex;
  align-items: center;
  height: rem(48);
  position: relative;
  user-select: none;
  gap: 12px;
  &:nth-child(n + 2) {
    border-top: 1px solid $color-grey-medium;
  }
}
.SelectItem[data-disabled] {
  color: yellow;
  pointer-events: none;
}
.SelectItem[data-highlighted],
.SelectItem[data-state='checked'] {
  outline: none;
  color: $color-main;
  > svg {
    fill: $color-main;
    color: $color-main;
  }
}
</style>
