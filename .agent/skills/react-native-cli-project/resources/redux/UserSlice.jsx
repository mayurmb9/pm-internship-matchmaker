import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDarkTheme: false,
  isUserLoggedIn: false,
  userName: '',
  userId: '',
  userEmail: '',
  userProfileImage: '',
  accessToken: '',
  refreshToken: '',
  firebaseToken: '',
  isProfileVerified: false,
  isBioMatricEnable: false,
  isNotificationEnable: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    setIsBioMatricEnable: (state, action) => {
      state.isBioMatricEnable = action.payload;
    },
    setIsNotificationEnable: (state, action) => {
      state.isNotificationEnable = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setUserProfileImage: (state, action) => {
      state.userProfileImage = action.payload;
    },
    setIsProfileVerified: (state, action) => {
      state.isProfileVerified = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setFirebaseToken: (state, action) => {
      state.firebaseToken = action.payload;
    },
    resetUser: (state) => {
      const firebaseToken = state.firebaseToken;
      Object.assign(state, initialState);
      state.firebaseToken = firebaseToken;
    },
    resetUserKeepLoginTheme: (state) => {
      const {isDarkTheme, isBioMatricEnable, firebaseToken} = state;
      Object.assign(state, initialState);
      state.isDarkTheme = isDarkTheme;
      state.isBioMatricEnable = isBioMatricEnable;
      state.firebaseToken = firebaseToken;
    },
  },
});

export const {
  setIsDarkTheme,
  setIsUserLoggedIn,
  setIsBioMatricEnable,
  setIsNotificationEnable,
  setUserName,
  setUserId,
  setUserEmail,
  setUserProfileImage,
  setIsProfileVerified,
  setAccessToken,
  setRefreshToken,
  setFirebaseToken,
  resetUser,
  resetUserKeepLoginTheme,
} = userSlice.actions;

export default userSlice.reducer;
