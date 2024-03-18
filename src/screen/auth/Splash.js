import React, { useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("screen");

const Splash = () => {

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token !== null; // Return true if token exists, false otherwise
        } catch (error) {
            console.error('Error retrieving token:', error);
            return false; // Return false in case of error
        }
    };
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const tokenExists = await getToken();
            if (tokenExists) {
                navigation.replace('Bottomnavigation');
            } else {
                navigation.replace('LoginScreen');
            }
        };
        const timeout = setTimeout(checkToken, 2000);
        return () => clearTimeout(timeout);
    }, [navigation]);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#FFF"} translucent />
            <View style={styles.container}>
                {/* Your other components */}
                <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.logo} resizeMode='contain' />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF"
    },
    logo: {
        width: width * 0.8,
        height: height * 0.4,
        resizeMode: "contain"
    },
    img: {
        height: height,
        width: width
    }
});

export default Splash;
