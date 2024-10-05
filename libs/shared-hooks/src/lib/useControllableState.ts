import React from "react";
import { noop } from '@multi-step-form/shared-utils';

type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

function useControllableState<T>({
  prop,
  defaultProp,
  onChange = noop,
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
    React.useCallback(
      (nextValue) => {
        if (isControlled) {
          const setter = nextValue as SetStateFn<T>;
          const computedValue =
            typeof nextValue === "function" ? setter(prop) : nextValue;
          if (computedValue !== prop) onChange(computedValue as T);
        } else {
          setUncontrolledProp(nextValue);
        }
      },
      [isControlled, prop, setUncontrolledProp, onChange],
    );

  return [value, setValue] as const;
}

function useUncontrolledState<T>({
  defaultProp,
  onChange = noop,
}: Omit<UseControllableStateParams<T>, "prop">) {
  const uncontrolledState = React.useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, onChange]);

  return uncontrolledState;
}

export { useControllableState };
