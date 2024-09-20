import ChevronDown from '@/assets/icons/ic-down-chevron.svg';
import Dropdown from '@/components/Dropdown';

type OptionValue = string | number;
type OptionLabel = string;

interface OptionProps {
  value?: OptionValue;
  label?: OptionLabel;
}

interface SelectProps {
  options: SelectOption[];
}

interface SelectOption {
  label: string;
  value: string;
}

export default function Select({ options }: SelectProps) {
  const handleClick = (value?: OptionValue) => {
    console.log(value);
  };
  return (
    <Dropdown isOpenDefault={true} className={'mx-auto'}>
      <Dropdown.Trigger className='flex-center gap-4 rounded-8 px-5 py-12 text-xs font-semibold text-gray-200 outline hover:outline-2 hover:outline-gray-300 focus:outline-2 focus:outline-black-600 xl:rounded-14 xl:px-14 xl:py-10 xl:text-xl'>
        {'필터: '}
        <ChevronDown className={'h-16 w-16 xl:h-36 xl:w-36'} />
      </Dropdown.Trigger>
      <Dropdown.Menu className='w-full rounded-8 xl:rounded-14'>
        {options?.map(option => (
          <Dropdown.Item
            key={option.label}
            label={option.label}
            value={option.value}
            onClick={handleClick}
            className={
              'flex-center w-max px-12 py-5 text-xs font-semibold text-gray-200 xl:px-14 xl:py-10 xl:text-xl'
            }
          >
            필터: {option.label}
            <ChevronDown className={'h-16 w-16 xl:h-36 xl:w-36'} />
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
