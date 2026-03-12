import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Route_Strings} from '../common/Routes';
import Colors from '../common/Color';
import BottomNavigator from './BottomNavigator';
import CustomDrawerContent from '../screens/DrawerScreens/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
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
      <Drawer.Screen
        name={Route_Strings.BOTTOM_TAB}
        component={BottomNavigator}
        options={{
          drawerLabel: 'Home',
        }}
      />
      {/* Add more drawer screens here */}
      {/* <Drawer.Screen name={Route_Strings.SETTINGS} component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
