---
name: creating-react-native-cli-project
description: "Scaffolds a new React Native CLI (non-Expo) project with enterprise architecture. Use when the user asks to create a new React Native project, set up a React Native CLI app, or initialize a mobile app with Redux, navigation, and enterprise folder structure."
---

# React Native CLI Enterprise Project Creator

## When to use this skill

- User asks to create a new React Native CLI project (NOT Expo)
- User wants an enterprise-grade React Native app scaffold
- User mentions setting up React Native with Redux, navigation, drawer, bottom tabs
- User wants a production-ready React Native boilerplate

## Prerequisites

- Node.js >= 18 installed
- Java JDK 17+ installed
- Android Studio with SDK configured (for Android)
- Xcode installed (for iOS, macOS only)

## Workflow

- [ ] Step 1: Ask user for project name (if not provided)
- [ ] Step 2: Initialize React Native CLI project
- [ ] Step 3: Install all required dependencies
- [ ] Step 4: Create enterprise folder structure under `src/`
- [ ] Step 5: Generate all common utility files
- [ ] Step 6: Generate Redux store and slices
- [ ] Step 7: Generate custom reusable components
- [ ] Step 8: Generate navigation structure
- [ ] Step 9: Generate sample screens (Login, Home, Drawer)
- [ ] Step 10: Update App.jsx entry point
- [ ] Step 11: Verify the build

---

## Step 1: Ask for Project Name

If the user hasn't provided a project name, ask:
> "What would you like to name your React Native project? (e.g., MyApp)"

Use PascalCase or camelCase — no spaces or special characters.

---

## Step 2: Initialize React Native CLI Project

```bash
npx -y @react-native-community/cli init <ProjectName> --skip-install
cd <ProjectName>
npm install
```

> **Note**: Do NOT use Expo. Use `@react-native-community/cli` for bare React Native.

---

## Step 3: Install Dependencies

Run the following in the project root:

```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage axios react-native-vector-icons @react-native-community/netinfo
```

After installation, for `react-native-reanimated`, add the Babel plugin. Update `babel.config.js`:

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

---

## Step 4: Create Enterprise Folder Structure

Create the following directory tree under `src/`:

```
src/
├── assets/
│   ├── fonts/
│   └── images/
├── common/
├── components/
├── navigation/
├── Redux/
└── screens/
    ├── DrawerScreens/
    └── StackScreens/
```

---

## Step 5: Generate Common Files

All files below go in `src/common/`. Use the templates in [resources/common/](resources/common/).

### Color.jsx
- Export a `Colors` object with keys: `primary`, `secondary`, `background`, `surface`, `text`, `textSecondary`, `error`, `success`, `warning`, `info`, `white`, `black`, `grey`, `lightGrey`, `darkGrey`, `transparent`, `inputBorder`, `inputBackground`, `placeholder`, `disabled`, `overlay`, `ripple`, `statusBar`, `divider`.
- Provide both light and dark palette variants via a function `getColors(isDarkTheme)`.

### Constant.jsx
- Export `Constants` with: `APP_NAME`, `API_TIMEOUT`, `TOKEN_EXPIRY`, `MAX_RETRY`, `PAGINATION_LIMIT`, `ANIMATION_DURATION`, `INPUT_MAX_LENGTH`, `OTP_LENGTH`, `DEBOUNCE_DELAY`.

### Path.jsx
- Export `ImagePaths` object referencing assets from `../assets/images/`.
- Include placeholder keys: `logo`, `placeholder`, `background`, `avatar`, `emptyState`.

### Routes.jsx
- Export `Route_Strings` with keys: `LOGIN`, `HOME`, `DRAWER`, `BOTTOM_TAB`, `PROFILE`, `SETTINGS`, `NOTIFICATIONS`, `DETAILS`.
- Values should be string names like `'LoginScreen'`, `'HomeScreen'`, etc.

### SharedStyles.jsx
- Export `SharedStyles` using `StyleSheet.create` with common styles: `container`, `centerContent`, `row`, `spaceBetween`, `shadow`, `card`, `inputContainer`, `buttonContainer`, `headerText`, `subHeaderText`, `bodyText`, `divider`.

### String.jsx
- Export `AppStrings` with UI strings: `APP_NAME`, `LOGIN`, `LOGOUT`, `HOME`, `PROFILE`, `SETTINGS`, `NOTIFICATIONS`, `USERNAME`, `PASSWORD`, `EMAIL`, `SUBMIT`, `CANCEL`, `OK`, `YES`, `NO`, `LOADING`, `ERROR`, `SUCCESS`, `NO_INTERNET`, `SESSION_EXPIRED`, `SOMETHING_WENT_WRONG`.
- Export `ReduxKeys` with: `USER`, `IS_DARK_THEME`, `IS_USER_LOGGED_IN`, `USER_NAME`, `USER_ID`, `USER_EMAIL`, `USER_PROFILE_IMAGE`, `ACCESS_TOKEN`, `REFRESH_TOKEN`, `FIREBASE_TOKEN`, `IS_PROFILE_VERIFIED`, `IS_BIOMETRIC_ENABLE`, `IS_NOTIFICATION_ENABLE`.

### Url.jsx
- Export `BaseUrl` as a configurable base URL string.
- Export `Endpoints` object with: `LOGIN`, `REGISTER`, `PROFILE`, `REFRESH_TOKEN`, `LOGOUT`, `HOME_DATA`, `NOTIFICATIONS`, `UPDATE_PROFILE`.

