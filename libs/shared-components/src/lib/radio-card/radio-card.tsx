import React, { useId } from 'react';
import { cn } from '@multi-step-form/shared-utils';

import styles from './radio-card.module.scss';

interface RadioCardProps extends React.InputHTMLAttributes<HTMLInputElement> {
  cardClassName?: string;
  inputClassName?: string;
}

export const RadioCard = React.forwardRef<HTMLInputElement, RadioCardProps>(
  ({ children, className, cardClassName, inputClassName, ...props }, ref) => {
    const _id = useId();
    const id = props.id || _id;

    const classes = {
      label: cn(styles['radio-card'], className),
      card: cn(styles['radio-card__card'], cardClassName),
      input: cn(styles['radio-card__input'], inputClassName),
    };

    return (
      <label htmlFor={id} className={classes.label}>
        <input ref={ref} id={id} type="radio" className={classes.input} {...props} />
        <div className={classes.card}>
          {children}
        </div>
      </label>
    );
  }
);
