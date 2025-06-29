<script lang="ts" setup>
import { useForm } from 'vee-validate';
import Input from '@/components/inputs/Input.vue';
import Button from '@/components/CustomButton.vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';

const userStore = useUserStore();

interface LoginForm {
  email: string;
  password: string;
}

const { handleSubmit, submitForm, isSubmitting } = useForm<LoginForm>();

const onSubmit = handleSubmit(async (values) => {
  const { success } = await userStore.dispatchLoginUser(values);
  if (success) {
    router.push({ name: 'dashboard' });
  }
});
</script>

<template>
  <div class="box login-form-wrapper">
    <h1 class="heading-m mt-0 mb-1">Login</h1>
    <h2 class="body-m mb-0">Add your details below to get back into the app</h2>
    <form @submit.prevent="onSubmit" novalidate class="mt-5">
      <Input
        name="email"
        type="email"
        placeholder="e.g. alex@email.com"
        input-id="email"
        label="Email address"
        icon="mail"
      />
      <Input
        name="password"
        type="password"
        placeholder="Enter your password"
        input-id="password"
        label="Password"
        icon="lock"
      />
      <Button label="Login" type="submit" :disable="isSubmitting" />
    </form>
    <p class="txt-center mb-0">
      Don't have an account? <RouterLink to="/register">Create account</RouterLink>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.login-form-wrapper {
  width: 100%;
  max-width: 476px;
  margin-top: 50px;

  form {
    display: flex;
    flex-direction: column;
  }
}
</style>
