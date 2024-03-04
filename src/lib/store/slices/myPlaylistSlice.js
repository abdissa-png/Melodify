import { createSlice } from '@reduxjs/toolkit';

const myPlaylistSlice = createSlice({
  name: 'myPlaylist',
  initialState: { playlist: [], 
  isLoading: {
    create: false,
    fetch: false,
    edit: false,
    remove: false,
    addTrack: false,
    removeTrack: false,
  },
  error: {
    create: null,
    fetch: null,
    edit: null,
    remove: null,
    addTrack: null,
    removeTrack: null,
  }, },
  reducers: {
    createMyPlaylistRequest: (state,action) => {
      state.isLoading.create = true ;
      state.error.create = null;
    },
    createMyPlaylistSuccess: (state, action) => {
      state.isLoading.create = false;
      state.error.create = null;
    },
    createMyPlaylistFailure: (state, action) => {
      state.isLoading.create = false;
      state.error.create = action.payload.error;
    },
    fetchMyPlaylistRequest: (state,action) => { 
        state.isLoading.fetch = true; 
        state.error.fetch = null;
    }, 
    fetchMyPlaylistSuccess: (state, action) => {                      
        state.isLoading.fetch = false;
        state.playlist=action.payload;         
        state.error.fetch = null; 
    },
    fetchMyPlaylistFailure: (state, action) => {
        state.isLoading.fetch = false;
        state.error.fetch = action.payload.error; 
    },
    editMyPlaylistRequest: (state,action) => {
        state.isLoading.edit = true;
        state.error.edit = null;
    },
    editMyPlaylistSuccess: (state) => {
        state.isLoading.edit = false;
        state.error.edit = null;
    },
    editMyPlaylistFailure: (state, action) => {
        state.isLoading.edit = false;
        state.error.edit = action.payload.error;
    },
    removeMyPlaylistRequest: (state,action) => {
        state.isLoading.remove = true;
        state.error.remove = null;
    },
    removeMyPlaylistSuccess: (state) => {
        state.isLoading.remove = false;
        state.error.remove = null;
    },
    removeMyPlaylistFailure: (state, action) => {
        state.isLoading.remove = false;
        state.error.remove = action.payload.error;
    },
    addTrackToMyPlaylistRequest: (state,action) => {
        state.isLoading.addTrack = true;
        state.error.addTrack = null;
    },
    addTrackToMyPlaylistSuccess: (state,action) => {
        state.isLoading.addTrack = false;
        state.error.addTrack = null;
    },
    addTrackToMyPlaylistFailure: (state, action) => {
        state.isLoading.addTrack = false;
        state.error.addTrack = action.payload.error;
    },
    removeTrackFromMyPlaylistRequest: (state) => {
        state.isLoading.removeTrack = true;
        state.error.removeTrack = null;
    },
    removeTrackFromMyPlaylistSuccess: (state) => {
        state.isLoading.removeTrack = false;
        state.error.removeTrack = null;
    },
    removeTrackFromMyPlaylistFailure: (state, action) => {
        state.isLoading.removeTrack = false;
        state.error.removeTrack = action.payload.error;
    },
}});

export const {
    removeTrackFromMyPlaylistRequest,
    removeTrackFromMyPlaylistSuccess,
    removeTrackFromMyPlaylistFailure,
    addTrackToMyPlaylistRequest,
    addTrackToMyPlaylistSuccess,
    addTrackToMyPlaylistFailure,
    removeMyPlaylistRequest,
    removeMyPlaylistSuccess,
    removeMyPlaylistFailure,
    editMyPlaylistRequest,
    editMyPlaylistSuccess,
    editMyPlaylistFailure,
    fetchMyPlaylistRequest,
    fetchMyPlaylistSuccess,
    fetchMyPlaylistFailure,
    createMyPlaylistRequest,
    createMyPlaylistSuccess,
    createMyPlaylistFailure } = myPlaylistSlice.actions;

export default myPlaylistSlice.reducer;