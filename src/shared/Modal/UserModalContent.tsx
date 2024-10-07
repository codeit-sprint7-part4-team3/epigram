import Close from '@/assets/icons/ic-close.svg';
import useModalStore from '@/lib/store/useModalStore';
import Profile from '@/shared/Profile';

interface Props {
  writer: Writer;
}

export default function UserModalContent({ writer }: Props) {
  const { closeModal } = useModalStore();
  const { image, nickname, id } = writer;

  return (
    <div
      className={
        'flex w-328 flex-col items-center rounded-24 bg-background-100 px-24 pb-24 pt-16 text-center xl:w-360 xl:px-40 xl:pb-32 xl:pt-24'
      }
    >
      <button
        onClick={closeModal}
        className={'mb-8 self-end md:mb-24'}
        type={'button'}
      >
        <Close className={'h-20 w-20 text-blue-500'} />
      </button>
      <div className={'mb-24'}>
        <Profile image={image} />
      </div>
      <div>
        <span
          className={
            'text-base font-semibold leading-26 text-black-400 xl:text-xl xl:leading-32'
          }
        >
          {nickname}
        </span>
      </div>
    </div>
  );
}
