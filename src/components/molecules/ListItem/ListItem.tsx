import { type CSSProperties, type ReactNode } from 'react';
import { Avatar, type AvatarProps } from '../../atoms/Avatar';
import { Badge, type BadgeProps } from '../../atoms/Badge';
import { Icon, type IconName } from '../../atoms/Icon';

export interface ListItemProps {
  title: ReactNode;
  subtitle?: ReactNode;
  avatar?: AvatarProps;
  icon?: IconName;
  iconColor?: string;
  badge?: BadgeProps;
  action?: ReactNode;
  chevron?: boolean;
  disabled?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const ListItem = ({
  title,
  subtitle,
  avatar,
  icon,
  iconColor = 'var(--color-text-tertiary)',
  badge,
  action,
  chevron = false,
  disabled = false,
  clickable = false,
  onClick,
  className,
  style,
}: ListItemProps) => {
  const isInteractive = (clickable || !!onClick) && !disabled;

  const baseStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-3) var(--spacing-4)',
    background: 'transparent',
    border: 'none',
    width: '100%',
    cursor: isInteractive ? 'pointer' : disabled ? 'not-allowed' : 'default',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    textAlign: 'left',
    transition: 'background var(--motion-duration-fast) var(--motion-easing-ease-out)',
    ...style,
  };

  const content = (
    <>
      {avatar && <Avatar {...avatar} />}
      {!avatar && icon && (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--color-surface-secondary)', flexShrink: 0 }}>
          <Icon name={icon} size={20} color={iconColor} />
        </span>
      )}

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' as unknown as number, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </span>
        {subtitle && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {subtitle}
          </span>
        )}
      </div>

      {badge && <Badge {...badge} />}
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
      {chevron && <Icon name="arrow_right" size={16} color="var(--color-text-tertiary)" style={{ flexShrink: 0 }} />}
    </>
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        className={className}
        style={baseStyle}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-secondary)'}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={className} style={baseStyle}>
      {content}
    </div>
  );
};
