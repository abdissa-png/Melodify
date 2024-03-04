import { createSlice } from '@reduxjs/toolkit';
const navScrollSlice = createSlice({
    name: 'navScroll',
    initialState: {
      getTrigger: false,
    },
    reducers: {
      getIsNavScrollTrigger: (state, action) => {
        state.getTrigger = action.payload;
      },
    },
});
export const { getIsNavScrollTrigger } = navScrollSlice.actions;
export default navScrollSlice.reducer;