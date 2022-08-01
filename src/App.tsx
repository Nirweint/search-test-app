import { ReactElement } from 'react';

import { Search } from './components/Search';
import { SearchList } from './components/SearchList';

const App = (): ReactElement => {
  return (
    <div className="bg-gray-300 w-screen h-screen flex justify-center">
      <div className="bg-white max-w-screen-xl h-min p-4 mt-36 rounded-2xl w-3/5">
        <Search />
        <SearchList />
      </div>
    </div>
  );
};

export default App;
