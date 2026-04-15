import { type CSSProperties, type ReactNode, useState, useRef, useEffect } from 'react';
import { Avatar } from '../../atoms/Avatar';
import { Icon } from '../../atoms/Icon';

export interface ChatMessage {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorInitials?: string;
  content: ReactNode;
  timestamp: string;
  sent?: boolean;
  reactions?: { emoji: string; count: number }[];
}

export interface ChatFeedProps {
  messages: ChatMessage[];
  onSend?: (message: string) => void;
  currentUserId?: string;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const ChatFeed = ({ messages, onSend, loading, className, style }: ChatFeedProps) => {
  const [draft, setDraft] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    const t = draft.trim();
    if (!t) return;
    onSend?.(t);
    setDraft('');
  };

  const feedStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: 'var(--color-surface-secondary)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border-primary)',
    overflow: 'hidden',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const bubbleStyle = (sent: boolean): CSSProperties => ({
    maxWidth: '70%',
    padding: 'var(--spacing-3) var(--spacing-4)',
    borderRadius: sent ? 'var(--radius-xl) var(--radius-xl) var(--radius-sm) var(--radius-xl)' : 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
    background: sent ? 'var(--color-primary-default)' : 'var(--color-surface-primary)',
    color: sent ? '#ffffff' : 'var(--color-text-primary)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-relaxed)',
    boxShadow: 'var(--shadow-sm)',
  });

  return (
    <div className={className} style={feedStyle}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: msg.sent ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 'var(--spacing-3)' }}>
            {!msg.sent && (
              <Avatar size="sm" src={msg.authorAvatar} initials={msg.authorInitials ?? msg.authorName.slice(0, 2)} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sent ? 'flex-end' : 'flex-start', gap: 4 }}>
              {!msg.sent && <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>{msg.authorName}</span>}
              <div style={bubbleStyle(!!msg.sent)}>{msg.content}</div>
              <span style={{ fontSize: 10, color: 'var(--color-text-tertiary)' }}>{msg.timestamp}</span>
              {msg.reactions && msg.reactions.length > 0 && (
                <div style={{ display: 'flex', gap: 4 }}>
                  {msg.reactions.map((r) => (
                    <span key={r.emoji} style={{ background: 'var(--color-surface-primary)', border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-full)', padding: '1px 6px', fontSize: 12, cursor: 'pointer' }}>
                      {r.emoji} {r.count}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-3)' }}>
            <Avatar size="sm" initials="AI" />
            <div style={{ ...bubbleStyle(false), display: 'flex', gap: 4, alignItems: 'center', padding: 'var(--spacing-3) var(--spacing-4)' }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-primary-default)', display: 'inline-block', animation: `typing 1s ${d}s ease-in-out infinite` }} />
              ))}
              <style>{`@keyframes typing { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }`}</style>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {onSend && (
        <div style={{ padding: 'var(--spacing-4)', borderTop: '1px solid var(--color-border-primary)', display: 'flex', gap: 'var(--spacing-3)', background: 'var(--color-surface-primary)' }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Écrire un message…"
            style={{ flex: 1, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-full)', padding: '8px 16px', outline: 'none', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', background: 'var(--color-surface-secondary)' }}
          />
          <button
            onClick={handleSend}
            disabled={!draft.trim()}
            style={{ width: 40, height: 40, borderRadius: '50%', background: draft.trim() ? 'var(--color-primary-default)' : 'var(--color-neutral-200)', border: 'none', cursor: draft.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}
          >
            <Icon name="arrow_right" size={20} color={draft.trim() ? '#fff' : 'var(--color-text-tertiary)'} />
          </button>
        </div>
      )}
    </div>
  );
};
