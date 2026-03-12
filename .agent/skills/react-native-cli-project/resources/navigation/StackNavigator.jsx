import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route_Strings} from '../common/Routes';
import LoginScreen from '../screens/StackScreens/LoginScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({current}) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}>
      <Stack.Screen
        name={Route_Strings.LOGIN}
        component={LoginScreen}
      />
      {/* Add more stack screens here */}
      {/* <Stack.Screen name={Route_Strings.DETAILS} component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
