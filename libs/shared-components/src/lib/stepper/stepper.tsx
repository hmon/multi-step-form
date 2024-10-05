import React from 'react';
import {
  createContext,
  useControllableState,
  useEventCallback,
} from '@multi-step-form/shared-hooks';
import { composeEventHandlers, cn } from '@multi-step-form/shared-utils';

import styles from './stepper.module.scss';

interface StepperContext {
  active: number;
  setActive: (step: number) => void;
}

const [StepperProvider, useStepperContext] =
  createContext<StepperContext>('Stepper');

interface StepperProps {
  active?: number;
  default?: number;
  onChange?: (step: number) => void;
}

const Stepper = ({
  children,
  ...props
}: React.PropsWithChildren<StepperProps>) => {
  const [active = 0, setActive] = useControllableState({
    prop: props.active,
    onChange: props.onChange,
    defaultProp: props.default,
  });

  return (
    <StepperProvider active={active} setActive={setActive}>
      {children}
    </StepperProvider>
  );
};

Stepper.displayName = 'Stepper';

interface StepProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'> {
  value: number;
  activeClassName?: string;
  children?: React.ReactNode | ((isActive: boolean) => React.ReactNode);
}

const Step = React.forwardRef<HTMLButtonElement, StepProps>(
  ({ value, children, className, activeClassName, onClick, ...props }, ref) => {
    const { active, setActive } = useStepperContext('Step');

    const isActive = active === value;

    const classes = cn(styles['step'], isActive && activeClassName, className);

    const onChange = useEventCallback(() => {
      setActive(value);
    });

    const composedOnClick = composeEventHandlers(onClick, onChange);

    return (
      <button
        ref={ref}
        className={classes}
        onClick={composedOnClick}
        {...props}
      >
        {children
          ? React.isValidElement(children)
            ? children
            : (children as (isActive: boolean) => React.ReactNode)(isActive)
          : value}
      </button>
    );
  }
);

Step.displayName = 'Step';

interface StepPanelProps {
  value: number;
}

const Panel = ({ value, children }: React.PropsWithChildren<StepPanelProps>) => {
  const { active } = useStepperContext('StepPanel');

  return active === value ? <>{children}</> : null;
};

Panel.displayName = 'Panel';

Stepper.Step = Step;
Stepper.Panel = Panel;

export { Stepper };
