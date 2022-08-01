import { ReactElement } from 'react';

import { ListItem } from '../ListItem';

import { useGetStarshipsQuery } from 'store/starships';

type SearchListPropsType = {
  searchValue: string;
};

const SearchList = ({ searchValue }: SearchListPropsType): ReactElement => {
  const { data: starships } = useGetStarshipsQuery(searchValue, { skip: !searchValue });

  return (
    <div>
      {starships?.map(starship => (
        <ListItem key={starship.url} starship={starship} />
      ))}
    </div>
  );
};

export default SearchList;
