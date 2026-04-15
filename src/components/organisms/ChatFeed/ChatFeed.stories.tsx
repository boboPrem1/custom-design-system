import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatFeed } from './ChatFeed';
import { type ChatMessage } from './ChatFeed';

const MESSAGES: ChatMessage[] = [
  { id: '1', authorName: 'Alice',  authorInitials: 'AL', content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', timestamp: '10:00', sent: false, reactions: [{ emoji: '👋', count: 2 }] },
  { id: '2', authorName: 'Moi',    authorInitials: 'MO', content: 'J\'ai une question sur les tokens de couleur.', timestamp: '10:01', sent: true },
  { id: '3', authorName: 'Alice',  authorInitials: 'AL', content: 'Bien sûr ! Les tokens sont définis dans `global.json` et générés via Style Dictionary. Chaque variable CSS suit le pattern `--color-semantic-*`.', timestamp: '10:02', sent: false },
  { id: '4', authorName: 'Moi',    authorInitials: 'MO', content: 'Parfait, merci !', timestamp: '10:03', sent: true },
];

const meta = {
  title: 'Organisms/ChatFeed',
  component: ChatFeed,
  args: { messages: MESSAGES },
  decorators: [(Story) => <div style={{ height: 480 }}><Story /></div>],
} satisfies Meta<typeof ChatFeed>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ReadOnly: Story = {};
export const WithInput: Story = { args: { onSend: (msg: string) => alert(`Envoyé : ${msg}`) } };
export const Typing: Story = { args: { loading: true, onSend: () => {} } };
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [msgs, setMsgs] = useState<ChatMessage[]>(MESSAGES);
    const send = (text: string) => setMsgs((prev) => [
      ...prev,
      { id: String(Date.now()), authorName: 'Moi', authorInitials: 'MO', content: text, timestamp: new Date().toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' }), sent: true },
    ]);
    return <div style={{ height: 480 }}><ChatFeed messages={msgs} onSend={send} /></div>;
  },
};
