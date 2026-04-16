import type { Meta, StoryObj } from '@storybook/react-vite';
import { PresentationTemplate } from './PresentationTemplate';

const meta = {
  title: 'Templates/Presentation',
  component: PresentationTemplate,
  parameters: { layout: 'centered' },
  args: { logoText: 'Design System' },
} satisfies Meta<typeof PresentationTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoProgressBar: Story = { args: { showProgressBar: false } };
export const CustomColor: Story = { args: { primaryColor: '#20d4a0' } };
