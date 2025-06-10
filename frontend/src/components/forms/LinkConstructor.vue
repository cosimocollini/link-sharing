<script setup lang="ts">
import Select from '@/components/inputs/CustomSelect.vue';
import Input from '@/components/inputs/Input.vue';
import Button from '@/components/CustomButton.vue';
</script>

<template>
  <div class="link-constructor box">
    <div class="link-constructor__header">
      <p class="grab">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none">
          <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z" />
        </svg>
        Link #
      </p>
      <Button label="Remove" level="blank"></Button>
    </div>
    <Select />
    <Input
      name="link"
      type="text"
      placeholder="e.g. https://www.github.com/johnappleseed"
      input-id="link"
      label="Link"
      icon="link"
      class="mt-2 mb-0"
    />
  </div>
</template>

<style lang="scss" scoped>
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
  }
}
</style>
