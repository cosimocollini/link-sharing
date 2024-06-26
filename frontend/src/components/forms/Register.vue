<template>
    <div class="box login-form-wrapper">
        <h1 class="heading-m mt-0 mb-1">Create account</h1>
        <h2 class="text-m mb-0">Let’s get you started sharing your links!</h2>
        <form @submit="submitForm" action="/api/login" method="post" class="mt-5">
            <Input name="email" type="email" placeholder="e.g. alex@email.com" input-id="email" label="Email address"
                icon="mail" />
            <Input name="password" type="password" placeholder="At least 8 characters" input-id="password"
                label="Create password" icon="lock" />
            <Input name="password-confirm" type="password" placeholder="At least 8 characters"
                input-id="password-confirm" label="Confirm password" icon="lock" />
            <p class="text-s mt-0 mb-3">Password must contain at least 8 characters</p>
            <Button label="Login" type="submit" />
        </form>
        <p class="txt-center mb-0">Already have an account? <RouterLink to="/login">Login</RouterLink>
        </p>
    </div>
</template>

<script lang="ts" setup>
    import { useForm } from 'vee-validate';
    import Input from '../inputs/Input.vue';
    import Button from '../Button.vue';

    interface LoginForm {
        email: string;
        password: string;
    }

    const { submitForm } = useForm<LoginForm>();
</script>

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