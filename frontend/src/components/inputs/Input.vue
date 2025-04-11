<script lang="ts" setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';
import SvgIcon from '@/components/SvgIcon.vue';

const props = defineProps<{
  //modelValue: string;
  label?: string;
  type: string;
  inputId: string;
  name: string;
  placeholder?: string;
  icon?: string;
  rules?: any;
  value?: string;
}>();

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta
} = useField(name, props.rules, {
  initialValue: props.value
});
</script>

<template>
  <div class="field" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :for="name">{{ label }}</label>
    <div class="field__input-wrapper">
      <SvgIcon v-if="props.icon" :name="props.icon" />
      <input
        :name="name"
        :id="name"
        :type="type"
        :value="inputValue"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
      />
      <p class="message" v-show="errorMessage || meta.valid">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
