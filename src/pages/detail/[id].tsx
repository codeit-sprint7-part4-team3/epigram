import { useComments } from '@/api/comments/useComments';
import { GetDetailEpigram } from '@/api/epigram/fetchEpigram';
import Interaction from '@/components/Interaction';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [epigramData, setEpigramData] = useState<EpigramDetailType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    comments,
    totalCount,
    isLoading: isCommentsLoading,
    error: commentsError,
    loadMore,
    hasMore,
  } = useComments(10);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const epigram = await GetDetailEpigram({ id: Number(id) });
          setEpigramData(epigram);
        } catch (err) {
          setError('에피그램 데이터를 불러오는 데 실패했습니다.');
          console.error('Error fetching epigram data:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading || isCommentsLoading) {
    return <div>Loading...</div>;
  }

  if (error || commentsError) {
    return <div>{error || commentsError}</div>;
  }

  if (!epigramData) return <div>Epigram not found</div>;

  return (
    <Interaction
      epigramData={epigramData}
      comments={comments}
      totalComments={totalCount}
      loadMoreComments={loadMore}
      hasMoreComments={hasMore}
    />
  );
}
