import React from 'react';
import { cva } from "class-variance-authority";

import styles from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "tertiary" | "transparent";
}

const buttonVariants = cva(styles["button"], {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      tertiary: "bg-secondary-accent text-white",
      transparent: ["bg-transparent text-secondary hover:text-primary", styles["button--transparent"]],
    },
    size: {
      sm: "text-8",
      md: "text-12",
      lg: "text-14",
      xl: "text-16",
    }
  }
})

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, size, variant, ...props }, ref) => {

    return (
      <button ref={ref} className={buttonVariants({ size, variant, className })} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
