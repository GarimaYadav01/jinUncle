import React from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")
const Mybooking = () => {
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