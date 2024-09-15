import OpenEye from '@/assets/icons/ic-closed-eye.svg';
import ClosedEye from '@/assets/icons/ic-open-eye.svg';
import Button from '@/components/Button';
import type { ButtonSize } from '@/components/Button';
import Chip from '@/components/Chip';
import VALIDATION_RULES, {
  type Field,
  PASSWORD_CONFIRM_RULES,
} from '@/constants/formValidation';
import useToggle from '@/hooks/useToggle';
import cn from 'clsx';
import {
  FormHTMLAttributes,
  InputHTMLAttributes,
  KeyboardEventHandler,
  LabelHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (data: any) => void;
  methods: ReturnType<typeof useForm>;
}
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
export type InputVariant = 'fill' | 'outlined';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: Field;
  variant?: InputVariant;
}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: Field;
  variant?: InputVariant;
}
interface BaseProps {
  children: ReactNode | undefined;
  className?: string;
}

interface SubmitProps extends BaseProps {
  size?: ButtonSize;
}
export default function Form({
  onSubmit,
  id,
  className,
  children,
  methods,
}: FormProps) {
  const formClass = cn('w-full', className);

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

function Label({ children, className, ...rest }: LabelProps) {
  const labelClass = cn('block', className);

  return (
    <label className={labelClass} {...rest}>
      {children}
    </label>
  );
}

function LabelHeader({ children, className }: BaseProps) {
  const headerClass = cn(
    'text-14 font-medium leading-24 text-blue-900 md:text-16 md:leading-26 xl:text-20 xl:leading-32',
    className
  );

  return <h2 className={headerClass}>{children}</h2>;
}

const baseInputStyle =
  'w-full rounded-xl px-16 py-9 text-16 font-normal leading-26 text-black-950 placeholder:text-blue-400 xl:py-16 xl:text-20 xl:leading-32 disabled:cursor-not-allowed disabled:text-blue-400';
const inputStyleByVariant = {
  fill: ' bg-blue-200',
  outlined: 'bg-transparent border border-solid border-blue-300',
};
function Input({ className, name, variant = 'fill', ...rest }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputClass = twMerge(
    baseInputStyle,
    inputStyleByVariant[variant],
    cn({ 'border border-solid border-error': !!errors[name] }),
    className
  );
  const placeholder = rest.placeholder ?? name;

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

function PasswordInput({
  className,
  name,
  variant = 'fill',
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();
  const { isOpen: showPassword, toggle: togglePasswordVisibility } =
    useToggle(false);

  const inputClass = twMerge(
    baseInputStyle,
    inputStyleByVariant[variant],

    cn({ 'border border-solid border-error': !!errors[name] }),
    className
  );
  const EyeIcon = showPassword ? (
    <OpenEye className={eyeButtonStyle} />
  ) : (
    <ClosedEye className={eyeButtonStyle} />
  );
  const inputType = showPassword ? 'text' : 'password';
  const placeholder = rest.placeholder ?? name;

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

function TextArea({
  className,
  name,
  variant = 'fill',
  ...rest
}: TextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputClass = twMerge(
    'resize-none',
    baseInputStyle,
    inputStyleByVariant[variant],
    cn({ 'border border-solid border-error': !!errors[name] }),
    className
  );
  const placeholder = rest.placeholder ?? name;

  return (
    <>
      <textarea
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

function RadioInput({ className, name, ...rest }: InputProps) {
  const { register } = useFormContext();

  const inputClass = twMerge('hidden', className);

  return (
    <>
      <input
        {...register(name)}
        className={inputClass}
        {...rest}
        type='radio'
      />
      <span className='custom-radio'></span>
    </>
  );
}

function TagInput({ className, name, variant = 'fill', ...rest }: InputProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [tags, setTags] = useState<TagName[]>([]);

  const inputClass = twMerge(
    baseInputStyle,
    inputStyleByVariant[variant],
    cn({ 'border border-solid border-error': !!errors[name] }),
    className
  );

  const handleAddTag = (newTag: TagName) => {
    if (tags.includes(newTag)) {
      return;
    }
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    setValue(name, updatedTags);
  };

  const handleDeleteTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setValue(name, updatedTags);
  };

  const [inputValue, setInputValue] = useState<string>('');
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault;
      handleAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={() => (
        <>
          <input
            type='text'
            className={inputClass}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            {...rest}
          />
          <ul className='flex flex-wrap gap-8 xl:gap-16'>
            {tags.map((tag, index) => (
              <Chip key={tag}>
                {tag}
                <button
                  type='button'
                  onClick={() => {
                    handleDeleteTag(index);
                  }}
                >
                  &times;
                </button>
              </Chip>
            ))}
          </ul>
        </>
      )}
    />
  );
}

function Submit({ className, children, size = 'md' }: SubmitProps) {
  const { formState } = useFormContext();

  return (
    <Button
      type='submit'
      className={className}
      size={size}
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
Form.RadioInput = RadioInput;
Form.TagInput = TagInput;
Form.TextArea = TextArea;
Form.Submit = Submit;
