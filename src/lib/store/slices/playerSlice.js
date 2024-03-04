import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    tracklist: [],
    playlistId: null,
    playlistType: null,
    trackIndex:  0,
    trackId: null,
    trackType: null,
    currentPlaylistDetails: null,
    isTrackPlaying: false,
    audioLoader: null,
    isLooping: false,
    isShuffle: false,
  },
  reducers: {
    getTrackList: (state, action) => {
      const { tracklist, playlistId, playlistType, trackIndex, trackId, trackType } = action.payload || {};
      if (tracklist) state.tracklist = tracklist;
      if (playlistId) state.playlistId = playlistId;
      if (playlistType) state.playlistType = playlistType;
      if (trackIndex) state.trackIndex = trackIndex;
      if (trackId) state.trackId = trackId;
      if (trackType) state.trackType = trackType;
    },
    getPlaylist: (state, action) => {
        const {
            tracklist,
            playlistId,
            playlistType,
            trackIndex,
            trackId,
            trackType,
          } = action.payload || {};
    
          if (
            trackIndex?.toString() &&
            state.playlistId === playlistId &&
            state.tracklist.length &&
            state.tracklist.length > trackIndex
          ) {
            
              state.trackIndex=trackIndex
              state.trackId=trackId
              state.trackType= trackType
              return ;
            };

          const index = trackIndex || 0;
    
          if (
            tracklist?.length &&
            playlistId &&
            playlistType &&
            state.playlistId !== playlistId
          ) {
              state.tracklist= tracklist
              state.playlistId=playlistId
              state.playlistType= playlistType
              state.trackIndex= index
              state.trackId= tracklist[index].id
              state.trackType= tracklist[index].type
              return ;
          }
    },
    getCurrentPlaylist: (state, action) => {
      state.currentPlaylistDetails = action.payload;
    },
    updateTrackIndex: (state, action) => {
      state.trackIndex = action.payload;
    },
    getIsTrackPlaying: (state, action) => {
      state.isTrackPlaying = action.payload;
    },
    getNextTrack: (state) => {
        const { tracklist, trackIndex } = state;
        const isLastSTrack = tracklist.length - 1 <= trackIndex;
  
        if (isLastSTrack) {
            state.trackIndex= 0
            state.trackId= tracklist[0].id
            return ;
        }
  
          state.trackIndex= trackIndex + 1
          state.trackId= tracklist[trackIndex + 1].id
    },
    getPrevTrack: (state) => {
        const { tracklist, trackIndex } = state;

        if (trackIndex <= 0) {
          const index = tracklist.length - 1;
            state.trackIndex=index
            state.trackId=tracklist[index].id
            return ;
        }

          state.trackIndex=trackIndex - 1
          state.trackId=tracklist[trackIndex - 1].id
    },
    getOnAudioEnd: (state) => {
        const { tracklist, trackIndex, isLooping } = state;
        const isLastSTrack = tracklist.length - 1 <= trackIndex;
  
        if (isLooping) {
            state.trackIndex=trackIndex
            state.trackId=tracklist[trackIndex].id
            return ;
        }
        if (isLastSTrack) {
          
            state.trackIndex= 0
            state.trackId=tracklist[0].id
            return ;
        }

        state.trackIndex=trackIndex + 1
        state.trackId=tracklist[trackIndex + 1].id
    },
    getIsLooping: (state) => {
      state.isLooping = !state.isLooping;
    },
    getIsShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
  },
});
export const {
    getTrackList,
    getPlaylist,
    getCurrentPlaylist,
    updateTrackIndex,
    getIsTrackPlaying,
    getNextTrack,
    getPrevTrack,
    getOnAudioEnd,
    getIsLooping,
    getIsShuffle,
} = playerSlice.actions;
export default playerSlice.reducer;