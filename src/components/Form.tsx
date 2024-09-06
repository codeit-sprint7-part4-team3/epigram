import { FormHTMLAttributes } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export default function Form({ children, onSubmit }) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

function Label({ children, className }) {
  return <label> {children} </label>;
}

function Input() {
  return <input />;
}

function ErrorMessage() {
  return <span>{children}</span>;
}

Form.Label = Label;
Form.Input = Input;
Form.ErrorMessage = ErrorMessage;
