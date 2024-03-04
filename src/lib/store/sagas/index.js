import { all } from "redux-saga/effects";
import {
    watchLogin,
    watchLogout,
    watchRegister
 } from "./currentUserSaga";
import {
    watchAddTrackToMyPlaylistSaga,
    watchRemoveTrackFromMyPlaylistSaga,
    watchRemoveMyPlaylistSaga,
    watchEditMyPlaylistSaga,
    watchcreateMyPlaylistSaga,
    watchFetchMyPlaylistDetailsSaga
} from "./myPlaylistSaga"
export default function* rootSaga() { 
	yield all([ 
		watchLogin(),
		watchRegister(), 
		watchLogout(),
        watchAddTrackToMyPlaylistSaga(),
        watchRemoveTrackFromMyPlaylistSaga(),
        watchRemoveMyPlaylistSaga(),
        watchEditMyPlaylistSaga(),
        watchcreateMyPlaylistSaga(),
        watchFetchMyPlaylistDetailsSaga()
		// Add other sagas as needed
	]); 
}