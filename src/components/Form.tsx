import OpenEye from '@/assets/icons/ic-closed-eye.svg';
import ClosedEye from '@/assets/icons/ic-open-eye.svg';
import Button from '@/components/Button';
import VALIDATION_RULES, {
  type Field,
  PASSWORD_CONFIRM_RULES,
} from '@/constants/formValidation';
import cn from 'clsx';
import {
  FormHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: () => void;
}
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: Field;
}
interface BaseProps {
  children: ReactNode | undefined;
  className?: string;
}

export default function Form({ onSubmit, id, className, children }: FormProps) {
  const methods = useForm();

  const formClass = cn('', className);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        id={id}
        className={formClass}
      >
        {children}
      </form>
    </FormProvider>
  );
}

function Label({ children, className }: LabelProps) {
  const labelClass = cn('block', className);

  return <label className={labelClass}> {children} </label>;
}

function LabelHeader({ children, className }: BaseProps) {
  const headerClass = cn(
    'mb-16 text-14 font-medium leading-24 text-blue-900 md:mb-20 md:text-16 md:leading-26 xl:text-20 xl:leading-32',
    className
  );

  return <h2 className={headerClass}>{children}</h2>;
}

const baseInputStyle =
  'w-full rounded-xl bg-blue-200 px-16 py-9 text-16 font-normal leading-26 text-black-950 placeholder:text-blue-400 xl:py-16 xl:text-20 xl:leading-32';

function Input({ className, name, ...rest }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputClass = cn(
    baseInputStyle,
    { 'outline outline-1 outline-error': !!errors[name] },
    className
  );
  const placeholder = rest.placeholder ? rest.placeholder : name;

  return (
    <>
      <input
        {...register(name, VALIDATION_RULES[name])}
        className={inputClass}
        {...rest}
        placeholder={placeholder}
      />
      {errors[name] && (
        <ErrorMessage className=''>{String(errors[name].message)}</ErrorMessage>
      )}
    </>
  );
}

const eyeButtonStyle = 'h-24 w-24 text-gray-200';

function PasswordInput({ className, name, ...rest }: InputProps) {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const inputClass = cn(
    baseInputStyle,
    { 'outline outline-1 outline-error': !!errors[name] },
    className
  );
  const EyeIcon = showPassword ? (
    <OpenEye className={eyeButtonStyle} />
  ) : (
    <ClosedEye className={eyeButtonStyle} />
  );
  const inputType = showPassword ? 'text' : 'password';
  const placeholder = rest.placeholder ? rest.placeholder : name;

  const registerOptions =
    name === 'passwordConfirmation'
      ? PASSWORD_CONFIRM_RULES(getValues('password'))
      : VALIDATION_RULES[name];

  return (
    <>
      <div className='relative'>
        <input
          {...register(name, registerOptions)}
          className={inputClass}
          {...rest}
          type={inputType}
          placeholder={placeholder}
        />
        <button
          className='absolute bottom-10 right-16 xl:bottom-20'
          onClick={togglePasswordVisibility}
        >
          {EyeIcon}
        </button>
      </div>
      {errors[name] && (
        <ErrorMessage>{String(errors[name].message)}</ErrorMessage>
      )}
    </>
  );
}

function Submit({ className, children }: BaseProps) {
  const { formState } = useFormContext();

  return (
    <Button
      type='submit'
      className={className}
      variant='wide'
      disabled={!formState.isValid}
    >
      {children}
    </Button>
  );
}
function ErrorMessage({ className, children }: BaseProps) {
  const errrorClass = cn(
    'ml-8 text-13 leading-22 text-error xl:text-16 xl:leading-26',
    className
  );

  return <span className={errrorClass}>{children}</span>;
}

Form.Label = Label;
Form.LabelHeader = LabelHeader;
Form.Input = Input;
Form.PasswordInput = PasswordInput;
Form.Submit = Submit;
