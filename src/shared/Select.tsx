import ChevronDown from '@/assets/icons/ic-down-chevron.svg';
import Dropdown, { OptionLabel, OptionValue } from '@/components/Dropdown';

interface SelectOption {
  label: OptionLabel;
  value: OptionValue;
}

interface SelectProps {
  options: SelectOption[];
}

export default function Select({ options }: SelectProps) {
  const handleClick = (value?: OptionValue) => {
    console.log(value);
  };
  const [firstOption, ...restOptions] = options;
  return (
    <Dropdown isOpenDefault={true} className={'mx-auto'}>
      <Dropdown.Trigger className='flex-center h-30 w-88 gap-4 rounded-8 text-xs font-semibold text-gray-200 outline hover:outline-2 hover:outline-gray-300 focus:outline-2 focus:outline-black-600 xl:h-52 xl:w-144 xl:rounded-14 xl:text-xl'>
        {'필터: '}
        <ChevronDown className={'h-16 w-16 xl:h-36 xl:w-36'} />
      </Dropdown.Trigger>
      <Dropdown.Menu className='w-full rounded-8 xl:rounded-14'>
        <Dropdown.Item
          selected
          key={firstOption.label}
          label={firstOption.label}
          value={firstOption.value}
          onClick={handleClick}
          className={
            'flex-center w-max px-12 py-5 text-xs font-semibold text-gray-200 xl:px-14 xl:py-10 xl:text-xl'
          }
        >
          필터: {firstOption.label}
          <ChevronDown className={'h-16 w-16 xl:h-36 xl:w-36'} />
        </Dropdown.Item>
        {restOptions?.map(option => (
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
