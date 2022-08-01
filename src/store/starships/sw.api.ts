import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../../constants';

import { StarshipsResponseType, StarshipType } from './types';

export const swAPI = createApi({
  reducerPath: 'starships',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: build => ({
    getStarships: build.query<StarshipType[], string>({
      query: (search: string) => ({
        url: 'starships',
        params: {
          search,
        },
      }),
      transformResponse: (response: StarshipsResponseType) => response.results,
    }),
  }),
});

export const { useGetStarshipsQuery } = swAPI;
