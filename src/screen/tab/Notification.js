import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")

const Notification = () => {
    return (
        <SafeAreaView>
            <Header title={"Notifiacation"} />
            <View style={{ justifyContent: "center", alignItems: "center", marginTop:height*0.2}}>
                <Text style={styles.text}>No Data Found</Text>
            </View>
        </SafeAreaView>

    )
}

export default Notification;

const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto-Bold",
        fontSize: 20,
        color: "black"
    }
})