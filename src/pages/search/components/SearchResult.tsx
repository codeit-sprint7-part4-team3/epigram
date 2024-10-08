import Link from 'next/link';
import React from 'react';

interface Tag {
  id: number;
  name: string;
}

interface SearchResultProps {
  content: string;
  author: string;
  tags: Tag[];
  searchTerm: string; // searchTerm 속성 추가
}

export default function SearchResult({
  content,
  author,
  tags,
  searchTerm,
}: SearchResultProps) {
  // 검색어를 하이라이트하는 함수
  function highlightSearchTerm(text: string, term: string) {
    if (!text) return ''; // text가 undefined인 경우 빈 문자열 반환
    if (!term) return text;
    const segments = text.split(new RegExp(`(${term})`, 'gi'));
    return segments.map((segment, index) =>
      segment.toLowerCase() === term.toLowerCase() ? (
        <span key={index} className='text-illust-blue'>
          {segment}
        </span>
      ) : (
        segment
      )
    );
  }

  return (
    <Link href={`/epigrams/${tags[0]?.id}`}>
      <div className='cursor-pointer'>
        <div className='flex min-h-150 flex-col justify-between rounded-2xl bg-blue-100 px-24 py-23 font-secondary'>
          <div className='text-14 font-normal leading-24 md:text-16 md:leading-26 xl:text-24 xl:leading-40'>
            {highlightSearchTerm(content, searchTerm)}
          </div>
          <div className='text-left text-14 font-normal leading-24 text-blue-400 md:text-16 md:leading-26 xl:text-24 xl:leading-40'>
            - {highlightSearchTerm(author, searchTerm)} -
          </div>
        </div>
        <div className='text-right font-primary text-14 leading-24 text-blue-400 md:text-16 md:leading-26 xl:text-24 xl:leading-40'>
          {tags.map((tag, index) => (
            <span key={tag.id}>
              {highlightSearchTerm(tag.name, searchTerm)}
              {index < tags.length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
