import Button from '@/components/Button';
import cn from 'clsx';
import {
  FormHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: () => void;
}
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface BaseProps {
  children: ReactNode | undefined;
  className?: string;
}

export default function Form({ onSubmit, id, className, children }: FormProps) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        id={id}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}

function Label({ children, className }: LabelProps) {
  const labelClass = cn('mb-20 md:mb-40', className);

  return <label className={labelClass}> {children} </label>;
}

function LabelHeader({ children, className }: BaseProps) {
  const headerClass = cn(
    'mb-16 text-14 font-medium leading-24 text-blue-900 md:mb-20 md:text-16 md:leading-26 xl:text-20 xl:leading-32',
    className
  );

  return <h2 className={headerClass}>{children}</h2>;
}

function Input({ className, name = '', ...rest }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputClass = cn(
    'rounded-xl bg-blue-200 px-16 py-9 text-16 font-normal text-black-950 placeholder:text-blue-400 xl:py-16',
    className
  );

  return (
    <>
      <input {...register(name)} className={inputClass} {...rest} />
      {errors[name] && (
        <ErrorMessage>{String(errors[name].message)}</ErrorMessage>
      )}
    </>
  );
}

function ErrorMessage({ className, children }: BaseProps) {
  const errrorClass = cn(
    'ml-8 text-13 leading-22 text-error xl:text-16 xl:leading-26',
    className
  );

  return <span className={errrorClass}>{children}</span>;
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

Form.Label = Label;
Form.LabelHeader = LabelHeader;
Form.Input = Input;
Form.Submit = Submit;
