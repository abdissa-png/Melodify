import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  userProfile: null,
  isLoading: {
    login: false,
    register: false,
    logout: false
  },
  error: {
    login: null,
    register: null,
    logout: null
  }
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    logoutRequest(state,action) {
      state.isLoading.logout = true;
    },
    logoutSuccess(state,action) {
      state.currentUser = null;
      state.isLoading.logout = false;
      state.error.logout = null;
    },
    logoutFailure(state, action) {
      state.isLoading.logout = false;
      state.error.logout = action.payload.error;
    },
    registerRequest(state,action) {
      state.isLoading.register = true;
    },
    registerSuccess(state, action) {
      state.currentUser = action.payload.currentUser;
      state.isLoading.register = false;
      state.error.register = null;
    },
    registerFailure(state, action) {
      state.isLoading.register = false;
      state.error.register = action.payload.error;
    },
    loginRequest(state,action) {
      state.isLoading.login = true;
    },
    loginSuccess(state, action) {
      state.currentUser = {...action.payload.currentUser};
      state.isLoading.login = false;
      state.error.login = null;
    },
    loginFailure(state, action) {
      state.currentUser = null;
      state.isLoading.login = false;
      state.error.login = action.payload.error;
    },
    getCurrentUser(state, action) {
      state.currentUser = action.payload.currentUser;
    },
    getUserProfile(state, action) {
      state.userProfile = action.payload.userProfile;
    },
  },
});

export const {
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
  getUserProfile,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;