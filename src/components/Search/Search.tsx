import { ReactElement, useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';

import { StarshipsResponseType, StarshipType, swAPI } from 'api';
import { useDebounce } from 'hooks';

import './Search.css';

const SEARCH_DELAY = 1000;

const Search = (): ReactElement => {
  const [search, setSearch] = useState<string>('');
  const [dropDownList, setDropDownList] = useState<StarshipType[]>([]);
  const debouncedSearchTerm = useDebounce(search, SEARCH_DELAY);

  const handleSearchChange = (e: any): void => {
    setSearch(e.target.value);
  };
  const handleSelectClick = (name: string) => (): void => {
    setSearch(name);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data: AxiosResponse<StarshipsResponseType> = await swAPI.getStarship({
          search: debouncedSearchTerm,
        });

        setDropDownList(data.data.results);
      } catch (e) {
        console.log(e);
      }
    };

    if (search) {
      fetchData().catch(console.error);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!search) {
      setDropDownList([]);
    }
  }, [search]);

  return (
    <form method="GET">
      <div className="relative text-gray-600 focus-within:text-gray-400 flex w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-black"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          value={search}
          onChange={handleSearchChange}
          type="search"
          name="input-search"
          className="py-4 text-lg w-full text-black bg-gray-300 rounded-md pl-10 placeholder-black focus:outline-none focus:text-gray-900 mr-2"
          placeholder="Search..."
          autoComplete="off"
        />
        <button
          type="button"
          className="bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-700 duration-300 focus:scale-95 transform"
          onClick={() => true}
        >
          Search
        </button>
        <ul
          className="hide-scrollbar flex flex-col absolute inset-14 left-0 h-96 overflow-auto"
          style={{
            right: '5.45rem',
          }}
        >
          {dropDownList.map(({ name, url }) => {
            return (
              <li
                className="bg-gray-300 text-black p-4 hover:bg-gray-400 cursor-pointer"
                key={url}
                onClick={handleSelectClick(name)}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    </form>
  );
};

export default Search;
