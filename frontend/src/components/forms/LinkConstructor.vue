<script setup lang="ts">
import Select from '@/components/inputs/CustomSelect.vue';
import Input from '@/components/inputs/Input.vue';
import Button from '@/components/CustomButton.vue';

import type { Link } from '@/services/types';
import { toRefs } from 'vue';
import type { AcceptableValue } from 'reka-ui';

interface Props {
  index: number;
  modelValue: Link;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'updatelink', newLink: Link): void;
  (e: 'remove'): void;
}
const emit = defineEmits<Emits>();

const { modelValue: link } = toRefs(props);

const updateLinkName = (value: AcceptableValue) => {
  emit('updatelink', { ...link.value, name: value as string });
};

const updateLinkUrl = (value: string) => {
  emit('updatelink', { ...link.value, url: value });
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
      <Button label="Remove" level="blank" @click="onRemove"></Button>
    </div>
    <Select v-model="link.name" @update:model-value="updateLinkName" />
    <Input
      v-model="link.url"
      @update:model-value="updateLinkUrl"
      name="link"
      type="text"
      placeholder="e.g. https://www.github.com/johnappleseed"
      input-id="link-URL-{{ props.index }}"
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
      }
    }
  }
}
</style>
