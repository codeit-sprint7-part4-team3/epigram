import SearchIcon from '@/assets/icons/ic-search.svg';
import SearchResult from '@/pages/search/components/SearchResult';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Epigram {
  content: string;
  author: string;
  tags: { id: number; name: string }[]; // tags 배열에 객체가 포함된 경우
}

function Search() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [highlightTerm, setHighlightTerm] = useState<string>(''); // 추가된 상태
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<Epigram[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 로컬스토리지에서 검색 기록 불러오기
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      const updatedHistory = [
        searchTerm,
        ...searchHistory.filter(term => term !== searchTerm),
      ];
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      router.push(`/search?query=${searchTerm}`);

      const encodedKeyword = encodeURIComponent(searchTerm);
      const response = await axios.get(
        `https://fe-project-epigram-api.vercel.app/7-3/epigrams?limit=10000&keyword=${encodedKeyword}`
      );

      // 검색어를 포함하는 필터링 로직 추가
      const filteredResults = response.data.list.filter(
        (epigram: Epigram) =>
          epigram.content.includes(searchTerm) ||
          epigram.author.includes(searchTerm) ||
          epigram.tags.some(tag => tag.name.includes(searchTerm))
      );

      setSearchResult(filteredResults);
      setHighlightTerm(searchTerm); // 검색이 실행될 때 highlightTerm을 업데이트
    }
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleTagClick = (term: string) => {
    setSearchTerm(term);
    handleSearch();
  };

  return (
    <div className='mx-auto max-w-lg p-4'>
      <div className='relative mb-10'>
        <input
          type='text'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder='Search...'
          className='w-full border-b-4 border-solid border-blue-800 py-2 pr-10 focus:outline-none'
        />

        <button
          onClick={handleSearch}
          className='absolute right-0 top-0 flex h-full items-center justify-center pr-2'
        >
          <SearchIcon className='h-17 w-17 text-gray-600' />
        </button>
      </div>

      {searchHistory.length > 0 && (
        <div className='mt-4'>
          <div className='mb-10 flex items-center justify-between'>
            <h3 className='text-lg font-bold'>최근 검색어</h3>
            <button
              onClick={handleClearHistory}
              className='text-xs text-red-500'
            >
              모두 지우기
            </button>
          </div>
          <ul className='mt-2 flex flex-wrap gap-10 p-10'>
            {searchHistory.map((term, index) => (
              <li
                key={index}
                className='cursor-pointer rounded-full bg-gray-50 px-14 py-12 text-gray-700'
                onClick={() => handleTagClick(term)}
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        {searchResult.map((epigram, index) => (
          <SearchResult
            key={index}
            content={epigram.content}
            author={epigram.author}
            tags={epigram.tags.map(tag => tag.name)} // tags 배열을 문자열 배열로 변환
            searchTerm={highlightTerm} // highlightTerm 전달
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
