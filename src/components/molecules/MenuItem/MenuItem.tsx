import { type CSSProperties, type ReactNode } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';

export interface MenuItemProps {
  label: ReactNode;
  icon?: IconName;
  shortcut?: string;
  hasSubmenu?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const MenuItem = ({
  label,
  icon,
  shortcut,
  hasSubmenu = false,
  destructive = false,
  disabled = false,
  active = false,
  onClick,
  className,
  style,
}: MenuItemProps) => {
  const color = destructive
    ? 'var(--color-semantic-error-default)'
    : disabled
    ? 'var(--color-text-disabled)'
    : 'var(--color-text-primary)';

  const baseStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
    width: '100%',
    padding: 'var(--spacing-2) var(--spacing-4)',
    background: active ? 'var(--color-surface-secondary)' : 'transparent',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-base)',
    color,
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    textAlign: 'left',
    borderRadius: 'var(--radius-md)',
    transition: 'background var(--motion-duration-fast) var(--motion-easing-ease-out)',
    ...style,
  };

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      aria-disabled={disabled}
      aria-haspopup={hasSubmenu ? 'menu' : undefined}
      className={className}
      style={baseStyle}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={(e) => !disabled && !active && ((e.currentTarget as HTMLElement).style.background = 'var(--color-surface-secondary)')}
      onMouseLeave={(e) => !active && ((e.currentTarget as HTMLElement).style.background = 'transparent')}
    >
      {icon && (
        <Icon
          name={icon}
          size={16}
          color={destructive ? 'var(--color-semantic-error-default)' : 'currentColor'}
        />
      )}
      <span style={{ flex: 1 }}>{label}</span>
      {shortcut && (
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginLeft: 'var(--spacing-4)' }}>
          {shortcut}
        </span>
      )}
      {hasSubmenu && (
        <Icon name="arrow_right" size={16} color="var(--color-text-tertiary)" />
      )}
    </button>
  );
};
