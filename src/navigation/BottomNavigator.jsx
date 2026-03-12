import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Route_Strings} from '../common/Routes';
import {AppStrings, getStrings} from '../common/String';
import {getColors} from '../common/Color';
import DashboardScreen from '../screens/DrawerScreens/DashboardScreen';
import InternshipListScreen from '../screens/DrawerScreens/InternshipListScreen';
import ProfileScreen from '../screens/DrawerScreens/ProfileScreen';
import ApplicationStatusScreen from '../screens/DrawerScreens/ApplicationStatusScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { isDarkTheme, locale } = useSelector((state) => state.user);
  const Colors = getColors(isDarkTheme);
  const Strings = getStrings(locale);
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: isDarkTheme ? Colors.secondary : Colors.primary,
        tabBarInactiveTintColor: Colors.grey,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.divider,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom - 5 : 10,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginBottom: 4,
        },
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          switch (route.name) {
            case Route_Strings.DASHBOARD:
              iconName = 'dashboard';
              break;
            case Route_Strings.INTERNSHIP_LIST:
              iconName = 'briefcase';
              break;
            case Route_Strings.APPLICATION_STATUS:
              iconName = 'list-alt';
              break;
            case Route_Strings.PROFILE:
              iconName = 'user';
              break;
            default:
              iconName = 'circle';
          }
          return <Icon name={iconName} size={20} color={color} />;
        },
      })}>
      <Tab.Screen
        name={Route_Strings.DASHBOARD}
        component={DashboardScreen}
        options={{tabBarLabel: Strings.DASHBOARD}}
      />
      <Tab.Screen
        name={Route_Strings.INTERNSHIP_LIST}
        component={InternshipListScreen}
        options={{tabBarLabel: locale === 'hi' ? 'इंटर्नशिप' : 'Internships'}}
      />
      <Tab.Screen
        name={Route_Strings.APPLICATION_STATUS}
        component={ApplicationStatusScreen}
        options={{tabBarLabel: locale === 'hi' ? 'आवेदन' : 'Applied'}}
      />
      <Tab.Screen
        name={Route_Strings.PROFILE}
        component={ProfileScreen}
        options={{tabBarLabel: Strings.PROFILE}}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
