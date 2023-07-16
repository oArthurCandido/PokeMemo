import React from "react";

interface Props {
  children: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | `alert`
    | `success`
    | `warning`
    | `info`
    | `light`
    | `dark`
    | "danger"
    | "link"
    | `undefined`;
  onClick?: () => void;
  variant?: "outline" | "ghost" | "solid" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button = ({
  children,
  color,
  variant,
  size,
  disabled,
  type,
  className,
}: Props) => {
  return <button className={`${buttonColors}`}> {children}</button>;
};

const buttonColors = {
    primary: "bg-primary-500 text-white",
    secondary: "bg-secondary-500 text-white",
    alert: "bg-alert-500 text-white",
    success: "bg-success-500 text-white",
    warning: "bg-warning-500 text-white",
    info: "bg-info-500 text-white",
    light: "bg-light-500 text-white",
    dark: "bg-dark-500 text-white",
    danger: "bg-danger-500 text-white",
    link: "bg-transparent text-primary-500",
    undefined: "bg-primary-500 text-white",
  },
  buttonVariants = {
    outline: "border-2 border-solid",
    ghost: "border-2 border-solid",
    solid: "border-2 border-solid",
    link: "border-2 border-solid",
  },
  buttonSizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
    xl: "px-6 py-5 text-xl",
  },
  buttonTypes = {
    button: "button",
    submit: "submit",
    reset: "reset",
  };

const defaultProps = {
  color: buttonColors.primary,
  variant: buttonVariants.solid,
  size: buttonSizes.md,
  disabled: false,
  type: buttonTypes.button,
  className: "",
};

Button.defaultProps = defaultProps;

export default Button;
