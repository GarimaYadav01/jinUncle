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

                tabBarActiveTintColor: '#0088CC',
                tabBarStyle: {
                    height: height * 0.08,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? require('../assets/logo/Group24.png') : require('../assets/logo/Group24.png');
                    } else if (route.name === 'ProfileScreen') {
                        iconName = focused ? require('../assets/Newicon/addactive.png') : require('../assets/Newicon/add.png');
                    } else if (route.name === 'Settings') {
                        iconName = focused ? require('../assets/Newicon/brandsactive.png') : require('../assets/Newicon/brands.png');
                    } else if (route.name === 'profile') {
                        iconName = focused ? require('../assets/Newicon/flashactive.png') : require('../assets/Newicon/flash.png');
                    } else if (route.name === 'garimayadav') {
                        iconName = focused ? require('../assets/Newicon/useractive.png') : require('../assets/Newicon/user.png');
                    }

                    return <Image source={iconName} style={{ width: 35, height: 35 }} />;
                },
            })}



        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="profile" component={Profile} options={{ headerShown: false }} />
            <Tab.Screen name="garimayadav" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default Bottomnavigation;



