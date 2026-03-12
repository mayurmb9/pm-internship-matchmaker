import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {store} from '../Redux/Store';
import {
  setAccessToken,
  setRefreshToken,
  setIsUserLoggedIn,
  resetUser,
} from '../Redux/UserSlice';
import {BaseUrl, Endpoints} from './Url';
import {ReduxKeys} from './String';
import {Constants} from './Constant';
import {AppStrings} from './String';

// ─── Safe Area Hooks ─────────────────────────────────────────

export const useBottomInset = () => {
  const insets = useSafeAreaInsets();
  return insets.bottom;
};

export const useTopInset = () => {
  const insets = useSafeAreaInsets();
  return insets.top;
};

// ─── AsyncStorage Helpers ────────────────────────────────────

export const _saveAsyncStorage = async (key, value) => {
  try {
    const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('AsyncStorage Save Error:', error);
    return false;
  }
};

export const _getAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return null;
  } catch (error) {
    console.error('AsyncStorage Get Error:', error);
    return null;
  }
};

// ─── Network Reachability ────────────────────────────────────

export const _checkReachability = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable;
  } catch (error) {
    console.error('Network Check Error:', error);
    return false;
  }
};

// ─── Redux Helpers ───────────────────────────────────────────

export const getFromRedux = (key) => {
  const state = store.getState();
  const userState = state[ReduxKeys.USER];
  if (userState && key in userState) {
    return userState[key];
  }
  return null;
};

export const saveToRedux = (action, value) => {
  store.dispatch(action(value));
};

export const resetRedux = () => {
  store.dispatch(resetUser());
};

// ─── Aadhaar / ID Helpers ────────────────────────────────────

/**
 * Formats a raw 12-digit string as "XXXX XXXX XXXX".
 */
export const formatAadhaar = (raw) => {
  const digits = raw.replace(/\D/g, '').slice(0, 12);
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(' ');
};

/**
 * Masks Aadhaar: "XXXX XXXX 1234" — hides the first 8 digits.
 */
export const maskAadhaar = (raw) => {
  const digits = raw.replace(/\D/g, '');
  if (digits.length !== 12) {
    return raw;
  }
  return `XXXX XXXX ${digits.slice(8)}`;
};

/**
 * Validates that the value is exactly 12 digits.
 */
export const validateAadhaar = (value) => {
  const digits = value.replace(/\D/g, '');
  return digits.length === 12;
};

/**
 * Validates Indian mobile: 10 digits starting with 6-9.
 */
export const validateMobile = (value) => {
  const digits = value.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(digits);
};

/**
 * Returns 'hi' or 'en' based on device locale.
 * Falls back to 'en' if react-native-localize is unavailable.
 */
export const getDeviceLocale = () => {
  try {
    const RNLocalize = require('react-native-localize');
    const locales = RNLocalize.getLocales();
    if (locales && locales.length > 0) {
      const lang = locales[0].languageCode;
      return lang === 'hi' ? 'hi' : 'en';
    }
  } catch {
    // react-native-localize might not be linked
  }
  return 'en';
};

// ─── Token Refresh ───────────────────────────────────────────

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

export const refreshAccessToken = async () => {
  try {
    const currentRefreshToken = getFromRedux(ReduxKeys.REFRESH_TOKEN);
    if (!currentRefreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(
      `${BaseUrl}${Endpoints.REFRESH_TOKEN}`,
      {refreshToken: currentRefreshToken},
      {timeout: Constants.API_TIMEOUT},
    );

    const {accessToken, refreshToken} = response.data;

    saveToRedux(setAccessToken, accessToken);
    saveToRedux(setRefreshToken, refreshToken);

    return accessToken;
  } catch (error) {
    console.error('Token Refresh Failed:', error);
    saveToRedux(setIsUserLoggedIn, false);
    resetRedux();
    throw error;
  }
};

// ─── API Call Handler ────────────────────────────────────────

/**
 * Centralized API call handler with auto token refresh on 401.
 *
 * @param {string} endpoint - API endpoint path (from Endpoints)
 * @param {string} method - HTTP method ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')
 * @param {object|null} data - Request body data
 * @param {object} customHeaders - Additional headers
 * @param {boolean} requiresAuth - Whether to include auth token
 * @param {number} retryCount - Current retry attempt (internal use)
 * @returns {Promise<{success: boolean, data: any, message: string, statusCode: number}>}
 */
export const _callAPI = async (
  endpoint,
  method = 'GET',
  data = null,
  customHeaders = {},
  requiresAuth = true,
  retryCount = 0,
) => {
  // Check network connectivity
  const isConnected = await _checkReachability();
  if (!isConnected) {
    return {
      success: false,
      data: null,
      message: AppStrings.NO_INTERNET,
      statusCode: 0,
    };
  }

  try {
    // Build headers
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (requiresAuth) {
      const token = getFromRedux(ReduxKeys.ACCESS_TOKEN);
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    // Make request
    const config = {
      url: `${BaseUrl}${endpoint}`,
      method: method.toUpperCase(),
      headers,
      timeout: Constants.API_TIMEOUT,
    };

    if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      config.data = data;
    } else if (data && method.toUpperCase() === 'GET') {
      config.params = data;
    }

    const response = await axios(config);

    return {
      success: true,
      data: response.data,
      message: AppStrings.SUCCESS,
      statusCode: response.status,
    };
  } catch (error) {
    // Handle 401 — Token Expired
    if (error.response?.status === 401 && requiresAuth && retryCount < Constants.MAX_RETRY) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;
          onRefreshed(newToken);

          // Retry original request with new token
          return _callAPI(endpoint, method, data, customHeaders, requiresAuth, retryCount + 1);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          return {
            success: false,
            data: null,
            message: AppStrings.SESSION_EXPIRED,
            statusCode: 401,
          };
        }
      } else {
        // Queue the request and wait for token refresh
        return new Promise((resolve) => {
          addRefreshSubscriber(() => {
            resolve(
              _callAPI(endpoint, method, data, customHeaders, requiresAuth, retryCount + 1),
            );
          });
        });
      }
    }

    // Handle other errors
    const statusCode = error.response?.status || 0;
    const message =
      error.response?.data?.message ||
      error.message ||
      AppStrings.SOMETHING_WENT_WRONG;

    return {
      success: false,
      data: error.response?.data || null,
      message,
      statusCode,
    };
  }
};
