import React from 'react';
import { Button, TextField } from '@multi-step-form/shared-components';
import { StepLayout } from '../step-layout';
import { PersonalInfoState, StepProps } from './interface';
import { Updater } from 'use-immer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfoSchema } from './schema';

interface PersonalInfoProps<T extends PersonalInfoState> extends StepProps {
  state: PersonalInfoState;
  updater: Updater<T>;
  onNextStep: () => void;
}

export const PersonalInfo = <T extends PersonalInfoState>({
  step,
  onNextStep,
  state,
  updater,
}: PersonalInfoProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoState>({
    values: state,
    resolver: zodResolver(PersonalInfoSchema)
  });

  const onSubmit = handleSubmit((data) => {
    updater((draft) => {
      draft.name = data.name;
      draft.email = data.email;
      draft.phone = data.phone;
    });
    onNextStep();
  });

  return (
    <StepLayout
      value={step}
      title="Your info"
      info="Please provide your name, email address, and phone number."
      renderButtons={
        <Button size="xl" variant="primary" className="ml-auto" onClick={onSubmit}>
          Next Step
        </Button>
      }
    >
      <TextField
        label="Name"
        placeholder="e.g. Stephen King"
        error={errors.name?.message}
        {...register('name')}
      />
      <TextField
        label="Email Address"
        placeholder="e.g. stephenking@lorem.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <TextField
        label="Phone Number"
        placeholder="e.g. 123-456-7890"
        type="tel"
        pattern="[0-9]"
        error={errors.phone?.message}
        {...register('phone')}
      />
    </StepLayout>
  );
};