### Util.jsx
- See detailed instructions in [resources/common/Util.jsx.md](resources/common/Util.jsx.md).
- Must include: `useBottomInset()`, `useTopInset()`, `_saveAsyncStorage()`, `_getAsyncStorage()`, `_checkReachability()`, `_callAPI()` with auto 401 refresh, `refreshAccessToken()`, `getFromRedux()`, `saveToRedux()`, `resetRedux()`.
- Use `axios` for HTTP.
- Use `store.getState()` and `store.dispatch()` directly.

---

## Step 6: Generate Redux Files

All files go in `src/Redux/`. Use templates in [resources/redux/](resources/redux/).

### Store.jsx
- Use `configureStore` from `@reduxjs/toolkit`.
- Use `redux-persist` with `AsyncStorage`.
- Persist only the `user` slice.
- Disable `serializableCheck` in middleware.
- Export `store` and `persistor`.

### UserSlice.jsx
**State fields:**
`isDarkTheme`, `isUserLoggedIn`, `userName`, `userId`, `userEmail`, `userProfileImage`, `accessToken`, `refreshToken`, `firebaseToken`, `isProfileVerified`, `isBioMatricEnable`, `isNotificationEnable`

**Reducers:**
`setIsDarkTheme`, `setIsUserLoggedIn`, `setIsBioMatricEnable`, `setIsNotificationEnable`, `setUserName`, `setUserId`, `setUserEmail`, `setUserProfileImage`, `setIsProfileVerified`, `setAccessToken`, `setRefreshToken`, `setFirebaseToken`, `resetUser` (keep firebaseToken), `resetUserKeepLoginTheme` (keep theme + biometrics + firebaseToken)

Export all actions and the reducer as default.

---

## Step 7: Generate Custom Components

All files go in `src/components/`. Use templates in [resources/components/](resources/components/).

### CustomButton.jsx
- Props: `title`, `onPress`, `style`, `textStyle`, `disabled`, `loading`, `type` (primary/secondary/outline)
- Use `Colors` from common
- Show `CustomLoader` when loading
- Animated press feedback

### CustomInput.jsx
- Props: `label`, `value`, `onChangeText`, `placeholder`, `secureTextEntry`, `keyboardType`, `error`, `editable`, `maxLength`, `style`, `leftIcon`, `rightIcon`, `onRightIconPress`
- Use `Colors` from common
- Toggle password visibility
- Error state display

### CustomLoader.jsx
- Props: `visible`, `size`, `color`, `overlay`
- Full-screen overlay option
- Use `Colors` from common

### CustomDialog.jsx
- Props: `visible`, `title`, `message`, `onConfirm`, `onCancel`, `confirmText`, `cancelText`, `type` (alert/confirm)
- Modal-based
- Use `Colors` and `AppStrings`

---

## Step 8: Generate Navigation

All files go in `src/navigation/`. Use templates in [resources/navigation/](resources/navigation/).

### StackNavigator.jsx
- Contains stack screens (Login, Details, etc.)
- Route names from `Route_Strings`
- Use `createStackNavigator`

### DrawerNavigator.jsx
- Contains drawer screens (Home, Profile, Settings)
- Custom drawer content component with user info header
- Route names from `Route_Strings`
- Use `createDrawerNavigator`

### BottomNavigator.jsx
- Contains bottom tab screens (Home, Notifications, Profile)
- Route names from `Route_Strings`
- Use `createBottomTabNavigator`
- Use `react-native-vector-icons` for tab icons

### AppNavigator.js
- Wrap everything in `NavigationContainer`
- Structure: Conditional rendering based on auth state
  - If not logged in → StackNavigator (Login)
  - If logged in → DrawerNavigator (containing BottomNavigator as a screen)
- DrawerNavigator, BottomNavigator, and StackNavigator are separate, modular navigators

---

## Step 9: Generate Sample Screens

### LoginScreen.jsx (`src/screens/StackScreens/`)
- Functional component with hooks
- Username + password fields using `CustomInput`
- Login button using `CustomButton`
- Show `CustomLoader` during API call
- Use `_callAPI` from Util
- Dispatch Redux actions on success
- Navigate to Home on success
- Show `CustomDialog` on error
- No hardcoded strings/colors

### HomeScreen.jsx (`src/screens/DrawerScreens/`)
- Functional component
- Display welcome message with userName from Redux
- Show sample data or hello message
- Use `CustomButton` for actions
- Use common values only

### CustomDrawerContent.jsx (`src/screens/DrawerScreens/`)
- Custom drawer with user profile header section
- Display `userName`, `userEmail`, `userProfileImage` from Redux
- Logout button that dispatches `resetUser` and navigates to Login
- Styled with `Colors` and `SharedStyles`

---

## Step 10: Update App.jsx

The root `App.jsx` (in project root) must:

```jsx
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/Store';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
```

---

## Step 11: Verify

```bash
npx react-native run-android
# or
npx react-native run-ios
```

Check:
- [ ] App launches without crash
- [ ] Login screen renders correctly
- [ ] Navigation flows work (Login → Home → Drawer → Bottom Tabs)
- [ ] Redux state persists across app restarts
- [ ] No console errors or warnings

---

## Resources

- [Common file templates](resources/common/)
- [Redux templates](resources/redux/)
- [Component templates](resources/components/)
- [Navigation templates](resources/navigation/)
- [Screen templates](resources/screens/)
