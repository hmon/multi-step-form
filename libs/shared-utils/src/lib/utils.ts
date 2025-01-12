import { cx, type CxOptions } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export function noop() {
  return
}

export function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}
