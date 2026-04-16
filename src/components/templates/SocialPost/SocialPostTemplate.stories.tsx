import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialPostTemplate } from './SocialPostTemplate';

const meta = {
  title: 'Templates/SocialPost',
  component: SocialPostTemplate,
  parameters: { layout: 'centered' },
  args: {
    headline: 'Construisez des interfaces 10× plus vite',
    subline: 'Design System · React · TypeScript',
    ctaLabel: 'Découvrir →',
    logoText: 'DS',
  },
} satisfies Meta<typeof SocialPostTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Instagram_1x1: Story = { name: 'Instagram 1:1',       args: { ratio: '1:1',  platform: 'instagram' } };
export const Instagram_4x5: Story = { name: 'Instagram 4:5',       args: { ratio: '4:5',  platform: 'instagram' } };
export const Story_9x16:    Story = { name: 'Story 9:16 (Reels)',   args: { ratio: '9:16', platform: 'instagram' } };
export const LinkedIn_1x1:  Story = { name: 'LinkedIn 1:1',         args: { ratio: '1:1',  platform: 'linkedin',  background: 'linear-gradient(135deg,#0077B5 0%,#00a0dc 100%)' } };
export const YouTube_16x9:  Story = { name: 'YouTube Thumbnail 16:9',args: { ratio: '16:9', platform: 'youtube',  background: 'linear-gradient(135deg,#1a1a2e 0%,#FF0000 100%)' } };
