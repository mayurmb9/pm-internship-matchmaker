import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDarkTheme: false,
  isUserLoggedIn: false,
  userName: '',
  userId: '',
  userEmail: '',
  userMobile: '',
  userProfileImage: '',
  accessToken: '',
  refreshToken: '',
  firebaseToken: '',
  isProfileVerified: false,
  isBioMatricEnable: false,
  isNotificationEnable: true,
  aadhaarVerified: false,
  userRole: 'candidate', // 'candidate' | 'employer' | 'admin'
  locale: 'en', // 'en' | 'hi'
  education: '',
  qualification: '',
  passingYear: '',
  aadhaarLastFour: '',
  skills: [],
  interests: [],
  location: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
    updateUserProfile: (state, action) => {
      const { education, qualification, passingYear, aadhaarLastFour, skills, interests, location } = action.payload;
      state.education = education !== undefined ? education : state.education;
      state.qualification = qualification !== undefined ? qualification : state.qualification;
      state.passingYear = passingYear !== undefined ? passingYear : state.passingYear;
      state.aadhaarLastFour = aadhaarLastFour !== undefined ? aadhaarLastFour : state.aadhaarLastFour;
      state.skills = skills !== undefined ? skills : state.skills;
      state.interests = interests !== undefined ? interests : state.interests;
      state.location = location !== undefined ? location : state.location;
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
    setUserMobile: (state, action) => {
      state.userMobile = action.payload;
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
    setAadhaarVerified: (state, action) => {
      state.aadhaarVerified = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setNotificationEnable: (state, action) => {
      state.isNotificationEnable = action.payload;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    resetUser: (state) => {
      const firebaseToken = state.firebaseToken;
      Object.assign(state, initialState);
      state.firebaseToken = firebaseToken;
    },
    resetUserKeepLoginTheme: (state) => {
      const {isDarkTheme, isBioMatricEnable, firebaseToken, locale} = state;
      Object.assign(state, initialState);
      state.isDarkTheme = isDarkTheme;
      state.isBioMatricEnable = isBioMatricEnable;
      state.firebaseToken = firebaseToken;
      state.locale = locale;
    },
  },
});

export const {
  setIsDarkTheme,
  updateUserProfile,
  setIsUserLoggedIn,
  setIsBioMatricEnable,
  setIsNotificationEnable,
  setUserName,
  setUserId,
  setUserEmail,
  setUserMobile,
  setUserProfileImage,
  setIsProfileVerified,
  setAccessToken,
  setRefreshToken,
  setFirebaseToken,
  setAadhaarVerified,
  setUserRole,
  setNotificationEnable,
  setLocale,
  resetUser,
  resetUserKeepLoginTheme,
} = userSlice.actions;

export default userSlice.reducer;
