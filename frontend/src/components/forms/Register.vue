<script lang="ts" setup>
import { useForm } from 'vee-validate';
import Input from '../inputs/Input.vue';
import Button from '../Button.vue';
import * as yup from 'yup';
import { useUserStore } from '@/stores/user';
import type { InputCreateUser } from '@/services/users/types';

const userStore = useUserStore();

interface RegisterForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

const { handleSubmit, errors } = useForm<RegisterForm>({
  validationSchema: yup.object({
    email: yup.string().email('Must be a valid email').required("Can't be empty"),
    password: yup.string().min(8, 'Must be at least 8 characters').required('Please check again'),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
  })
});

const onSubmit = handleSubmit(async (values) => {
  //alert(JSON.stringify(values, null, 2));
  const { success, status } = await userStore.dispatchRegisterUser(values);
});
</script>

<template>
  <div class="box login-form-wrapper">
    <h1 class="heading-m mt-0 mb-1">Create account</h1>
    <h2 class="body-m mb-0">Let’s get you started sharing your links!</h2>
    <form @submit="onSubmit" action="/register" method="post" class="mt-5">
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
        placeholder="At least 8 characters"
        input-id="password"
        label="Create password"
        icon="lock"
      />
      <Input
        name="passwordConfirm"
        type="password"
        placeholder="At least 8 characters"
        input-id="passwordConfirm"
        label="Confirm password"
        icon="lock"
      />
      <p class="body-s mt-0 mb-3">Password must contain at least 8 characters</p>
      <Button label="Login" type="submit" />
    </form>
    <p class="txt-center mb-0">
      Already have an account? <RouterLink to="/login">Login</RouterLink>
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
