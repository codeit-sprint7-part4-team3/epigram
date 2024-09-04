import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'main' | 'wide' | 'default';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

export default function Button({
  children,
  className = '',
  type = 'button',
  form,
  onClick,
  disabled = false,
  variant = 'default',
}: ButtonProps) {
  return (
    <button
      className={className}
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

const styleByVariant: Record<ButtonVariant, string> = {
  main: '',
  wide: '',
  default: '',
};
