import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
    createMyPlaylistFailure } from '@/lib/store/slices';
import { v4 as uuidv4 } from "uuid";
import { arrayRemove, arrayUnion, serverTimestamp } from "@firebase/firestore";
import { elementInArray } from "@/lib/utils";
import { fetchMultiplePlaylists } from "@/lib/actions";
import {
    fbSetDoc,
    fbAddDoc,
    fbGetDoc,
    fbUpdateDoc,
    fbDeleteDoc,
    fbGetCollection,
    fbCountCollection,
    uploadImage,
    fbDeleteStorage,
  } from "@/lib/helpers";
import { useNotification } from '@/hooks';
function* createMyPlaylistSaga(action) {
  const [notify]=useNotification();
  const {userId,navigate}=action.payload;
  if (userId) {
    try {
	    const countMyPlaylist = yield  call(fbCountCollection,{
            collection: "myPlaylists",
            whereQueries: [["user_id", "==", userId]],
          });
        const docRef = yield call(fbAddDoc,{
            collection: "myPlaylists",
            data: {
              user_id: userId,
              desc: "Here is an optional description",
              title: `My Playlist #${countMyPlaylist + 1}`,
              track_ids: [],
              image_url: null,
              created_at: serverTimestamp(),
            },
          });
        yield put(createMyPlaylistSuccess());
        navigate(`/my-playlist/${docRef.id}`)
    } catch (error) {
	    yield put(createMyPlaylistFailure({error:JSON.parse(JSON.stringify(error))}));
	    notify({
				title: "Error",
				variant: "error",
				description: "Request failed",
			});
    };

    
  } else {
	  throw new Error("Invalid params");
  }
  
}

export function* watchcreateMyPlaylistSaga() {
  yield takeLatest("myPlaylist/createMyPlaylistRequest", createMyPlaylistSaga);
}


function* fetchMyPlaylistSaga(action) {
    const [notify]=useNotification();   
    const { userId, id, navigate } = action.payload;
    try {
      if (userId) {
        const singlePlaylist = yield call(fbGetDoc, {
          collection: "myPlaylists",
          id,
        });
  
        const { track_ids } = singlePlaylist.data() || {};
  
        let playlistDetails = singlePlaylist.data();
  
        playlistDetails = {
          ...playlistDetails,
          id: singlePlaylist.id,
          created_at: playlistDetails.created_at.toDate(),
        };
  
        if (track_ids?.length) {
          const tracks = yield call(fetchMultiplePlaylists, track_ids);
  
          yield put(fetchMyPlaylistSuccess({ playlistDetails:JSON.parse(JSON.stringify(playlistDetails)), playlistTracks: JSON.parse(JSON.stringify(tracks)) }));
        } else {
          yield put(fetchMyPlaylistSuccess({ playlistDetails:JSON.parse(JSON.stringify(playlistDetails)), playlistTracks: [] }));
        }
      } else {
        throw new Error("Invalid params");
      }
    } catch (error) {
      yield put(fetchMyPlaylistFailure({error:JSON.parse(JSON.stringify(error))}));
      notify({
          title: "Error",
          variant: "error",
          description: "Request failed",
      });
      navigate("/");
    }
}
  
export function* watchFetchMyPlaylistDetailsSaga() {
    yield takeLatest("myPlaylist/fetchMyPlaylistRequest", fetchMyPlaylistSaga);
}

function* editMyPlaylistSaga(action) {
    const [notify]=useNotification();
    const { userId, id, title, desc, files, imagePath } = action.payload;
    try {
      if (userId) {
        let imageUrl = null;
        let pathUrl = null;
        if (files) {
          pathUrl = imagePath || uuidv4();
  
          imageUrl = yield call(uploadImage, {
            imageFile: files[0],
            storagePath: `myPlaylists/${pathUrl}`,
            fileName: "image.jpg",
          });
        }
  
        yield call(fbUpdateDoc, {
          data: {
            title,
            desc,
            ...(files ? { image_url: imageUrl, image_path: pathUrl } : {}),
          },
          collection: "myPlaylists",
          id,
        });
        notify({
          title: "Success",
          variant: "success",
          description: "Details successfully edited",
        });
        yield(put(fetchMyPlaylistRequest({userId,id})))
        yield put(editMyPlaylistSuccess());
      } else {
        throw new Error("Invalid params");
      }
    } catch (error) {
      notify({
          title: "Error",
          variant: "error",
          description: "Request failed",
      });
      yield put(editMyPlaylistFailure({error:JSON.parse(JSON.stringify(error))}));
    }
  }
  
