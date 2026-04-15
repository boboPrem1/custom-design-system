import {
  type CSSProperties,
  type TextareaHTMLAttributes,
  type ReactNode,
  forwardRef,
  useRef,
  useEffect,
  useCallback,
} from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Active le redimensionnement automatique selon le contenu */
  autoResize?: boolean;
  /** Nombre maximum de caractères — affiche un compteur */
  maxCharCount?: number;
  /** Hint affiché sous le textarea */
  hint?: ReactNode;
  /** Message d'erreur */
  errorMessage?: string;
  isError?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      autoResize = false,
      maxCharCount,
      hint,
      errorMessage,
      isError: isErrorProp,
      disabled,
      readOnly,
      onChange,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const isError = isErrorProp || Boolean(errorMessage);

    const handleRef = (el: HTMLTextAreaElement | null) => {
      internalRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
    };

    const resize = useCallback(() => {
      const el = internalRef.current;
      if (!el || !autoResize) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize]);

    useEffect(() => { resize(); }, [resize]);

    const charCount = (props.value as string | undefined)?.length ?? 0;

    const wrapperStyle: CSSProperties = {
      position: 'relative',
      width: '100%',
      borderRadius: 'var(--radius-md)',
      border: `1.5px solid ${isError ? 'var(--color-semantic-error-default)' : 'var(--color-border-primary)'}`,
      background: disabled ? 'var(--color-surface-tertiary)' : readOnly ? 'var(--color-surface-secondary)' : 'var(--color-surface-primary)',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out), box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out)',
    };

    const textareaStyle: CSSProperties = {
      display: 'block',
      width: '100%',
      padding: 'var(--spacing-3)',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--font-size-base)',
      lineHeight: 'var(--line-height-relaxed)',
      color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
      resize: autoResize ? 'none' : 'vertical',
      minHeight: 80,
      boxSizing: 'border-box',
      cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'text',
      ...style,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', width: '100%' }}>
        <style>{`
          .ds-textarea-wrapper:focus-within {
            border-color: ${isError ? 'var(--color-semantic-error-default)' : 'var(--color-border-focus)'} !important;
            box-shadow: 0 0 0 3px ${isError ? 'rgba(220,38,38,0.15)' : 'rgba(108,99,255,0.18)'};
          }
        `}</style>

        <div className={['ds-textarea-wrapper', className ?? ''].filter(Boolean).join(' ')} style={wrapperStyle}>
          <textarea
            ref={handleRef}
            disabled={disabled}
            readOnly={readOnly}
            style={textareaStyle}
            aria-invalid={isError || undefined}
            onChange={(e) => {
              onChange?.(e);
              resize();
            }}
            {...props}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isError && errorMessage ? (
            <span role="alert" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)' }}>
              {errorMessage}
            </span>
          ) : hint ? (
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{hint}</span>
          ) : (
            <span />
          )}

          {maxCharCount !== undefined && (
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                color: charCount > maxCharCount ? 'var(--color-semantic-error-default)' : 'var(--color-text-tertiary)',
              }}
            >
              {charCount}/{maxCharCount}
            </span>
          )}
        </div>
      </div>
    );
  },
);

// React import needed for MutableRefObject
import React from 'react';
Textarea.displayName = 'Textarea';
