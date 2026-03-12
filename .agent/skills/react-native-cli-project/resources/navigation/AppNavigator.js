import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import StackNavigator from './StackNavigator';
import DrawerNavigator from './DrawerNavigator';

const AppNavigator = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);

  return (
    <NavigationContainer>
      {isUserLoggedIn ? <DrawerNavigator /> : <StackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
