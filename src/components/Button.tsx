import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'main' | 'wide' | 'round';
type ButtonSize = 'sm' | 'md';
type ButtonColor = 'primary' | 'white' | 'blue';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
}

export default function Button({
  children,
  className = '',
  type = 'button',
  form,
  onClick,
  disabled = false,
  variant = 'main',
  size = 'md',
  color = 'primary',
}: ButtonProps) {
  const buttonStyle = clsx(
    'flex-center',
    styleByVariant[variant],
    styleByColor[color],
    size === 'sm' && smButtonStyle,
    className
  );
  return (
    <button
      className={buttonStyle}
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

const baseStyle = 'rounded-xl font-semibold';

const styleByVariant: Record<ButtonVariant, string> = {
  main: clsx(
    baseStyle,
    'w-112 h-48 md:w-136 md:h-56 xl:w-286 xl:h-64 text-16 leading-26 md:text-20 md:leading-32'
  ),
  wide: clsx(
    baseStyle,
    'w-full h-44 xl:h-64 text-16 leading-26 xl:text-20 xl:leading-32'
  ),
  round:
    'h-48 xl:h-56 px-18 xl:px-40 text-14 font-medium leading-24 xl:text-20 xl:leading-32',
};

const styleByColor: Record<ButtonColor, string> = {
  primary:
    'bg-black-500 text-blue-100 hover:bg-black-600 active:bg-black-700 disabled:bg-blue-300 disabled:outline disabled:outline-blue-100',
  white: 'bg-background-100 border border-line-200 text-blue-500',
  blue: 'bg-blue-900 text-blue-100',
};

const smButtonStyle =
  'w-auto px-16 h-32 md:h-44 text-12 leading-20 md:text-16 md:leading-26';
