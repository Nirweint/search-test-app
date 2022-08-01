import React, { ReactElement } from 'react';

import empireIcon from '../../assets/icons/empire-icon.svg';
import shipImage from '../../assets/images/stardes.jpg';

import { StarshipType } from 'store/starships/types';

type ListItemPropsType = {
  starship: StarshipType;
};

const ListItem = ({ starship }: ListItemPropsType): ReactElement => {
  const { crew, manufacturer, name } = starship;

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex">
        <img className="w-16 h-16 rounded-md mr-4" src={shipImage} alt="ship" />
        <div className="flex flex-col justify-center">
          <span className="font-bold">{name}</span>
          <div className="flex">
            <span className="text-gray-400 mr-2 pr-2 border-r">{manufacturer}</span>
            <span className="text-gray-400">Crew: {crew}</span>
          </div>
        </div>
      </div>
      <div>
        <img className="w-6 mr-6" src={empireIcon} alt="icon" />
      </div>
    </div>
  );
};

export default ListItem;
