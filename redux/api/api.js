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
            providesTags: (result) =>
                result
                    ? [
                          //   ...result.map(({ id }) => ({ type: 'Posao', id })),
                          { type: 'Izvoz', id: 'LIST' },
                      ]
                    : [{ type: 'Izvoz', id: 'LIST' }],
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
            invalidatesTags: [{ type: 'Izvoz', id: 'LIST' }],
        }),
        editIzvoz: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `izvozi/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'Izvoz', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetIzvoziQuery,
    useDodajIzvozMutation,
    useIzbrisiIzvozMutation,
    useEditIzvozMutation,
} = api;