export function* watchEditMyPlaylistSaga() {
    yield takeLatest("myPlaylist/editMyPlaylistRequest", editMyPlaylistSaga);
}

function* removeMyPlaylistSaga(action) {
    const [notify]=useNotification();
    const { userId, id,navigate } = action.payload;
    try {
      if (userId) {
        const playlist = yield call(fbGetDoc, { collection: "myPlaylists", id });
        const filePath = playlist?.data()?.image_path;
        
        yield call(fbDeleteDoc, { collection: "myPlaylists", id });
  
        if (filePath) {
          yield call(fbDeleteStorage, `myPlaylists/${filePath}/image.jpg`);
        }
  
        navigate("/my-playlist")
        notify({
          title: "Success",
          variant: "success",
          description: "Deleted from playlist",
        });
        yield put(removeMyPlaylistSuccess());
  
      } else {
        throw new Error("Invalid params");
      }
    } catch (error) {
      notify({
          title: "Error",
          variant: "error",
          description: "An error occurred while deleting",
      });
      yield put(removeMyPlaylistFailure({error:JSON.parse(JSON.stringify(error))}));
    }
  }
  
export function* watchRemoveMyPlaylistSaga() {
    yield takeLatest('myPlaylist/removeMyPlaylistRequest', removeMyPlaylistSaga);
}

function* addTrackToMyPlaylistSaga(action) {
    const [notify]=useNotification(); 
    const { userId, trackD, id, imageUrl } = action.payload;
    try {
      if (userId) {
        const addTrackRef = yield call(fbGetDoc, { collection: "myPlaylists", id });
  
        if (addTrackRef.exists()) {
          const { track_ids, image_url } = addTrackRef.data();
          const notInArray = elementInArray(track_ids, trackD);
  
          if (!notInArray) {
            const trackIdsData = [trackD, ...track_ids].slice(0, 10);
  
            yield call(fbUpdateDoc, {
              data: {
                track_ids: trackIdsData,
                image_url: image_url || imageUrl,
              },
              collection: "myPlaylists",
              id,
            });
  
            notify({
                  title: "Success",
                  variant: "success",
                  description: "Added to playlist",
            })
            yield(put(fetchMyPlaylistRequest({userId,id})))
            yield put(addTrackToMyPlaylistSuccess());
          } 
        }
      } else {
        throw new Error("Invalid params");
      }
    } catch (error) {
      notify({
        title: "Error",
        variant: "error",
        description: "An error occurred while adding",
      });
      yield put(addTrackToMyPlaylistFailure({error:JSON.parse(JSON.stringify(error))}));
    }
  }
  
export function* watchAddTrackToMyPlaylistSaga() {
    yield takeLatest('myPlaylist/addTrackToMyPlaylistRequest', addTrackToMyPlaylistSaga);
}

function* removeTrackFromMyPlaylistSaga(action) {
    const [notify]=useNotification();
    const { userId, trackD, id } = action.payload;
    try {
      if (userId) {
        yield call(fbUpdateDoc, {
          data: {
            track_ids: arrayRemove(trackD),
          },
          collection: "myPlaylists",
          id,
        });
  
        notify({
          title: "Success",
          variant: "success",
          description: "Deleted from playlist",
        });
        yield(put(fetchMyPlaylistRequest({userId,id})))
        yield put(removeTrackFromMyPlaylistSuccess());
      } else {
        throw new Error("Invalid params");
      }
    } catch (error) {
      yield put(removeTrackFromMyPlaylistFailure({error:JSON.parse(JSON.stringify(error))}));
      notify({
          title: "Error",
          variant: "error",
          description: "An error occurred while deleting",
      });
    }
  }
  
export function* watchRemoveTrackFromMyPlaylistSaga() {
    yield takeLatest('myPlaylist/removeTrackFromMyPlaylistRequest', removeTrackFromMyPlaylistSaga);
}