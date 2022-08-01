import { ReactElement, useState } from 'react';

import { Search } from './components/Search';
import { SearchList } from './components/SearchList';

const App = (): ReactElement => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [submittedSearchValue, setSubmittedSearchValue] = useState<string>('');

  const handleFormSubmit = (): void => {
    setSubmittedSearchValue(searchValue);
    setSearchValue('');
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-start">
      <div className="bg-white max-w-screen-xl p-4 mt-16 rounded-2xl w-3/5">
        <Search
          setSearchValue={setSearchValue}
          setSubmittedSearchValue={setSubmittedSearchValue}
          searchValue={searchValue}
          onFormSubmit={handleFormSubmit}
        />
        <SearchList searchValue={submittedSearchValue} />
      </div>
    </div>
  );
};

export default App;
