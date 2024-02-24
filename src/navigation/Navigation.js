import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bottomnavigation from './Bottomnavigation';
import Splash from '../screen/auth/Splash';
import LoginScreen from '../screen/auth/LoginScreen';
import ForgetPassword from '../screen/auth/ForgetPassword';
import Otp from '../screen/auth/Otp';
import SignupScreen from '../screen/auth/SignupScreen';
import Resetpassword from '../screen/auth/Resetpassword';
import Location from '../screen/location/Location';
import location2 from '../screen/location/location2';
import Location3 from '../screen/location/location3';
import Mybooking from '../screen/profilescreens/Mybooking';
import Aboutus from '../screen/profilescreens/Aboutus';
import Helpcenter from '../screen/profilescreens/Helpcenter';
import Account from '../screen/helpcenter/Account';
import phonenumber from '../screen/helpcenter/Phonenumber';
import Editprofile from '../screen/helpcenter/Editprofile';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Bottomnavigation" component={Bottomnavigation} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="Resetpassword" component={Resetpassword} />
                <Stack.Screen name="Location" component={Location} />
                <Stack.Screen name="Location2" component={location2} />
                <Stack.Screen name="Location3" component={Location3} />
                <Stack.Screen name="Mybooking" component={Mybooking} />
                <Stack.Screen name="Aboutus" component={Aboutus} />
                <Stack.Screen name="Helpcenter" component={Helpcenter} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="phonenumber" component={phonenumber} />
                <Stack.Screen name="Editprofile" component={Editprofile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default Navigation;
