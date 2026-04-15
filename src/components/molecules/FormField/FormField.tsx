import { type CSSProperties, type ReactNode, useId } from 'react';
import { Label } from '../../atoms/Label';
import { Input, type InputProps } from '../../atoms/Input';

export interface FormFieldProps extends Omit<InputProps, 'hint'> {
  label?: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const FormField = ({
  label,
  required = false,
  id,
  hint,
  className,
  style,
  ...inputProps
}: FormFieldProps) => {
  const autoId = useId();
  const fieldId = id ?? autoId;

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', ...style }}
    >
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      <Input id={fieldId} hint={hint} {...inputProps} />
    </div>
  );
};
