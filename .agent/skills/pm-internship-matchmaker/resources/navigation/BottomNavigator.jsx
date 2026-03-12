import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Route_Strings} from '../common/Routes';
import {AppStrings} from '../common/String';
import Colors from '../common/Color';
import DashboardScreen from '../screens/DrawerScreens/DashboardScreen';

const Tab = createBottomTabNavigator();

// Placeholder screens for tabs — replace with actual screens
const InternshipListScreen = () => null;
const NotificationsScreen = () => null;
const ProfileScreen = () => null;

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.divider,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({color, size}) => {
          let iconName;
          switch (route.name) {
            case Route_Strings.DASHBOARD:
              iconName = 'view-dashboard-outline';
              break;
            case Route_Strings.INTERNSHIP_LIST:
              iconName = 'briefcase-outline';
              break;
            case Route_Strings.NOTIFICATIONS:
              iconName = 'bell-outline';
              break;
            case Route_Strings.PROFILE:
              iconName = 'account-circle-outline';
              break;
            default:
              iconName = 'circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name={Route_Strings.DASHBOARD}
        component={DashboardScreen}
        options={{tabBarLabel: AppStrings.DASHBOARD}}
      />
      <Tab.Screen
        name={Route_Strings.INTERNSHIP_LIST}
        component={InternshipListScreen}
        options={{tabBarLabel: AppStrings.INTERNSHIPS}}
      />
      <Tab.Screen
        name={Route_Strings.NOTIFICATIONS}
        component={NotificationsScreen}
        options={{tabBarLabel: AppStrings.NOTIFICATIONS}}
      />
      <Tab.Screen
        name={Route_Strings.PROFILE}
        component={ProfileScreen}
        options={{tabBarLabel: AppStrings.PROFILE}}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
