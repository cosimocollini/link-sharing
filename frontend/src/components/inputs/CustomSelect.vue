<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue';
import { ref, computed, toRefs } from 'vue';
import {
  Label,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  useForwardPropsEmits
} from 'reka-ui';
import type { SelectRootEmits, SelectRootProps } from 'reka-ui';

import { LINKS } from '@/constants';
import { useField } from 'vee-validate';

const props = defineProps<SelectRootProps>();
const emits = defineEmits<SelectRootEmits>();

const forward = useForwardPropsEmits(props, emits);

const { modelValue, name } = toRefs(props);

const options = computed(() =>
  Object.entries(LINKS).map(([key, { label, icon }]) => ({
    value: key,
    label,
    icon
  }))
);

const selectedLabel = computed(() => {
  const found = options.value.find((opt) => opt.value === modelValue.value);
  return found ? found.label : '';
});

const { errorMessage, handleChange, meta } = useField(name.value || '', {
  initialValue: modelValue.value
});
</script>

<template>
  <Label>
    <span class="body-s select-label" :class="{ error: errorMessage }">Platform</span>
    <SelectRoot v-bind="forward" @update:model-value="handleChange">
      <SelectTrigger
        class="SelectTrigger"
        aria-label="Select a platform"
        :aria-invalid="errorMessage ? 'true' : 'false'"
        :aria-errormessage="`errormessage-${name}`"
      >
        <SelectValue placeholder="Select a platform...">
          <SvgIcon v-if="modelValue" :name="modelValue as string" />
          {{ selectedLabel || 'Select a platform...' }}
        </SelectValue>
        <p class="message" v-show="errorMessage || meta.valid" :id="`errormessage-${name}`">
          {{ errorMessage }}
        </p>
        <SvgIcon name="arrow"></SvgIcon>
      </SelectTrigger>

      <SelectContent
        class="SelectContent box shadow"
        :side-offset="8"
        :align="'start'"
        :position="'popper'"
        positionStrategy="fixed"
      >
        <SelectViewport class="SelectViewport">
          <SelectGroup>
            <SelectItem
              v-for="(option, index) in LINKS"
              :key="index"
              class="SelectItem"
              :value="option.icon"
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

.select-label {
  &.error {
    color: $red;
  }
}

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

  &[aria-invalid='true'] {
    border-color: $red;
  }

  .message {
    @extend .body-s;
    margin: 0;
    white-space: nowrap;
    margin-left: auto;
    margin-right: 8px;
    color: $red;
  }

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

  > span {
    display: flex;
    align-self: center;
    gap: 16px;
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
  width: var(--reka-select-trigger-width);
  max-height: var(--reka-select-content-available-height);
  z-index: 999;
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
