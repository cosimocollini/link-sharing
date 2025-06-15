import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import Input from '../components/inputs/Input.vue';
import * as yup from 'yup';


const textRule = yup.string().required().min(2);
const emailRule = yup.string().email();

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Inputs/Input',
  component: Input,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    label: "Input label",
    type: "text",
    inputId: "testId",
    name: "name",
    placeholder: "placeholder",
    icon: "github",
    rules: textRule,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const InputText: Story = {
  args: {
    label: 'Text',
    type: 'text',
    name: 'text',
    placeholder: 'Text',
    rules: textRule,
  },
};
export const InputEmail: Story = {
  args: {
    label: 'Email',
    icon: 'mail',
    type: 'email',
    name: 'email',
    placeholder: 'Email',
    rules: emailRule,
  },
};
export const InputPassword: Story = {
  args: {
    label: 'Password',
    icon: 'lock',
    placeholder: 'Password',
  },
};
