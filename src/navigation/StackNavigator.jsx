import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route_Strings} from '../common/Routes';
import LoginScreen from '../screens/StackScreens/LoginScreen';
import OtpVerifyScreen from '../screens/StackScreens/OtpVerifyScreen';
import InternshipDetailsScreen from '../screens/StackScreens/InternshipDetailsScreen';

const Stack = createStackNavigator();

// Placeholder screens — replace with actual implementations
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
      <Stack.Screen
        name={Route_Strings.INTERNSHIP_DETAILS}
        component={InternshipDetailsScreen}
      />
      {/* Add more auth-flow screens here */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
