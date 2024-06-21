import type { Meta, StoryObj } from '@storybook/vue3';
import SvgIcon from '../components/SvgIcon.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'SvgIcon',
  component: SvgIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    name: "logo",
  },
} satisfies Meta<typeof SvgIcon>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const IconLogo: Story = {
  args: {
  },
};
export const IconGithub: Story = {
  args: {
    name: 'github'
  },
};
export const IconYoutube: Story = {
  args: {
    name: 'youtube'
  },
};
