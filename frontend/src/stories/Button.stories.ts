import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';
import Button from '../components/CustomButton.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  args: {
    primary: false,
    disabled: false,
    fullWidth: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn()
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const ButtonPrimary: Story = {
  args: {
    primary: true,
    label: 'Button'
  }
};

export const ButtonSecondary: Story = {
  args: {
    primary: false,
    label: 'Button'
  }
};

export const ButtonDisabled: Story = {
  args: {
    primary: true,
    label: 'Button',
    disabled: true
  }
};

export const ButtonFullWidth: Story = {
  args: {
    primary: true,
    label: 'Button',
    fullWidth: true
  }
};
