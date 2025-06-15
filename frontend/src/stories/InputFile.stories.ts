import type { Meta, StoryObj } from '@storybook/vue3-vite';
import InputFile from '../components/inputs/InputFile.vue';
//import * as yup from 'yup';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Inputs/InputFile',
  component: InputFile,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    inputId: "file",
    //rules: textRule,
  },
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Input: Story = {
  args: {
  },
};
