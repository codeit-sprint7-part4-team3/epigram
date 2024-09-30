import KebabMenu from '@/assets/icons/ic-kebab-menu.svg';
import Dropdown from '@/components/Dropdown';

interface DropdownMenuProps {
  options: DropdownOption[];
}

interface DropdownOption {
  label: string;
  method: () => void;
}

export default function DropdownMenu({ options }: DropdownMenuProps) {
  return (
    <Dropdown className={'mx-auto'}>
      <Dropdown.Trigger>
        <KebabMenu className={'h-24 w-24 text-blue-400 xl:h-36 xl:w-36'} />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {options?.map(option => (
          <Dropdown.Item
            key={option.label}
            onClick={option.method}
            className={
              'px-24 py-8 text-sm text-black-600 hover:bg-gray-100 xl:px-32 xl:py-12 xl:text-xl'
            }
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
