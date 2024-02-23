// Bottomnavigation.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from '../screen/home/ProfileScreen';
import SettingsScreen from '../screen/home/SettingsScreen';
import { Dimensions, Image } from 'react-native';
import HomeScreen from '../screen/home/HomeScreen';
import Profile from '../screen/auth/Profile';
import LoginScreen from '../screen/auth/LoginScreen';
const { width, height } = Dimensions.get("screen")
const Tab = createBottomTabNavigator();

const Bottomnavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarActiveTintColor: '#9400d3',
                tabBarStyle: {
                    height: height * 0.08,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: "#000",
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? require('../assets/Newicon/home.png') : require('../assets/Newicon/home.png');
                    } else if (route.name === 'Settings') {
                        iconName = focused ? require('../assets/Newicon/setting.png') : require('../assets/Newicon/setting.png');

                    } else if (route.name === 'garimayadav') {
                        iconName = focused ? require('../assets/Newicon/multiple-users.png') : require('../assets/Newicon/multiple-users.png');
                    }
                    return <Image source={iconName} style={{ width: 40, height: 40 }} />;
                },
            })}
        >

            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="garimayadav" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default Bottomnavigation;



