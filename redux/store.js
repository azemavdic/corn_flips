import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import godinaReducer from './godinaSlice';

export const store = configureStore({
    reducer: {
        godina: godinaReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
