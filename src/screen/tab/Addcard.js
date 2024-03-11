import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")

const Addcard = () => {
    return (
        <SafeAreaView>
            <Header title={"Add to card"} />
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: height * 0.2 }}>
                <Text style={styles.text}>No Data Found</Text>
            </View>
        </SafeAreaView>

    )
}

export default Addcard;

const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto-Bold",
        fontSize: 20,
        color: "black"
    }
})