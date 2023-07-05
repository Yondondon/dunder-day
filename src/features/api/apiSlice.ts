import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts'
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
  useLoginMutation
} = apiSlice;