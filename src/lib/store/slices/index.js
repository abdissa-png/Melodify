import { combineReducers } from 'redux';
import currentUserReducer from "./currentUserSlice";
import appUtilReducer from "./appUtilSlice";
import navScrollReducer from "./navScrollSlice"
import playerReducer from "./playerSlice";
import appModalReducer from "./appModalSlice";
import myPlaylistReducer from "./myPlaylistSlice";
export {
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    getCurrentUser,
    getUserProfile
} from "./currentUserSlice";

export {
    getTheme,
    getOpenSwitch,
    getToggleMenu,
    getToggleSearch,
    getToggleGenres,
    getSearchRef
} from "./appUtilSlice";

export {
    getIsNavScrollTrigger
} from "./navScrollSlice";
export {
    open,
    close,
    getModalContent
} from "./appModalSlice"
export {
    getCurrentPlaylist,
    getIsTrackPlaying,
    getNextTrack,
    getPlaylist,
    getPrevTrack,
    getTrackList,
    getIsLooping,
    getIsShuffle,
    getOnAudioEnd,
    updateTrackIndex} from "./playerSlice";
export {
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
    createMyPlaylistFailure
} from "./myPlaylistSlice";
const rootReducer = combineReducers({
    appUtil: appUtilReducer,
    navScroll: navScrollReducer,
    appModal:appModalReducer,
    currentUser: currentUserReducer,
    player: playerReducer,
    myPlaylist:myPlaylistReducer
});

export default rootReducer;