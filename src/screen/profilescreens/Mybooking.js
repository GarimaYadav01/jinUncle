import React, { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../compontent/Header";
import { bookingapi } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("screen")
const Mybooking = () => {
    const [isgetmybooking, setIsgetmybooking] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getmybooking = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(bookingapi, requestOptions);
            const result = await response.json();
            console.log("response---response->", result);
        } catch (error) {
            console.log("error:", error);
        }
    }


    useEffect(() => {
        getmybooking();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Header title={"My Booking"} />
            <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: height * 0.2 }}>
                <Image source={require("../../assets/logo/preview.gif")} resizeMode="contain" style={{ width: 200, height: 200 }} />
                <Text style={styles.text}>
                    No Data found
                </Text>
            </View>
        </SafeAreaView>

    )
}
export default Mybooking;
const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto-Bold",
        fontSize: 25
    }
});