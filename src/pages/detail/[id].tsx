import { useComments } from '@/api/comments/useComments';
import Interaction from '@/components/Interaction';
import { GetServerSideProps } from 'next';

interface DetailPageProps {
  epigramData: EpigramDetailType;
}

export default function DetailPage({ epigramData }: DetailPageProps) {
  if (!epigramData) return <div>Epigram not found</div>;

  return <Interaction epigramData={epigramData} />;
}

export const getServerSideProps: GetServerSideProps<
  DetailPageProps
> = async context => {
  const { id } = context.params as { id: string };

  //   try {
  //     const response = await fetch(`${process.env.API_URL}/api/epigrams/${id}`);

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch epigram');
  //     }

  //     const epigramData: EpigramDetailType = await response.json();

  //     return {
  //       props: { epigramData },
  //     };
  //   } catch (error) {
  //     console.error('Error fetching epigram:', error);
  //     return {
  //       notFound: true, // 404 페이지를 보여줍니다
  //     };
  //   }
};
