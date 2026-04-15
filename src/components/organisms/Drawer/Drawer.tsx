import { type CSSProperties, type ReactNode, useEffect, useCallback, useRef } from 'react';
import { Icon } from '../../atoms/Icon';

export type DrawerSide = 'left' | 'right' | 'bottom';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  width?: number | string;
  /** Hauteur pour le drawer bottom */
  height?: number | string;
  closeOnOverlay?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Drawer = ({
  open,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  width = 360,
  height = '60vh',
  closeOnOverlay = true,
  className,
  style,
}: DrawerProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  /* Swipe-to-close for bottom drawer */
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (side === 'bottom') touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (side === 'bottom' && touchStartY.current !== null) {
      const delta = e.changedTouches[0].clientY - touchStartY.current;
      if (delta > 60) onClose();
      touchStartY.current = null;
    }
  };

  const getDrawerStyle = (): CSSProperties => {
    const base: CSSProperties = {
      position: 'fixed',
      background: 'var(--color-surface-primary)',
      boxShadow: 'var(--shadow-xl)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      fontFamily: 'var(--font-body)',
      transition: `transform var(--motion-duration-base) var(--motion-easing-spring)`,
      ...style,
    };
    if (side === 'right')  return { ...base, top: 0, right: 0, bottom: 0, width, transform: open ? 'translateX(0)' : 'translateX(100%)' };
    if (side === 'left')   return { ...base, top: 0, left: 0, bottom: 0, width, transform: open ? 'translateX(0)' : 'translateX(-100%)' };
    return { ...base, left: 0, right: 0, bottom: 0, height, borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', transform: open ? 'translateY(0)' : 'translateY(100%)' };
  };

  return (
    <>
      <style>{`@keyframes drawer-overlay-in { from { opacity: 0; } to { opacity: 1; } }`}</style>

      {/* Overlay */}
      <div
        onClick={closeOnOverlay ? onClose : undefined}
        style={{
          position: 'fixed',
          inset: 0,
          background: `rgba(10,10,10,var(--opacity-overlay))`,
          zIndex: 999,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: `opacity var(--motion-duration-base) var(--motion-easing-ease-out)`,
        }}
      />

      <aside role="dialog" aria-modal className={className} style={getDrawerStyle()} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--spacing-6)', borderBottom: '1px solid var(--color-border-primary)', flexShrink: 0 }}>
          {title && <h2 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>{title}</h2>}
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-tertiary)' }}>
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-6)' }}>{children}</div>

        {/* Footer */}
        {footer && (
          <div style={{ padding: 'var(--spacing-4) var(--spacing-6)', borderTop: '1px solid var(--color-border-primary)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-3)', flexShrink: 0 }}>
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};
