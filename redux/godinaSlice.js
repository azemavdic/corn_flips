import { createSlice } from '@reduxjs/toolkit';

export const godinaSlice = createSlice({
    name: 'godina',
    initialState: {
        value: null,
    },
    reducers: {
        trenutnaGodina: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { trenutnaGodina } = godinaSlice.actions;
export default godinaSlice.reducer;
