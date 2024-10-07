import Alert from '@/assets/icons/ic-alert.svg';
import Button from '@/components/Button';
import useModalStore from '@/lib/store/useModalStore';

interface Props {
  deleteTargetLabel: string;
  onDelete: () => void;
}

export default function DeleteAlertContent({
  deleteTargetLabel,
  onDelete,
}: Props) {
  const { closeModal } = useModalStore();
  const labelHeader = `${deleteTargetLabel}을 삭제하시겠어요?`;
  const labelContent = `${deleteTargetLabel}은 삭제 후 복구할 수 없어요.`;
  const retreatLabel = '취소';
  const deleteLabel = '삭제';
  return (
    <div
      className={
        'flex flex-col items-center justify-center rounded-24 bg-white px-16 py-24 text-center md:px-38 md:py-32 xl:py-40'
      }
    >
      <div className={'mb-16 md:mb-24'}>
        <Alert className={'h-44 w-44 xl:h-56 xl:w-56'} />
      </div>
      <div className={'mb-24 md:mb-36 xl:mb-40'}>
        <div className={'mb-8 xl:mb-16'}>
          <span
            className={
              'text-base font-semibold leading-26 text-black-700 md:text-xl md:leading-32 xl:text-2xl'
            }
          >
            {labelHeader}
          </span>
        </div>
        <div>
          <span
            className={
              'text-sm font-normal leading-24 text-gray-400 md:text-base md:leading-26 xl:text-lg xl:leading-26'
            }
          >
            {labelContent}
          </span>
        </div>
      </div>
      <div className={'flex gap-8 xl:gap-16'}>
        <Button
          className={'h-48 w-140 md:w-144 xl:h-58 xl:w-180'}
          variant={'wide'}
          color={'lightBlue'}
          onClick={closeModal}
        >
          {retreatLabel}
        </Button>
        <Button
          className={'h-48 w-140 md:w-144 xl:h-58 xl:w-180'}
          variant={'wide'}
          onClick={onDelete}
        >
          {deleteLabel}
        </Button>
      </div>
    </div>
  );
}
