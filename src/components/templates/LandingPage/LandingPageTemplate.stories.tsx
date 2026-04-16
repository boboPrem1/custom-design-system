import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingPageTemplate } from './LandingPageTemplate';

const meta = {
  title: 'Templates/LandingPage',
  component: LandingPageTemplate,
  parameters: { layout: 'fullscreen' },
  args: {},
} satisfies Meta<typeof LandingPageTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};
export const NoTestimonials: Story = { args: { socialProof: [] } };
