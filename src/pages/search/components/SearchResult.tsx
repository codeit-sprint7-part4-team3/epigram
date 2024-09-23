interface SearchResultProps {
  content: string;
  author: string;
  tags: string[];
}

export default function searchResult({
  content,
  author,
  tags,
}: SearchResultProps) {
  return (
    <div className='font-secondary'>
      <div className='mb-24 flex min-h-295 flex-col justify-between rounded-2xl bg-blue-100 px-24 py-23'>
        <div className='flex-1'>
          <div className='text-14 font-normal leading-24 md:text-16 md:leading-26 xl:text-24 xl:leading-40'>
            {content}
          </div>
        </div>
        <div className='text-left text-14 font-normal leading-24 text-blue-400 md:text-16 md:leading-26 xl:text-24 xl:leading-40'>
          - {author} -
        </div>
      </div>
      <div className='text-right text-14 font-normal leading-24 text-blue-400 md:text-16 md:leading-26 xl:text-24 xl:leading-40'>
        {tags}
      </div>
    </div>
  );
}
