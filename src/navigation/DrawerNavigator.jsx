import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Route_Strings} from '../common/Routes';
import {getColors} from '../common/Color';
import {useSelector} from 'react-redux';
import BottomNavigator from './BottomNavigator';
import CustomDrawerContent from '../screens/DrawerScreens/CustomDrawerContent';
import ProfileUpdateScreen from '../screens/DrawerScreens/ProfileUpdateScreen';
import InternshipDetailsScreen from '../screens/StackScreens/InternshipDetailsScreen';
import RoleScreen from '../screens/StackScreens/RoleScreen';
import SettingsScreen from '../screens/DrawerScreens/SettingsScreen';
import CommunityForumsScreen from '../screens/DrawerScreens/CommunityForumsScreen';
import ResourceLibraryScreen from '../screens/DrawerScreens/ResourceLibraryScreen';
import CaseBankScreen from '../screens/DrawerScreens/CaseBankScreen';
import AICareerCoachScreen from '../screens/AICareerCoachScreen';
import CaseStudiesScreen from '../screens/CaseStudiesScreen';
import MentorshipScreen from '../screens/MentorshipScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const isDarkTheme = useSelector(state => state.user.isDarkTheme);
  const Colors = getColors(isDarkTheme);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.primary + '15',
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.textSecondary,
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '500',
          marginLeft: -10,
        },
        drawerStyle: {
          backgroundColor: Colors.surface,
          width: 280,
        },
      }}>
      {/* Main tab navigator screens */}
      <Drawer.Screen
        name={Route_Strings.BOTTOM_TAB}
        component={BottomNavigator}
      />

      {/* Linked Screens */}
      <Drawer.Screen
        name={Route_Strings.AI_CAREER_COACH}
        component={AICareerCoachScreen}
        options={{ drawerItemStyle: {display: 'none'} }}
      />
      <Drawer.Screen
        name={Route_Strings.MENTORSHIP}
        component={MentorshipScreen}
        options={{ drawerItemStyle: {display: 'none'} }}
      />
      <Drawer.Screen
        name="CaseStudies"
        component={CaseStudiesScreen}
        options={{ drawerItemStyle: {display: 'none'} }}
      />

      {/* Hidden Utility Screens */}
      <Drawer.Screen
        name={Route_Strings.PROFILE_UPDATE}
        component={ProfileUpdateScreen}
        options={{ drawerItemStyle: {display: 'none'} }}
      />
      <Drawer.Screen
        name={Route_Strings.INTERNSHIP_DETAILS}
        component={InternshipDetailsScreen}
        options={{ drawerItemStyle: {display: 'none'} }}
      />
      <Drawer.Screen
        name={Route_Strings.SETTINGS}
        component={SettingsScreen}
        options={{ drawerItemStyle: {display: 'none'} }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
