import React, { useId } from 'react';
import styles from './text-field.module.scss';
import { cn } from '@multi-step-form/shared-utils';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fieldClassName?: string;
  labelClassName?: string;
  error?: string;
}

export const TextField = React.forwardRef<
  React.ElementRef<'input'>,
  TextFieldProps
>(({ label, error, className, fieldClassName, labelClassName, children, ...props }, ref) => {
  const id = useId();
  const hasError = Boolean(error);
  const classNames = {
    field: cn(
      styles['text-field'],
      hasError && styles['text-field--error'],
      fieldClassName
    ),
    label: cn(styles['text-field__label'], labelClassName),
    input: cn(styles['text-field__input'], className),
  };

  return (
    <div className={classNames.field}>
      {label && <label htmlFor={id} className={classNames.label}>
        {label}
        {hasError && <span className={styles['text-field__error']}>{error}</span>}
      </label>}

      <input
        id={id}
        ref={ref}
        spellCheck={false}
        className={classNames.input}
        {...props}
      />
      {children}
    </div>
  );
});

TextField.displayName = 'TextField';
