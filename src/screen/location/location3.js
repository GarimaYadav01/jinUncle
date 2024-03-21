import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../compontent/Custombutton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("screen")
const location2 = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('Bottomnavigation');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    // const [location, setLocation] = useState([]);

    // useEffect(() => {
    //     handleGetlocation();
    // }, [])

    // const handleGetlocation = async () => {
    //     const token = await AsyncStorage.getItem('token');
    //     fetch("https://aduetechnologies.com/jinuncle/api/user/get_current_location", {
    //         method: "GET",
    //         headers: token,
    //         redirect: "follow"
    //     })
    //         .then((response) => {
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 throw new Error('Network response was not ok');
    //             }
    //         }).then((json) => { 
    //             console.log("jdkfdlk---->", json);
    //             // if (json.status == 200) {
    //             //     setIsLoading(false);
    //             //     // showMessage({
    //             //     //     message: 'OTP verified successfully',
    //             //     //     type: 'success',
    //             //     //     icon: 'success'
    //             //     // });
    //             //     navigation.navigate('Location');
    //             // } else {
    //             //     showMessage({
    //             //         message: json.message,
    //             //         type: "warning",
    //             //         icon: "warning"
    //             //     });
    //             //     setIsLoading(false);
    //             // }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });

    // }
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("token", "WlhsS01XTXlWbmxZTW14clNXcHZhVTFVVVdsTVEwcDNXVmhPZW1ReU9YbGFRMGsyU1d0R2EySlhiSFZKVTFFd1RrUlJlVTVFUlhsT1EwWkJTMmxaYkVscGQybGhSemt4WTI1TmFVOXFVVFJNUTBwcldWaFNiRmd6VW5CaVYxVnBUMmxKZVUxRVNUQk1WRUY2VEZSRk1rbEVSWGxQYWswMFQycEZOVWxwZDJsamJUbHpXbE5KTmtscVNXbE1RMHByV2xoYWNGa3lWbVpoVjFGcFQyMDFNV0pIZURrPQ==");
        // myHeaders.append("Cookie", "ci_session=b6d08925c92e304724acee04b2b9f42325c8cd4d");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://aduetechnologies.com/jinuncle/api/user/get_current_location", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }, []);


    return (
        <SafeAreaView style={{ backgroundColor: "#FFF", flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#FFF" }}>
                <View style={{ alignSelf: "center", justifyContent: "center", marginTop: height * 0.3 }}>
                    <Image source={require("../../assets/Newicon/location.png")} style={styles.images} />
                    {/* <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.images} /> */}

                    <Text style={styles.text}>
                        Kirti Shikhar Tower, 1020, 10th floor, Janakpuri District Center, Janakpuri, New Delhi, Delhi 110059
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>

    )
}
export default location2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#FFFFFF"
    },
    img: {
        width: width,
        height: height
    },
    text: {
        fontSize: 20,
        fontStyle: "normal",
        color: "#000",
        textAlign: "center",
        width: width * 0.7,
        marginTop: height * 0.05,
        fontFamily: "Roboto-BoldItalic"
    },
    images: {
        width: 60,
        height: 60,
        alignSelf: "center"
    }
});