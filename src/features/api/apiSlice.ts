import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: builder => ({
    // getGameInfo: builder.query<any, void>({
    //   query: () => '/getGameInfo'
    // }),
    getGameInfo: builder.mutation({
      query: appID => ({
        url: '/getGameInfo',
        method: 'POST',
        body: appID
      })
    }),
    login: builder.mutation({
      query: userData => ({
        url: '/login',
        method: 'POST',
        body: userData
      })
    })
  })
})

export const {
  useLoginMutation,
  useGetGameInfoMutation
} = apiSlice;