import React from 'react';
import * as SwitchBase from '@radix-ui/react-switch';

import styles from './switch.module.scss';
import { cn } from '@multi-step-form/shared-utils';

type SwitchProps = SwitchBase.SwitchProps;

export const Switch = ({ className, ...props }: SwitchProps) => {
  return (
    <SwitchBase.Root
      className={cn(styles['switch'], className)}
      {...props}
    >
      <SwitchBase.Thumb className={styles['switch__thumb']} />
    </SwitchBase.Root>
  );
};
