<script lang="ts" setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';
import SvgIcon from '@/components/SvgIcon.vue';

const [model, modifiers] = defineModel<string | undefined>({
  type: String,
  default: undefined,
  set(value: string | undefined) {
    if (modifiers.lowercase) {
      return value?.toLowerCase();
    }
    return value;
  }
});

const props = withDefaults(
  defineProps<{
    //modelValue: string;
    label?: string;
    type: string;
    inputId: string;
    name: string;
    placeholder?: string;
    icon?: string;
    rules?: any;
    value?: string;
    class?: string;
    required?: boolean;
  }>(),
  { type: 'text', rules: [], class: '', required: false }
);

const name = toRef(props, 'name');

const { value, errorMessage, handleBlur, handleChange, meta } = useField(name, props.rules, {
  initialValue: props.value
});
</script>

<template>
  <div class="field" :class="[{ 'has-error': !!errorMessage, success: meta.valid }, props.class]">
    <label :for="name">{{ label }}{{ required ? '*' : '' }}</label>
    <div class="field__input-wrapper">
      <SvgIcon v-if="props.icon" :name="props.icon" />
      <input
        v-model="model"
        :name="name"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        @input="handleChange"
        @blur="handleBlur"
        :aria-invalid="errorMessage ? 'true' : 'false'"
        :aria-errormessage="`errormessage-${name}`"
      />
      <p class="message" v-show="errorMessage || meta.valid" :id="`errormessage-${name}`">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
