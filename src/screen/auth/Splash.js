import React, { useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, StatusBar, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");

const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('LoginScreen');
        }, 2000);

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
        resizeMode:"contain"
    },
    img: {
        height: height,
        width: width
    }
});

export default Splash;
