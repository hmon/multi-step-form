import { useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { useEventCallback } from '@multi-step-form/shared-hooks';
import { Stepper } from '@multi-step-form/shared-components';
import { StepTrigger } from './step-trigger';
import { PersonalInfo } from './steps/personal-info';
import { FormState } from './steps/interface';
import { SelectPlan } from './steps/select-plan';

import styles from './multi-step-form.module.scss';
import { AddOns } from './steps/add-ons';
import { Summary } from './steps/summary';

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const lastStep = useRef(1);
  const [state, setState] = useImmer<FormState>({
    name: '',
    email: '',
    phone: '',
    plan: null,
    period: 'monthly',
    addOns: {
      onlineService: false,
      largerStorage: false,
      customizableProfits: false,
    },
  });

  const onStepChange = useEventCallback((step: number) => {
    if (step <= lastStep.current) {
      setStep(step);
    }
  });

  const onNextStep = useEventCallback(() => {
    if (step < 4) {
      setStep(step + 1);
      lastStep.current = Math.max(step + 1, lastStep.current);
    }
  });

  const onPreviousStep = useEventCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  });

  return (
    <Stepper active={step} onChange={onStepChange}>
      <aside className={styles.aside}>
        <StepTrigger step={1} title="Your info" />
        <StepTrigger step={2} title="Select plan" />
        <StepTrigger step={3} title="Add-ons" />
        <StepTrigger step={4} title="Summary" />
      </aside>
      <section className="flex-grow pt-48 px-96 pb-32">
        <PersonalInfo
          step={1}
          state={state}
          onNextStep={onNextStep}
          updater={setState}
        />
        <SelectPlan
          step={2}
          state={state}
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
          updater={setState}
        />
        <AddOns
          step={3}
          state={state}
          updater={setState}
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
        />
        <Summary
          step={4}
          state={state}
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
        />
      </section>
    </Stepper>
  );
};
