import { type CSSProperties, type ReactNode, useState, useCallback } from 'react';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox';

export interface FormFieldDef {
  id: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  options?: { value: string; label: string }[];
  validate?: (value: string | boolean) => string | undefined;
  defaultValue?: string | boolean;
}

export interface FormSection {
  id: string;
  title?: string;
  description?: string;
  fields: FormFieldDef[];
}

export interface FormProps {
  sections: FormSection[];
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: (values: Record<string, string | boolean>) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const Form = ({
  sections,
  submitLabel = 'Enregistrer',
  cancelLabel,
  onSubmit,
  onCancel,
  className,
  style,
}: FormProps) => {
  const allFields = sections.flatMap((s) => s.fields);

  const initValues = () =>
    Object.fromEntries(
      allFields.map((f) => [f.id, f.defaultValue ?? (f.type === 'checkbox' ? false : '')]),
    ) as Record<string, string | boolean>;

  const [values, setValues] = useState<Record<string, string | boolean>>(initValues);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getError = useCallback(
    (field: FormFieldDef): string | undefined => {
      const val = values[field.id];
      if (field.required && (val === '' || val === false)) return `${field.label} est obligatoire.`;
      if (field.validate) return field.validate(val);
      if (field.type === 'email' && typeof val === 'string' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
        return 'Adresse e-mail invalide.';
      return undefined;
    },
    [values],
  );

  const allErrors = allFields.reduce<Record<string, string | undefined>>((acc, f) => {
    acc[f.id] = getError(f);
    return acc;
  }, {});

  const hasErrors = Object.values(allErrors).some(Boolean);

  const handleBlur = (id: string) => setTouched((prev) => new Set(prev).add(id));

  const handleChange = (id: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(new Set(allFields.map((f) => f.id)));
    setSubmitted(true);
    if (hasErrors) return;
    setSubmitting(true);
    try {
      await onSubmit?.(values);
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase: CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1.5px solid var(--color-border-primary)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'var(--font-body)',
    color: 'var(--color-text-primary)',
    background: 'var(--color-surface-primary)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out)',
  };

  const renderField = (field: FormFieldDef) => {
    const err = (touched.has(field.id) || submitted) ? allErrors[field.id] : undefined;
    const val = values[field.id];
    const borderColor = err ? 'var(--color-semantic-error-default)' : 'var(--color-border-primary)';

    const fieldStyle: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' };

    const labelEl = (
      <label
        htmlFor={field.id}
        style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}
      >
        {field.label}
        {field.required && <span style={{ color: 'var(--color-semantic-error-default)', marginLeft: 2 }}>*</span>}
      </label>
    );

    if (field.type === 'checkbox') {
      return (
        <div key={field.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
          <input
            id={field.id}
            type="checkbox"
            checked={!!val}
            onChange={(e) => handleChange(field.id, e.target.checked)}
            onBlur={() => handleBlur(field.id)}
            style={{ marginTop: 3, width: 16, height: 16, accentColor: 'var(--color-primary-default)' }}
          />
          <div>
            {labelEl}
            {field.hint && <p style={{ margin: '2px 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{field.hint}</p>}
            {err && <p style={{ margin: '4px 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)', display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="warning" size={16} color="var(--color-semantic-error-default)" />{err}</p>}
          </div>
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.id} style={fieldStyle}>
          {labelEl}
          <textarea
            id={field.id}
            value={typeof val === 'string' ? val : ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            onBlur={() => handleBlur(field.id)}
            placeholder={field.placeholder}
            rows={4}
            style={{ ...inputBase, borderColor, resize: 'vertical' }}
          />
          {field.hint && <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{field.hint}</p>}
          {err && <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)', display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="warning" size={16} color="var(--color-semantic-error-default)" />{err}</p>}
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <div key={field.id} style={fieldStyle}>
          {labelEl}
          <select
            id={field.id}
            value={typeof val === 'string' ? val : ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            onBlur={() => handleBlur(field.id)}
            style={{ ...inputBase, borderColor }}
          >
            <option value="">{field.placeholder ?? 'Choisir…'}</option>
            {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {field.hint && <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{field.hint}</p>}
          {err && <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)', display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="warning" size={16} color="var(--color-semantic-error-default)" />{err}</p>}
        </div>
      );
    }

    return (
      <div key={field.id} style={fieldStyle}>
        {labelEl}
        <input
          id={field.id}
          type={field.type ?? 'text'}
          value={typeof val === 'string' ? val : ''}
          onChange={(e) => handleChange(field.id, e.target.value)}
          onBlur={() => handleBlur(field.id)}
          placeholder={field.placeholder}
          style={{ ...inputBase, borderColor }}
        />
        {field.hint && <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{field.hint}</p>}
        {err && <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)', display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="warning" size={16} color="var(--color-semantic-error-default)" />{err}</p>}
      </div>
    );
  };

  const errorFields = submitted ? allFields.filter((f) => allErrors[f.id]) : [];

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
      noValidate
      style={{ fontFamily: 'var(--font-body)', ...style }}
    >
      {/* Error summary */}
      {errorFields.length > 0 && (
        <div style={{ marginBottom: 'var(--spacing-6)', padding: 'var(--spacing-4)', background: 'var(--color-semantic-error-50, #fff1f1)', border: '1.5px solid var(--color-semantic-error-default)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ margin: '0 0 var(--spacing-2)', fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--color-semantic-error-default)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <Icon name="warning" size={16} color="var(--color-semantic-error-default)" />
            {errorFields.length} erreur{errorFields.length > 1 ? 's' : ''} à corriger
          </p>
          <ul style={{ margin: 0, paddingLeft: 'var(--spacing-5)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
            {errorFields.map((f) => (
              <li key={f.id} style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)' }}>
                <a href={`#${f.id}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{f.label}</a> — {allErrors[f.id]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sections */}
      {sections.map((section, si) => (
        <section key={section.id} style={{ marginBottom: si < sections.length - 1 ? 'var(--spacing-8)' : 0 }}>
          {(section.title || section.description) && (
            <div style={{ marginBottom: 'var(--spacing-6)', paddingBottom: 'var(--spacing-4)', borderBottom: '1px solid var(--color-border-primary)' }}>
              {section.title && <h3 style={{ margin: '0 0 var(--spacing-1)', fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{section.title}</h3>}
              {section.description && <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{section.description}</p>}
            </div>
          )}
          <div style={{ display: 'grid', gap: 'var(--spacing-5)' }}>
            {section.fields.map(renderField) as ReactNode[]}
          </div>
        </section>
      ))}

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-8)', paddingTop: 'var(--spacing-6)', borderTop: '1px solid var(--color-border-primary)' }}>
        {cancelLabel && onCancel && <Button type="button" variant="ghost" onClick={onCancel}>{cancelLabel}</Button>}
        <Button type="submit" variant="primary" loading={submitting} disabled={submitting}>{submitLabel}</Button>
      </div>
    </form>
  );
};
