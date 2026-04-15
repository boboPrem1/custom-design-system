import { type CSSProperties, type ReactNode, useState } from 'react';
import { Icon } from '../../atoms/Icon';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Mode exclusif : un seul item ouvert à la fois */
  exclusive?: boolean;
  defaultOpenIds?: string[];
  className?: string;
  style?: CSSProperties;
}

export const Accordion = ({
  items,
  exclusive = false,
  defaultOpenIds = [],
  className,
  style,
}: AccordionProps) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (exclusive) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--color-border-primary)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {items.map((item, idx) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} style={{ borderBottom: idx < items.length - 1 ? '1px solid var(--color-border-primary)' : 'none' }}>
            <button
              id={`acc-btn-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${item.id}`}
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-4) var(--spacing-6)',
                background: isOpen ? 'var(--color-surface-secondary)' : 'var(--color-surface-primary)',
                border: 'none',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 'var(--opacity-disabled)' : 1,
                textAlign: 'left',
                fontWeight: 'var(--font-weight-medium)' as unknown as number,
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-primary)',
                gap: 'var(--spacing-4)',
                transition: `background var(--motion-duration-fast) var(--motion-easing-ease-out)`,
              }}
            >
              <span>{item.title}</span>
              <Icon
                name="arrow_right"
                size={18}
                color="var(--color-text-tertiary)"
                style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: `transform var(--motion-duration-base) var(--motion-easing-spring)`, flexShrink: 0 }}
              />
            </button>

            <div
              id={`acc-panel-${item.id}`}
              role="region"
              aria-labelledby={`acc-btn-${item.id}`}
              style={{
                maxHeight: isOpen ? 1000 : 0,
                overflow: 'hidden',
                transition: `max-height var(--motion-duration-base) var(--motion-easing-ease-out)`,
              }}
            >
              <div style={{ padding: 'var(--spacing-4) var(--spacing-6)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-relaxed)' }}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
