import React, { useState } from 'react';
import { Updater } from 'use-immer';
import { cx } from 'class-variance-authority';
import { Button, RadioCard, Switch } from '@multi-step-form/shared-components';
import { useEventCallback } from '@multi-step-form/shared-hooks';
import { StepLayout } from '../step-layout';
import { SelectPlanState, StepProps } from './interface';
import ArcadeIcon from '../../../assets/images/icon-arcade.svg?react';
import AdvancedIcon from '../../../assets/images/icon-advanced.svg?react';
import ProIcon from '../../../assets/images/icon-pro.svg?react';

interface SelectPlanProps<T extends SelectPlanState> extends StepProps {
  state: SelectPlanState;
  updater: Updater<T>;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

export const SelectPlan = <T extends SelectPlanState>({
  step,
  onNextStep,
  onPreviousStep,
  state,
  updater,
}: SelectPlanProps<T>) => {
  const planSelected = state.plan !== null;
  const isYearly = state.period === 'yearly';
  const isMonthly = state.period === 'monthly';

  const onPlanSelect: React.ChangeEventHandler<HTMLInputElement> =
    useEventCallback((e) => {
      updater((draft) => {
        draft.plan = e.target.value as 'arcade' | 'advanced' | 'pro';
      });
    });

  const onPeriodSelect = useEventCallback((checked: boolean) => {
    updater((draft) => {
      draft.period = checked ? 'yearly' : 'monthly';
    });
  });

  const onNextStepClick = useEventCallback(() => {
    if (planSelected) onNextStep();
  });

  return (
    <StepLayout
      value={step}
      title="Select your plan"
      info="You have the option of monthly or yearly billing."
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
            onClick={onNextStepClick}
            disabled={!planSelected}
          >
            Next Step
          </Button>
        </>
      }
    >
      <div className="flex gap-16">
        <RadioCard
          className="w-full"
          name="plan"
          value="arcade"
          checked={state.plan === 'arcade'}
          onChange={onPlanSelect}
        >
          <ArcadeIcon />
          <h3 className="mt-32 text-primary">Arcade</h3>
          <span className="text-14 font-regular text-secondary">
            {isYearly ? '$90/yr' : '$9/mo'}
          </span>
          {isYearly && <span className="text-11 text-primary">2 months free</span>}
        </RadioCard>
        <RadioCard
          className="w-full"
          name="plan"
          value="advanced"
          checked={state.plan === 'advanced'}
          onChange={onPlanSelect}
        >
          <AdvancedIcon />
          <h3 className="mt-32 text-primary">Advanced</h3>
          <span className="text-14 font-regular text-secondary">
            {isYearly ? '$120/yr' : '$12/mo'}
          </span>
          {isYearly && <span className="text-11 text-primary">2 months free</span>}
        </RadioCard>
        <RadioCard
          className="w-full"
          name="plan"
          value="pro"
          checked={state.plan === 'pro'}
          onChange={onPlanSelect}
        >
          <ProIcon />
          <h3 className="mt-32 text-primary">Pro</h3>
          <span className="text-14 font-regular text-secondary">
            {isYearly ? '$150/yr' : '$15/mo'}
          </span>
          {isYearly && <span className="text-11 text-primary">2 months free</span>}
        </RadioCard>
      </div>

      <div className="flex justify-center items-center gap-14 rounded-xl mt-16 p-14 bg-primary bg-opacity-5">
        <span
          className={cx(
            'text-12',
            isMonthly ? 'text-primary' : 'text-secondary'
          )}
        >
          Monthly
        </span>
        <Switch checked={isYearly} onCheckedChange={onPeriodSelect} />
        <span
          className={cx(
            'text-12',
            isYearly ? 'text-primary' : 'text-secondary'
          )}
        >
          Yearly
        </span>
      </div>
    </StepLayout>
  );
};
