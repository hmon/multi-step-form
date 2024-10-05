import React from 'react';
import { Button } from '@multi-step-form/shared-components';
import { StepLayout } from '../step-layout';
import { FormState, StepProps } from './interface';

interface SelectPlanProps extends StepProps {
  state: FormState;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

export const Summary = ({
  step,
  onNextStep,
  onPreviousStep,
  state,
}: SelectPlanProps) => {
  const plan = state.plan![0].toUpperCase() + state.plan!.slice(1);
  const period = state.period[0].toUpperCase() + state.period.slice(1);

  return (
    <StepLayout
      value={step}
      title="Finishing up"
      info="Double check your information before submitting."
      renderButtons={
        <>
          <Button
            size="xl"
            variant="transparent"
            className="mr-auto"
            onClick={onPreviousStep}
          >
            Go Back
          </Button>
          <Button
            size="xl"
            variant="tertiary"
            className="ml-auto"
            onClick={onNextStep}
          >
            Confirm
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-16">
        <div className="px-16 py-12 bg-primary bg-opacity-5 rounded-md">
          <span className="text-primary text-14 font-bold">{plan} ({period})</span>
          <hr className="text-secondary my-16" />
          <div className="flex flex-col gap-8">
            {state.addOns.onlineService && (
              <span className="text-secondary text-12">Online Service</span>
            )}
            {state.addOns.largerStorage && (
              <span className="text-secondary text-12">Larger Storage</span>
            )}
            {state.addOns.customizableProfits && (
              <span className="text-secondary text-12">Customizable Profits</span>
            )}
          </div>
        </div>
      </div>
    </StepLayout>
  );
};
