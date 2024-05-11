// Bottomnavigation.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screen/home/ProfileScreen';
import SettingsScreen from '../screen/home/SettingsScreen';
import { Dimensions, Image } from 'react-native';
import HomeScreen from '../screen/home/HomeScreen';
import Notification from '../screen/tab/Notification';
import Addcard from '../screen/tab/Addcard';
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
                        iconName = focused ? require('../assets/bottomnavigatiomnimage/homeactive2.png') : require('../assets/bottomnavigatiomnimage/home.png');
                    } else if (route.name === 'Services') {
                        iconName = focused ? require('../assets/bottomnavigatiomnimage/categoriesactive.png') : require('../assets/bottomnavigatiomnimage/categories.png');

                    } else if (route.name === 'Account') {
                        iconName = focused ? require('../assets/bottomnavigatiomnimage/user5.png') : require('../assets/bottomnavigatiomnimage/user4.png');
                    }
                    else if (route.name === 'Notification') {
                        iconName = focused ? require('../assets/bottomnavigatiomnimage/bellactive.png') : require('../assets/bottomnavigatiomnimage/bell.png');
                    }
                    else if (route.name === 'Addcard') {
                        iconName = focused ? require('../assets/bottomnavigatiomnimage/checkout1.png') : require('../assets/bottomnavigatiomnimage/checkout.png');
                    }
                    return <Image source={iconName} style={{ width: 30, height: 30 }} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Services" component={SettingsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
            <Tab.Screen name="Account" component={ProfileScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Addcard" component={Addcard} options={{ headerShown: false }} />

        </Tab.Navigator>
    );
};

export default Bottomnavigation;



