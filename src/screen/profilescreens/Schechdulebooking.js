import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../compontent/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { bookingapi } from "../../apiconfig/Apiconfig";
const { height, width } = Dimensions.get("screen")

const Schechdulebooking = () => {
    const [isgetmybooking, setIsgetmybooking] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handlegetschechdulebooking = async () => {
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
            console.log("error:--------->", error);
        }
    }




    useEffect(() => {
        handlegetschechdulebooking();
    }, [])
    return (
        <SafeAreaView>
            <Header title={"Scheduled Bookings"} />
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: height * 0.2 }}>
                <Text style={styles.text}>No Book any Scheduled</Text>
            </View>
        </SafeAreaView>

    );
};

export default Schechdulebooking;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontStyle: "normal",
        fontFamily: "Roboto-Bold",
        color: "black"
    }

})