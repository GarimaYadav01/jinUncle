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

            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default Navigation;
