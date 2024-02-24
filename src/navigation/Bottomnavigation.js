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

                tabBarActiveTintColor: '#004E8C',
                tabBarStyle: {
                    height: height * 0.08,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    backgroundColor: "#FFF",
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? require('../assets/bottomnavigatiomnimage/homeactive.png') : require('../assets/bottomnavigatiomnimage/home.png');
                    } else if (route.name === 'Services') {
                        iconName = focused ? require('../assets/bottomnavigatiomnimage/serviceactive.png') : require('../assets/bottomnavigatiomnimage/service.png');

                    } else if (route.name === 'garimayadav') {
                        iconName = focused ? require('../assets/bottomnavigatiomnimage/useractive.png') : require('../assets/bottomnavigatiomnimage/user.png');
                    }
                    return <Image source={iconName} style={{ width: 40, height: 40 }} />;
                },
            })}
        >

            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Services" component={SettingsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="garimayadav" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default Bottomnavigation;



