import { GetDetailEpigram } from '@/api/epigram/fetchEpigram';
import EditEpigramForm from '@/pages/epigrams/[id]/editepigram/components/EditEpigramForm';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditEpigramPage() {
  const router = useRouter();
  const { id } = router.query;

  const [epigramData, setEpigramData] = useState<EpigramDetailType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const epigramId = Number(id);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const epigram = await GetDetailEpigram(Number(id));
          setEpigramData(epigram);
        } catch (err) {
          setError('에피그램 데이터를 불러오는 데 실패했습니다.');
          console.error('Error fetching epigram data:', err);
        }
      }
    };

    fetchData();
  }, [id]);

  if (router.isFallback || !epigramData) {
    return <div>Loading...</div>;
  }

  const DEFAULT_EPIGRAM_BODY: EpigramBaseBody = {
    content: '룰루랄라',
    author: '랄랄랄라',
    tags: ['란', '랄', '루'],
    referenceTitle: '',
    referenceUrl: '',
  };

  const { content, author, tags, referenceTitle, referenceUrl } = epigramData;
  const newTags = tags.map(tag => tag.name);
  const newReferenceTitle = referenceTitle ?? '';
  const newReferenceUrl = referenceUrl ?? '';
  const epigramBody: EpigramBaseBody = {
    content,
    author,
    tags: newTags,
    referenceTitle: newReferenceTitle,
    referenceUrl: newReferenceUrl,
  };

  return (
    <section className='mx-auto mb-30 mt-24 w-312 md:mt-32 md:w-384 xl:mt-56 xl:w-640'>
      <h2 className='mb-24 text-base font-semibold leading-26 text-black-700 md:mb-32 md:text-xl md:leading-32 xl:mb-40 xl:text-2xl'>
        에피그램 수정
      </h2>
      <EditEpigramForm epigramBody={epigramBody} />
    </section>
  );
}
