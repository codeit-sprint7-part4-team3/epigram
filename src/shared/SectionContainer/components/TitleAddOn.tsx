import IconLeftChevron from '@/assets/icons/ic-left-chevron.svg';
import IconRightChevron from '@/assets/icons/ic-right-chevron.svg';

export default function TitleAddOn({
  type,
  filterEvent,
  buttonSetLeftEvent,
  buttonSetRightEvent,
  deleteAllEvent,
}: TitleAddOnProps) {
  if (type === 'date') {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const today = `${year}-${month}-${day}`;

    return <p>{today}</p>;
  }

  if (type === 'filterAndButtonSet') {
    //드롭다운 필요
    return (
      <div className='flex justify-between items-center gap-16 xl:gap-24'>
        <div>드롭다운</div>
        <div className={`flex gap-10`}>
          <IconLeftChevron
            className='w-20 h-20 xl:w-36 xl:h-36 cursor-pointer'
            onClick={buttonSetLeftEvent}
          />
          <IconRightChevron
            className='w-20 h-20 xl:w-36 xl:h-36 cursor-pointer'
            onClick={buttonSetRightEvent}
          />
        </div>
      </div>
    );
  }

  if (type === 'deleteAll') {
    return (
      <button
        className='font-primary text-12 leading-20 md:text-14 md:leading-24 xl:text-16 xl:leading-26 text-error'
        onClick={deleteAllEvent}
      >
        모두 지우기
      </button>
    );
  }

  return <div></div>;
}
