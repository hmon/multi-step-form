import React from 'react';
import { Stepper } from '@multi-step-form/shared-components';

interface StepLayoutProps {
  value: number;
  title: string;
  info: string;
  renderButtons?: React.ReactNode;
}

export const StepLayout = ({
  value,
  title,
  info,
  renderButtons,
  children,
}: React.PropsWithChildren<StepLayoutProps>) => {
  return (
    <Stepper.Panel value={value}>
      <div className="flex flex-col h-full">
        <h1 className="text-32 text-primary font-bold">{title}</h1>
        <p className="text-14 text-secondary font-light">{info}</p>
        <div className="my-28 flex flex-col gap-14">{children}</div>
        <div className="mt-auto flex flex-row justify-between">
          {renderButtons}
        </div>
      </div>
    </Stepper.Panel>
  );
};
