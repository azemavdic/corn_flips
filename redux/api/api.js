import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Izvoz'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_MY_URL}/api/`,
    }),
    endpoints: (builder) => ({
        getIzvozi: builder.query({
            query: () => 'izvozi',
            transformResponse: (response, meta, arg) => response.data,
            providesTags: (result, error, id) => [{ type: 'Izvoz', id }],
        }),
        dodajIzvoz: builder.mutation({
            query: (izvoz) => ({
                url: 'izvozi',
                method: 'POST',
                body: izvoz,
            }),
            invalidatesTags: [{ type: 'Izvoz', id: 'LIST' }],
        }),
        izbrisiIzvoz: builder.mutation({
            query: (id) => ({
                url: `izvozi/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Izvoz', id }],
        }),
    }),
});

export const {
    useGetIzvoziQuery,
    useDodajIzvozMutation,
    useIzbrisiIzvozMutation,
} = api;
