import CreateEpigramForm from '@/pages/addepigram/components/CreateEpigramForm';

export default function AddEpigramPage() {
  return (
    <section className='mx-auto mb-30 mt-24 w-312 md:mt-32 md:w-384 xl:mt-56 xl:w-640'>
      <h2 className='mb-24 text-base font-semibold leading-26 text-black-700 md:mb-32 md:text-xl md:leading-32 xl:mb-40 xl:text-2xl'>
        에피그램 만들기
      </h2>
      <CreateEpigramForm />
    </section>
  );
}
