import Close from '@/assets/icons/ic-close.svg';
import Form from '@/components/Form';
import { updateUserInfo } from '@/lib/api/user';
import useModalStore from '@/lib/store/useModalStore';
import { useUpdateStore } from '@/lib/store/useUpdateStore';
import Profile from '@/shared/Profile';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

interface Props {
  image: UrlType | null;
  nickname: Nickname;
}

export default function UserFormModalContent({ nickname, image }: Props) {
  const { setIsOld } = useUpdateStore();
  const { closeModal } = useModalStore();
  const methods = useForm<UpdateUserBody>({
    defaultValues: { nickname },
  });
  const [preview, setPreview] = useState<UrlType | null>(image);
  const { setError } = methods;
  const queryClient = useQueryClient();
  const mutation = useMutation(updateUserInfo, {
    onSuccess: data => {
      // 1. 유저 정보 저장
      const userData = JSON.stringify(data);
      sessionStorage.setItem('userData', userData);
      queryClient.invalidateQueries(['user']);
      setIsOld(true);
      closeModal();
    },
    onError: (error: any) => {
      if (error.response.status === 500) {
        setError('nickname', { message: '이미 존재하는 닉네임입니다.' });
      }
      console.error(error);
    },
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };
  const handleSubmit = async (data: UpdateUserBody) => {
    const { image, nickname } = data;

    const transformedData: UpdateUserBody = {
      nickname,
    };

    // if (typeof image === 'string') {
    //   transformedData.image = image;
    // }
    mutation.mutate(transformedData);
  };
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
      <Form
        methods={methods}
        onSubmit={(data: UpdateUserBody) => {
          handleSubmit(data);
        }}
      >
        <Form.Label className={'mb-24 flex justify-center'}>
          <Profile image={preview} />
          <Form.Input
            name='image'
            type='file'
            className='hidden'
            onChange={e => {
              handleFileChange(e);
            }}
          />
        </Form.Label>
        <div>
          <div className='mb-8'>
            <Form.Input name='nickname' placeholder='닉네임을 입력해주세요.' />
          </div>
          <Form.Submit>변경</Form.Submit>
        </div>
      </Form>
    </div>
  );
}
