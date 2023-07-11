import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Dunderlist', 'Playedlist'],
  endpoints: builder => ({
    getDunderlist: builder.query<any, void>({
      query: () => '/getDunderlist',
      providesTags: ['Dunderlist']
    }),
    getPlayedlist: builder.query<any, void>({
      query: () => '/getPlayedlist',
      providesTags: ['Playedlist']
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
      query: (gameInfo: {
        name: string;
        imageUrl?: string;
        gameUrl?: string;
        id: string;
        created: number;
      }) => ({
        url: '/addNewGame',
        method: 'POST',
        body: gameInfo
      }),
      invalidatesTags: ['Dunderlist']
    }),
    removeDunderListGame: builder.mutation({
      query: id => ({
        url: '/removeDunderListGame',
        method: 'POST',
        body: id
      }),
      invalidatesTags: ['Dunderlist']
    }),
    moveToPlayedList: builder.mutation({
      query: (data: { id: string; playedDate: number; }) => ({
        url: '/moveToPlayedList',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Dunderlist', 'Playedlist']
    }),
  })
})

export const {
  useGetDunderlistQuery,
  useGetPlayedlistQuery,
  useLoginMutation,
  useGetGameInfoMutation,
  useAddNewGameMutation,
  useRemoveDunderListGameMutation,
  useMoveToPlayedListMutation,
} = apiSlice;