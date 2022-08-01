import { ReactElement, useState } from 'react';

import { StarshipType } from 'api';

const SearchList = (): ReactElement => {
  const [resultList] = useState<StarshipType[]>([]);

  return (
    <div>
      {resultList.map(result => {
        return <div key={result.url}>{result.name}</div>;
      })}
    </div>
  );
};

export default SearchList;
