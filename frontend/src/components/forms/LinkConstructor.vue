<script setup lang="ts">
import Select from '@/components/inputs/CustomSelect.vue';
import Input from '@/components/inputs/Input.vue';
import Button from '@/components/CustomButton.vue';

import type { Link } from '@/services/types';
import { reactive } from 'vue';
import type { AcceptableValue } from 'reka-ui';

interface Props {
  index: number;
  modelValue: Link;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', updated: Link): void;
  (e: 'remove'): void;
}>();

const localLink = reactive({ ...props.modelValue });

const updateLinkName = (value: AcceptableValue) => {
  const name = value === null ? undefined : (value as string | undefined);
  const updated = { ...localLink, name };
  emit('update:modelValue', updated);
};

const updateLinkUrl = (value: string | undefined) => {
  const updated = { ...localLink, url: value };
  emit('update:modelValue', updated);
};

const onRemove = () => {
  emit('remove');
};
</script>

<template>
  <div class="link-constructor box">
    <div class="link-constructor__header">
      <p class="grab">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none">
          <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z" />
        </svg>
        Link #{{ index + 1 }}
      </p>
      <Button label="Remove" level="blank" type="button" @click="onRemove"></Button>
    </div>
    <Select
      v-model="localLink.name"
      @update:model-value="updateLinkName"
      :name="`links[${props.index}].name`"
    />
    <Input
      v-model="localLink.url"
      @update:model-value="updateLinkUrl"
      :name="`links[${props.index}].url`"
      type="text"
      placeholder="e.g. https://www.github.com/johnappleseed"
      input-id="`link-URL-${ props.index }`"
      label="Link"
      icon="link"
      class="mt-2 mb-0 full-width"
    />
  </div>
</template>

<style lang="scss">
@use '@/scss/abstracts' as *;

.link-constructor {
  background-color: $color-grey-light;
  padding: rem(20);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: rem(12);

    .grab {
      display: flex;
      align-items: center;
      gap: rem(8);
      font-weight: bold;
      cursor: grab;
    }
  }

  .field {
    margin-bottom: 0;
    width: 100%;
    background-color: unset;

    &__input-wrapper {
      input {
        width: 100%;
        background-color: $white;
      }
    }
  }
}
</style>
