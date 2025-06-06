<script setup lang="ts">
import InputFile from '@/components/inputs/InputFile.vue';
import Input from '@/components/inputs/Input.vue';
import Button from '@/components/CustomButton.vue';
</script>

<template>
  <div class="tab-content">
    <div class="p-5 links-container">
      <h1 class="heading-m mt-0">Profile details</h1>
      <p class="body-m mb-5">Add your details to create a personal touch to your profile.</p>

      <form action="" method="post">
        <InputFile inputId="profileImage"></InputFile>

        <div class="personal-data-wrapper mt-3">
          <Input
            name="firstName"
            type="text"
            placeholder="e.g. John"
            input-id="firstName"
            label="First name"
            :required="true"
          />
          <Input
            name="lastName"
            type="text"
            placeholder="e.g. Appleseed"
            input-id="lastName"
            label="Last name"
            :required="true"
          />
          <Input
            name="email"
            type="email"
            placeholder="e.g. email@example.com"
            input-id="email"
            label="Email"
          />
        </div>
      </form>
    </div>

    <div class="footer py-4 px-3">
      <Button label="Save" level="primary" :disable="true"></Button>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/scss/abstracts' as *;

.personal-data-wrapper {
  display: flex;
  flex-direction: column;
  background-color: $color-grey-light;
  padding: rem(20);

  .field {
    label {
      @extend .body-m;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  @include respond-to('md') {
    .field {
      display: flex;
      align-items: center;

      label {
        flex: 1;
        width: 30%;
      }

      &__input-wrapper {
        flex: 2;
        width: 100%;
      }
    }
  }
}
</style>
