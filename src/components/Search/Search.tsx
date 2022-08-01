import { ReactElement, useEffect, useState, FormEvent } from 'react';

import { useDebounce } from 'hooks';
import { useGetStarshipsQuery } from 'store/starships';

import './Search.css';

const SEARCH_DELAY = 500;
const BUTTON_TEXT = 'Search';

type SearchPropsType = {
  setSearchValue: (value: string) => void;
  setSubmittedSearchValue: (value: string) => void;
  searchValue: string;
  onFormSubmit: () => void;
};

const Search = ({
  setSearchValue,
  searchValue,
  onFormSubmit,
  setSubmittedSearchValue,
}: SearchPropsType): ReactElement => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [selectClicked, setSelectClicked] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchValue, SEARCH_DELAY);

  const { data: starships } = useGetStarshipsQuery(debouncedSearchTerm, {
    skip: !debouncedSearchTerm,
  });

  const handleSearchChange = (e: any): void => {
    setSearchValue(e.target.value);
    setSelectClicked(false);
  };
  const handleSelectClick = (name: string) => () => {
    setSubmittedSearchValue(name);
    setSearchValue(name);
    setSelectClicked(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onFormSubmit();
  };

  useEffect(() => {
    setDropdown(!selectClicked && !!searchValue && starships?.length! > 0);
  }, [searchValue, starships, selectClicked]);

  useEffect(() => {
    if (selectClicked) setSearchValue('');
  }, [selectClicked]);

  return (
    <form onSubmit={handleSubmit}>
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
          value={searchValue}
          onChange={handleSearchChange}
          type="search"
          name="input-search"
          className="py-4 text-lg w-full text-black bg-gray-300 rounded-md pl-10 placeholder-black focus:outline-none focus:text-gray-900 mr-2"
          placeholder="Search..."
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-700 duration-300 focus:scale-95 transform"
        >
          {BUTTON_TEXT}
        </button>
        {dropdown && (
          <ul
            className="hide-scrollbar flex flex-col absolute inset-14 left-0 h-96 overflow-auto"
            style={{
              right: '5.45rem',
            }}
          >
            {starships?.map(({ name, url }) => (
              <li
                className="bg-gray-300 text-black p-4 hover:bg-gray-400 cursor-pointer"
                key={url}
                onClick={handleSelectClick(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};

export default Search;
