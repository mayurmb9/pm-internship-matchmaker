import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route_Strings} from '../common/Routes';
import LoginScreen from '../screens/StackScreens/LoginScreen';

const Stack = createStackNavigator();

// Placeholder screens — replace with actual implementations
const OtpVerifyScreen = () => null;
const RegisterScreen = () => null;

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
      <Stack.Screen
        name={Route_Strings.OTP_VERIFY}
        component={OtpVerifyScreen}
      />
      <Stack.Screen
        name={Route_Strings.REGISTER}
        component={RegisterScreen}
      />
      {/* Add more auth-flow screens here */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
