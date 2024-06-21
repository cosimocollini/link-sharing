import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import SelectInput from '../components/inputs/Select.vue';
import * as yup from 'yup';


const textRule = yup.string().required().min(2);
const emailRule = yup.string().email();

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Inputs/Select',
  component: SelectInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    label: "Select label",
    id: "testId",
    options: [{label: 'Github', value: 'github'},{label: 'Youtube', value: 'youtube'},{label: 'Twitter', value: 'twitter'}],
    //rules: textRule,
    modelValue: null
  },
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const SelectTest: Story = {
  args: {
    label: 'Select',
    id: 'test',
  },
};