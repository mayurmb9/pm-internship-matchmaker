import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../common/Color';

import HomeScreen from '../screens/DrawerScreens/HomeScreen';
import AICareerCoachScreen from '../screens/AICareerCoachScreen';
import CaseStudiesScreen from '../screens/CaseStudiesScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Dashboard') iconName = 'view-dashboard';
                    else if (route.name === 'Coach') iconName = 'robot';
                    else if (route.name === 'Cases') iconName = 'briefcase-search';

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 10,
                    borderTopWidth: 0,
                    elevation: 10,
                }
            })}
        >
            <Tab.Screen name="Dashboard" component={HomeScreen} />
            <Tab.Screen name="Coach" component={AICareerCoachScreen} />
            <Tab.Screen name="Cases" component={CaseStudiesScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
