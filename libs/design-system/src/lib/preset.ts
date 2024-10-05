import { Config } from 'tailwindcss';
import {
  colors,
  spacing,
  fontSize,
  lineHeight,
  letterSpacing,
  fontWeight,
  borderRadius,
} from './tokens';

export const preset: Partial<Config> = {
  theme: {
    colors,
    spacing,
    fontSize,
    lineHeight,
    letterSpacing,
    fontWeight,
    borderRadius,
    extend: {},
  },
};

export default preset;
