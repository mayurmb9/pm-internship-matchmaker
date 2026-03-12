# PM Internship Matchmaker 🇮🇳

**AI-Based Internship Recommendation Engine for PM Internship Scheme (SIH 2025)**

A high-performance, cloud-synced React Native application designed to help rural, tribal, and urban-slum youth find 3-5 highly relevant internship opportunities using a weighted AI matching algorithm.

## 🚀 Key Features

- **AI Recommendation Engine**: Weighted matching algorithm (Location 50%, Skills 30%, Interests 20%) fetching live data from Supabase.
- **Cloud Authentication**: Secure mobile OTP-based login powered by Supabase Auth.
- **Dynamic Profile Sync**: Seamless bidirectional synchronization of personal and educational data between the app and the cloud.
- **Government Theme**: High-contrast UI using Navy Blue (#0B3D91) and Saffron (#FF9933) for professional accessibility.
- **Bilingual Support**: Full support for English and Hindi (localized headers, buttons, and labels).
- **Dark Mode**: App-wide theme switching for reduced eye strain.
- **AI Career Coach**: Smart automated guidance for career-related queries.
- **Comprehensive Modules**: Includes Mentorship, Success Stories, Case Bank, Resource Library, and Community Forums.

## 🛠 Tech Stack

- **Framework**: React Native CLI (Bare Workflow)
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **State Management**: Redux Toolkit with Redux Persist
- **Navigation**: React Navigation (Drawer, Bottom Tabs, Stack)
- **Icons**: FontAwesome (react-native-vector-icons)
- **Safe Area**: react-native-safe-area-context for all-device compatibility

## 📸 Screen Overview

1.  **Dashboard**: Personalized "Top 3-5 Suggestions" with match percentage and profile completion reminders.
2.  **Internship List**: Advanced filtering by sector (Finance, Engineering, Digital, etc.) and real-time search.
3.  **Profile Update**: Comprehensive data collection including Aadhaar (Last 4), highest qualification, and passing year.
4.  **Settings**: Functional toggles for Dark Mode, Notifications, and Language.

## 🏗 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mayurmb9/pm-internship-matchmaker.git
   cd pm-internship-matchmaker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Fonts (Android)**:
   Ensure FontAwesome icons are visible by copying fonts to assets:
   ```powershell
   # PowerShell
   Copy-Item -Path 'node_modules/react-native-vector-icons/Fonts/*.ttf' -Destination 'android/app/src/main/assets/fonts/' -Force
   ```

4. **Run the application**:
   ```bash
   npx react-native start --reset-cache
   npx react-native run-android
   ```

## 📜 Project Structure

```
PMInternship/
├── src/
│   ├── common/         # Colors, Strings (i18n), Supabase Config, Utils
│   ├── components/     # Reusable UI (Buttons, Inputs, Dialogs, Loader)
│   ├── data/           # Mock data and local JSON backups
│   ├── logic/          # AI Recommendation Engine (Ranking Algorithm)
│   ├── navigation/     # AppNavigator, Drawer, BottomTab, Stack
│   ├── Redux/          # Store and UserSlice (Auth/Profile State)
│   └── screens/        # All 15+ functional screens
└── android/            # Native Android configuration
```

## 🏛 SIH 2025 Mission
This project aims to bridge the digital literacy gap for Indian youth, providing a simplified, localized, and effective portal to enter the professional workforce under the Prime Minister's Internship Scheme.

---
**Developed by Mayur Borse**
