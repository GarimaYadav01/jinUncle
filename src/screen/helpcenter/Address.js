import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../compontent/Header";
const Address = () => {
    return (
        <SafeAreaView>
            <Header title={"Manage Addresses"} />
            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20, marginHorizontal: 16, marginTop: 10 }}>
                <Image source={require("../../assets/logo/plus.png")} resizeMode="contain" style={{ width: 50, height: 50 }} />
                <Text style={style.text}>
                    Add another address
                </Text>
            </View>
        </SafeAreaView>

    )
}
export default Address;

const style = StyleSheet.create({

    text: {
        fontSize: 16,
        color: "#000",
        fontFamily: "Roboto-Regular"
    }

})