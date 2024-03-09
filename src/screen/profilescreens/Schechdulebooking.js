import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")

const Schechdulebooking = () => {
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