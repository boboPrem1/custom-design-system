import {
  type CSSProperties,
  type MouseEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Icon } from '../Icon';

export type ChipVariant = 'filled' | 'outline';

export interface ChipProps {
  label: ReactNode;
  variant?: ChipVariant;
  /** Si true, affiche un × cliquable */
  removable?: boolean;
  onRemove?: () => void;
  /** Si true, le chip est cliquable (toggle sémantique) */
  clickable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Chip = ({
  label,
  variant = 'filled',
  removable = false,
  onRemove,
  clickable = false,
  selected = false,
  onClick,
  disabled = false,
  className,
  style,
}: ChipProps) => {
  const isInteractive = clickable && !disabled;

  /* ── Styles de base ─────────────────────────────────────── */
  const filledBase: CSSProperties =
    variant === 'filled'
      ? {
          background: selected
            ? 'var(--color-primary-default)'
            : 'var(--color-neutral-100)',
          color: selected ? '#ffffff' : 'var(--color-text-primary)',
          border: '1px solid transparent',
        }
      : {
          background: selected
            ? 'var(--color-primary-50)'
            : 'transparent',
          color: selected
            ? 'var(--color-primary-default)'
            : 'var(--color-text-secondary)',
          border: selected
            ? '1px solid var(--color-primary-default)'
            : '1px solid var(--color-border-secondary)',
        };

  const chipStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-1)',
    padding: '0 var(--spacing-3)',
    height: '28px',
    borderRadius: 'var(--radius-full)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    lineHeight: 1,
    userSelect: 'none',
    cursor: isInteractive ? 'pointer' : disabled ? 'not-allowed' : 'default',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transition: `background var(--motion-duration-fast) var(--motion-easing-ease-out),
                 color var(--motion-duration-fast) var(--motion-easing-ease-out),
                 border-color var(--motion-duration-fast) var(--motion-easing-ease-out)`,
    outline: 'none',
    ...filledBase,
    ...style,
  };

  /* ── Bouton × de suppression ────────────────────────────── */
  const removeStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
    color: 'inherit',
    opacity: 0.6,
    marginLeft: '2px',
    transition: `opacity var(--motion-duration-fast) var(--motion-easing-ease-out)`,
  };

  const handleChipClick = () => {
    if (isInteractive) onClick?.();
  };

  const handleChipKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  const handleRemoveClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled) onRemove?.();
  };

  return (
    <div
      role={clickable ? 'checkbox' : undefined}
      aria-checked={clickable ? selected : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      onClick={handleChipClick}
      onKeyDown={handleChipKeyDown}
      className={className}
      style={chipStyle}
    >
      <span>{label}</span>

      {removable && (
        <button
          type="button"
          aria-label="Supprimer"
          disabled={disabled}
          onClick={handleRemoveClick}
          style={removeStyle}
        >
          <Icon name="close" size={12} />
        </button>
      )}
    </div>
  );
};
