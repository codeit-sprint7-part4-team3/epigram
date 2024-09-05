// pages/search.tsx
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchHistory([searchTerm, ...searchHistory]);
      router.push(`/search?query=${searchTerm}`);
    }
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <div className='relative mb-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          placeholder='Search...'
          className='w-full py-2 pr-10 border-b-2 border-black focus:outline-none'
        />
        <button
          onClick={handleSearch}
          className='absolute right-0 top-0 mt-2 mr-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='w-6 h-6 text-gray-600'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M15 15l5-5m0 0l-5-5m5 5H9m6 0a9 9 0 11-6 6'
            />
          </svg>
        </button>
      </div>

      {searchHistory.length > 0 && (
        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg'>최근 검색어</h3>
            <button
              onClick={handleClearHistory}
              className='text-sm text-blue-500'
            >
              모두 지우기
            </button>
          </div>
          <ul className='mt-2'>
            {searchHistory.map((term, index) => (
              <li key={index} className='text-gray-700'>
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
