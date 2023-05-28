import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tagTypes = ['notification'] as const;
export type ITagType = (typeof tagTypes)[number];

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.green-api.com',
  }),
  tagTypes,
  endpoints: () => ({}),
});
