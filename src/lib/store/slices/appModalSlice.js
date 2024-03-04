import { createSlice } from '@reduxjs/toolkit';
const appModalSlice = createSlice({
    name: 'appModal',
    initialState: {
        isOpen: false,
        modalContent: null,
    },
    reducers: {
        open: (state,action)=>{
            state.isOpen=true;
        },
        close: (state,action)=>{
            state.isOpen=false;
            state.modalContent=null
        },
        getModalContent: (state,action)=>{
            state.modalContent=action.payload
        },
      },
});
export const {
    open,
    close,
    getModalContent
} = appModalSlice.actions;
export default appModalSlice.reducer;