import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Redux saga
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from "@/lib/store/slices";
import rootSaga from "@/lib/store/sagas";

// Middleware
const sagaMiddleware = createSagaMiddleware();

let store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "myPlaylist/fetchMyPlaylistRequest",
          "myPlaylist/createMyPlaylistRequest",
          "myPlaylist/editMyPlaylistRequest",
          "myPlaylist/removeMyPlaylistRequest",
          "myPlaylist/addTrackToMyPlaylistRequest",
          "myPlaylist/removeTrackFromMyPlaylistRequest",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "payload.playlistDetails.created_at",
          "appModal.modalContent.$$typeof",
        ],
        // Ignore these paths in the state
        ignoredPaths: ["*"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
