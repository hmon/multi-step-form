import { z, ZodType } from 'zod';
import { PersonalInfoState } from './interface';
import en from '../../../lang/en';

export const PersonalInfoSchema: ZodType<PersonalInfoState> = z.object({
  name: z.string().min(1, en.inputErrorMessage),
  email: z.string().min(1, en.inputErrorMessage).email(en.invalidEmail),
  phone: z
    .string()
    .min(1, en.inputErrorMessage)
    .regex(/[0-9]/, en.invalidPhone),
});
