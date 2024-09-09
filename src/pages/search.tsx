// pages/search.tsx
import SearchIcon from '@/assets/icons/ic-search.svg';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<string[]>([]);
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
      const newHistory = [searchTerm, ...searchHistory];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      router.push(`/search?query=${searchTerm}`);
    }
    const encodedKeyword = encodeURIComponent(searchTerm);
    const response = await axios.get(
      `https://fe-project-epigram-api.vercel.app/7-3/epigrams?limit=10000&keyword=${encodedKeyword}`
    );
    console.log(response);
    setSearchResult(response.data.list);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className='mx-auto max-w-lg p-4'>
      <div className='relative mb-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          placeholder='Search...'
          className='border-black w-full border-b-2 py-2 pr-10 focus:outline-none'
        />
        <button
          onClick={handleSearch}
          className='absolute right-0 top-0 flex h-full items-center justify-center pr-2'
        >
          <SearchIcon
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-20 w-20 text-gray-600'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 15l5-5m0 0l-5-5m5 5H9m6 0a9 9 0 11-6 6'
            />
          </SearchIcon>
        </button>
      </div>

      {searchHistory.length > 0 && (
        <div className='mt-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-bold'>최근 검색어</h3>
            <button
              onClick={handleClearHistory}
              className='text-xs text-red-500'
            >
              모두 지우기
            </button>
          </div>
          <ul className='mt-2 flex flex-wrap gap-2'>
            {searchHistory.map((term, index) => (
              <li
                key={index}
                className='rounded-full bg-gray-200 px-2 py-1 text-gray-700'
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}
      {JSON.stringify(searchResult)}
    </div>
  );
};

export default Search;
