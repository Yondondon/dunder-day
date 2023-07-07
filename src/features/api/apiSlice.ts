import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Dunderlist'],
  endpoints: builder => ({
    getDunderlist: builder.query<any, void>({
      query: () => '/getDunderlist',
      providesTags: ['Dunderlist']
    }),
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
    }),
    addNewGame: builder.mutation({
      query: gameInfo => ({
        url: '/addNewGame',
        method: 'POST',
        body: gameInfo
      }),
      invalidatesTags: ['Dunderlist']
    }),
  })
})

export const {
  useGetDunderlistQuery,
  useLoginMutation,
  useGetGameInfoMutation,
  useAddNewGameMutation,
} = apiSlice;