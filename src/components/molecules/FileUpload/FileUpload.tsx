import {
  type CSSProperties,
  type DragEvent,
  useRef,
  useState,
} from 'react';
import { Icon } from '../../atoms/Icon';

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  progress?: number;
  error?: string;
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  files?: UploadFile[];
  onFilesChange?: (files: File[]) => void;
  onRemoveFile?: (id: string) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
};

export const FileUpload = ({
  accept,
  multiple = true,
  maxSize,
  files = [],
  onFilesChange,
  onRemoveFile,
  disabled = false,
  className,
  style,
}: FileUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const dropped = Array.from(e.dataTransfer.files);
    onFilesChange?.(dropped);
  };

  const handleChange = () => {
    const selected = Array.from(inputRef.current?.files ?? []);
    onFilesChange?.(selected);
    if (inputRef.current) inputRef.current.value = '';
  };

  const dropzoneStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-8)',
    borderRadius: 'var(--radius-lg)',
    border: `2px dashed ${dragging ? 'var(--color-primary-default)' : 'var(--color-border-secondary)'}`,
    background: dragging ? 'var(--color-primary-50)' : 'var(--color-surface-secondary)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out), background var(--motion-duration-fast) var(--motion-easing-ease-out)',
    userSelect: 'none',
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', ...style }}>
      <div
        style={dropzoneStyle}
        onDragOver={(e) => { e.preventDefault(); !disabled && setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Zone de dépôt de fichiers"
        onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={handleChange}
          disabled={disabled}
        />
        <Icon name="plus" size={32} color={dragging ? 'var(--color-primary-default)' : 'var(--color-text-tertiary)'} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' as unknown as number, color: dragging ? 'var(--color-primary-default)' : 'var(--color-text-primary)' }}>
            Glissez vos fichiers ici
          </p>
          <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
            ou <span style={{ color: 'var(--color-text-link)', textDecoration: 'underline' }}>parcourir</span>
            {maxSize && ` — max ${formatSize(maxSize)}`}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          {files.map((f) => (
            <li key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 'var(--spacing-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-primary)', background: 'var(--color-surface-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-2)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: f.error ? 'var(--color-semantic-error-default)' : 'var(--color-text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {f.name}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', flexShrink: 0 }}>
                  {formatSize(f.size)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveFile?.(f.id)}
                  aria-label={`Supprimer ${f.name}`}
                  style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--color-text-tertiary)', flexShrink: 0 }}
                >
                  <Icon name="close" size={16} />
                </button>
              </div>

              {f.error && (
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)' }}>
                  {f.error}
                </span>
              )}

              {f.progress !== undefined && !f.error && (
                <div style={{ position: 'relative', height: 4, borderRadius: 'var(--radius-full)', background: 'var(--color-neutral-200)', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, width: `${f.progress}%`, background: f.progress === 100 ? 'var(--color-semantic-success-default)' : 'var(--color-primary-default)', borderRadius: 'var(--radius-full)', transition: 'width var(--motion-duration-base) var(--motion-easing-ease-out)' }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
