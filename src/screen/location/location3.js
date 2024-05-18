import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../compontent/Custombutton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import { getaddress } from "../../apiconfig/Apiconfig";
import LoaderScreen from "../../compontent/LoaderScreen";
const { width, height } = Dimensions.get("screen")
const Location3 = () => {
    const { handleGetlocation, location, handlegetaddress, isaddress } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    // const [isaddress, setIsaddress] = useState([]);
    // console.log("location---->", location)
    // console.log("isaddress----isaddress->", isaddress)
    const navigation = useNavigation();

    useEffect(() => {
        const handleFocus = () => {
            handleGetlocation();
            handlegetaddress();
        };
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);
        return unsubscribeFocus;
    }, []);
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('Bottomnavigation');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigation]);




    // const handlegetaddress = async () => {
    //     try {
    //         setIsLoading(true);
    //         const token = await AsyncStorage.getItem('token');
    //         const myHeaders = new Headers();
    //         myHeaders.append("token", token);
    //         myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
    //         const requestOptions = {
    //             method: "GET",
    //             headers: myHeaders,
    //             redirect: "follow"
    //         };
    //         const response = await fetch(getaddress, requestOptions);
    //         console.log("Response:", response);
    //         const result = await response.text();
    //         console.log("Response dghdhd--result:", result);
    //         // Check if response is HTML or JSON
    //         if (response.ok) {
    //             try {
    //                 const jsonData = JSON.parse(result);
    //                 setIsaddress(jsonData.data);
    //                 setIsLoading(false);
    //                 console.log("Parsed JSON jkkjkjk data:", jsonData);
    //             } catch (error) {
    //                 console.log("Error parsing JSON:", error);
    //             }
    //         } else {
    //             console.log("Non-JSON response:", result);
    //         }
    //     } catch (error) {
    //         console.log("Error:", error);
    //         setIsLoading(false);
    //     }
    // }
    return (
        <SafeAreaView style={{ backgroundColor: "#FFF", flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#FFF" }}>
                <View style={{ alignSelf: "center", justifyContent: "center", marginTop: height * 0.3 }}>
                    <Image source={require("../../assets/Newicon/location.png")} style={styles.images} />
                    {/* <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.images} /> */}
                    <Text style={styles.text}>
                        {/* Kirti Shikhar Tower, 1020, 10th floor, Janakpuri District Center, Janakpuri, New Delhi, Delhi 110059 */}
                        {location}
                    </Text>
                </View>
            </ScrollView>
            {isLoading && <LoaderScreen isLoading={isLoading} />}
        </SafeAreaView>
    )
}
export default Location3;

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