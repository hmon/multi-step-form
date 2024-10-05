export interface StepProps {
  step: number;
}

export interface FormState {
  name: string;
  email: string;
  phone: string;
  plan: 'arcade' | 'advanced' | 'pro' | null;
  period: 'monthly' | 'yearly';
  addOns: {
    onlineService: boolean;
    largerStorage: boolean;
    customizableProfits: boolean;
  };
}

/**
 * Define the state for the PersonalInfo component
 * conforming to "interface segregation principle"
 */
export type PersonalInfoState = Pick<FormState, 'name' | 'email' | 'phone'>;

export type SelectPlanState = Pick<FormState, 'plan' | 'period'>;

export type AddOnsState = Pick<FormState, 'addOns'>;
