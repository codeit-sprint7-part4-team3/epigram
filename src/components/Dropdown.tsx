import useToggle from '@/hooks/useToggle';
import cn from 'clsx';
import React, {
  Children,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  children: ReactNode;
  className?: string;
}

interface DropdownProps extends Props {
  isOpenDefault?: boolean;
}
interface TriggerProps extends Props {
  onClick?: () => void;
}
interface MenuProps extends Props {}
interface DropdownMenuItem extends Props {
  onClick: () => void;
}
interface SelectItem extends Props, OptionProps {
  onClick: (value: OptionValue) => void;
}
type ItemProps = DropdownMenuItem | SelectItem;

interface DropdownContextProps {
  isOpen: boolean;
  toggle: () => void;
  toggleClose: () => void;
  selectedOption: OptionProps | null;
  selectOption: (option: OptionProps) => void;
}

type OptionValue = string | number;
type OptionLabel = string;

interface OptionProps {
  value: OptionValue;
  label: OptionLabel;
}

const DropdownContext = createContext<DropdownContextProps>({
  isOpen: false,
  toggle: () => {},
  toggleClose: () => {},
  selectedOption: null,
  selectOption: (option: OptionProps) => {},
});

function Dropdown({
  children,
  className,
  isOpenDefault = false,
}: DropdownProps) {
  const { isOpen, toggle, close: toggleClose } = useToggle(isOpenDefault);
  const [selectedOption, selectOption] = useState<OptionProps | null>(null);

  const containerStyle = twMerge('relative w-min', className);

  return (
    <DropdownContext.Provider
      value={{ isOpen, toggle, toggleClose, selectedOption, selectOption }}
    >
      <div className={containerStyle}>{children}</div>
    </DropdownContext.Provider>
  );
}

const Trigger = ({ children, className }: TriggerProps) => {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error('Dropdown 없이 하위 컴포넌트를 사용할 수는 없습니다.');

  const [firstChild, secondChild] = Children.toArray(children);
  const { toggle, toggleClose, selectedOption } = context;
  const triggerStyle = twMerge('w-max', className);

  return (
    <button
      type='button'
      className={triggerStyle}
      onClick={toggle}
      onBlur={toggleClose}
    >
      {firstChild}
      {selectedOption && selectedOption.label}
      {secondChild}
    </button>
  );
};

const Menu = ({ children, className }: MenuProps) => {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error('Dropdown 없이 하위 컴포넌트를 사용할 수는 없습니다.');

  const { isOpen } = context;
  const menuStyle = twMerge(
    'absolute right-0 z-10 mt-8 flex w-max flex-col overflow-hidden rounded-16 border border-solid border-blue-300 bg-background-100',
    className
  );

  return isOpen ? <ul className={menuStyle}>{children}</ul> : null;
};

const Item = ({ children, className, onClick, value, label }: ItemProps) => {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error('Dropdown 없이 하위 컴포넌트를 사용할 수는 없습니다.');

  const { toggle, selectOption } = context;
  const itemStyle = twMerge('flex-center', className);

  const handleMouseDown = () => {
    value ? onClick(value) : onClick();
    toggle();
    selectOption({ value, label });
  };
  return (
    <li>
      <button className={itemStyle} type='button' onMouseDown={handleMouseDown}>
        {children}
      </button>
    </li>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
