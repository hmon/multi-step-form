import React from 'react';
import { Updater } from 'use-immer';
import { Button, CheckboxCard } from '@multi-step-form/shared-components';
import { useEventCallback } from '@multi-step-form/shared-hooks';
import { StepLayout } from '../step-layout';
import { AddOnsState, StepProps } from './interface';

interface SelectPlanProps<T extends AddOnsState> extends StepProps {
  state: AddOnsState;
  updater: Updater<T>;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

export const AddOns = <T extends AddOnsState>({
  step,
  onNextStep,
  onPreviousStep,
  state,
  updater,
}: SelectPlanProps<T>) => {
  const onAddOnChange: React.ChangeEventHandler<HTMLInputElement> =
    useEventCallback((e) => {
      const { name, checked } = e.target;
      updater((draft) => {
        draft.addOns[name as keyof AddOnsState['addOns']] = checked;
      });
    });

  return (
    <StepLayout
      value={step}
      title="Pick add-ons"
      info="Add-ons help enhance your gaming experience."
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
            variant="primary"
            className="ml-auto"
            onClick={onNextStep}
          >
            Next Step
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-16">
        <CheckboxCard
          name="onlineService"
          checked={state.addOns.onlineService}
          onChange={onAddOnChange}
        >
          <div className="flex flex-col">
            <span className="text-primary text-14">Online Services</span>
            <span className="text-gray text-secondary font-light text-11">
              Access to multiplayer games
            </span>
          </div>
        </CheckboxCard>
        <CheckboxCard
          name="largerStorage"
          checked={state.addOns.largerStorage}
          onChange={onAddOnChange}
        >
          <div className="flex flex-col">
            <span className="text-primary text-14">Larger Storage</span>
            <span className="text-gray text-secondary font-light text-11">
              1TB of storage
            </span>
          </div>
        </CheckboxCard>
        <CheckboxCard
          name="customizableProfits"
          checked={state.addOns.customizableProfits}
          onChange={onAddOnChange}
        >
          <div className="flex flex-col">
            <span className="text-primary text-14">Customizable Profits</span>
            <span className="text-gray text-secondary font-light text-11">
              Custom theme on your profile
            </span>
          </div>
        </CheckboxCard>
      </div>
    </StepLayout>
  );
};
