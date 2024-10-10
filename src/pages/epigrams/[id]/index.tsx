// File: /pages/7-3/epigrams/[id].tsx
import { useComments } from '@/api/comments/useComments';
import { GetDetailEpigram } from '@/api/epigram/fetchEpigram';
import Interaction from '@/components/Interaction';
import { useCommentStore } from '@/lib/store/useCommentStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EpigramDetailPage: React.FC = () => {
  const {} = useCommentStore();
  const router = useRouter();
  const { id } = router.query;

  const [epigramData, setEpigramData] = useState<EpigramDetailType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const epigramId = Number(id);
  const {
    comments,
    totalCount,
    isLoading: isCommentsLoading,
    error: commentsError,
    loadMore,
    hasMore,
  } = useComments(epigramId, 10);

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

  if (router.isFallback || isCommentsLoading || !epigramData) {
    return <div>Loading...</div>;
  }

  if (error || commentsError) {
    return <div>{error || commentsError}</div>;
  }

  return (
    <Interaction
      epigramData={epigramData}
      comments={comments}
      totalComments={totalCount}
      loadMoreComments={loadMore}
      hasMoreComments={hasMore}
    />
  );
};

export default EpigramDetailPage;
