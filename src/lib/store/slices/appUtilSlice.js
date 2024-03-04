import { createSlice } from '@reduxjs/toolkit';
const appUtilSlice = createSlice({
    name: 'appUtil',
    initialState: {
      theme: {},
      openSwitch: false,
      toggleMenu: false,
      toggleSearch: false,
      toggleGenres: false,
      searchRef: undefined,
    },
    reducers: {
        getTheme: (state, action) => {
            state.theme = action.payload;
        },
        getOpenSwitch: (state, action) => {
            state.openSwitch = action.payload;
        },
        getToggleMenu: (state, action) => {
            state.toggleMenu = action.payload;
        },
        getToggleSearch: (state, action) => {
          state.toggleSearch = action.payload;
        },
        getToggleGenres: (state, action) => {
            state.toggleGenres = action.payload;
        },
        getSearchRef: (state, action) => {
            const {value}=action.payload;
            state.searchRef = value;
        },
    },
});
export const {
    getTheme,
    getOpenSwitch,
    getToggleMenu,
    getToggleSearch,
    getToggleGenres,
    getSearchRef,
} = appUtilSlice.actions;
export default appUtilSlice.reducer;