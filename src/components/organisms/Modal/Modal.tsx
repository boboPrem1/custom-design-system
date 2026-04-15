import { type CSSProperties, type ReactNode, useEffect, useRef, useCallback } from 'react';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export type ModalSize = 'sm' | 'md' | 'lg' | 'fullscreen';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  /** Ferme en cliquant sur l'overlay */
  closeOnOverlay?: boolean;
  /** Affiche une croix de fermeture */
  showClose?: boolean;
  className?: string;
  style?: CSSProperties;
}

const SIZE_WIDTH: Record<ModalSize, string> = {
  sm:         '400px',
  md:         '560px',
  lg:         '800px',
  fullscreen: '100vw',
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  showClose = true,
  className,
  style,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Fermer avec Escape */
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

  if (!open) return null;

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: `rgba(10,10,10,var(--opacity-overlay))`,
    display: 'flex',
    alignItems: size === 'fullscreen' ? 'stretch' : 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: size === 'fullscreen' ? 0 : 'var(--spacing-8)',
    animation: 'modal-fade-in var(--motion-duration-base) var(--motion-easing-ease-out)',
  };

  const dialogStyle: CSSProperties = {
    background: 'var(--color-surface-primary)',
    borderRadius: size === 'fullscreen' ? 0 : 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    width: SIZE_WIDTH[size],
    maxWidth: size === 'fullscreen' ? '100vw' : '100%',
    maxHeight: size === 'fullscreen' ? '100vh' : '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'modal-slide-up var(--motion-duration-base) var(--motion-easing-spring)',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  return (
    <>
      <style>{`
        @keyframes modal-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-slide-up { from { transform: translateY(16px) scale(0.98); opacity: 0; } to { transform: none; opacity: 1; } }
      `}</style>
      <div
        role="dialog"
        aria-modal
        aria-label={typeof title === 'string' ? title : undefined}
        style={overlayStyle}
        onClick={closeOnOverlay ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}
      >
        <div ref={dialogRef} className={className} style={dialogStyle}>
          {/* Header */}
          {(title || showClose) && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--spacing-6)', borderBottom: '1px solid var(--color-border-primary)', gap: 'var(--spacing-4)', flexShrink: 0 }}>
              {title && <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)' }}>{title}</h2>}
              {showClose && (
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-tertiary)', marginLeft: 'auto' }}>
                  <Icon name="close" size={20} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-6)' }}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div style={{ padding: 'var(--spacing-4) var(--spacing-6)', borderTop: '1px solid var(--color-border-primary)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-3)', flexShrink: 0 }}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
