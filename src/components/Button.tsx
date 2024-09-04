import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  className = '',
  type = 'button',
  form,
  onClick,
  disabled = false,
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
