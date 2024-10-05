import { Stepper } from '@multi-step-form/shared-components';
import { cx } from 'class-variance-authority';

interface StepTriggerProps {
  step: number;
  title: string;
}

export const StepTrigger = ({ step, title }: StepTriggerProps) => {
  const activeClasses = 'bg-accent text-black';
  const inactiveClasses = 'border border-white text-white';

  return (
    <Stepper.Step value={step} className="w-full">
      {(isActive) => (
        <div className="flex flex-row items-center gap-14">
          <div
            className={cx(
              'flex items-center justify-center text-16 w-36 h-36 rounded-max',
              isActive ? activeClasses : inactiveClasses
            )}
          >
            {step}
          </div>
          <div className="flex flex-col items-start text-white">
            <span className="text-11 font-light text-secondary">
              STEP {step}
            </span>
            <span className="text-14 font-bold tracking-wide">
              {title.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </Stepper.Step>
  );
};
