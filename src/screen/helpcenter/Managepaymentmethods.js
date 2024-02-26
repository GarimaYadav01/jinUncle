import React from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")

const Managepaymentmethods = () => {
    return (
        <SafeAreaView>
            <Header title={"Manage payment methods"} />
            <View style={styles.con}>
                <Text style={styles.text}>We will debit to verify a new payment instrument this will be refunded after verification.</Text>
                <View style={styles.container}>
                    <Text>
                        Debit or Credit card
                    </Text>
                    <TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, }}>
                            <Image source={require("../../assets/Newicon/atm-card.png")} style={{ width: 30, height: 30 }} resizeMode="contain" />
                            <Text style={styles.text}>Add a card</Text>
                            <Image source={require("../../assets/Icon/chevronright.png")} style={{ width: 20, height: 20, marginLeft: width * 0.4 }} resizeMode="contain" />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>

    );
}
export default Managepaymentmethods;
const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto-Bold",
        fontStyle: "normal",
        fontSize: 16,
        color: "black",
        fontWeight: "500",
        marginLeft: 20
    },
    con: {
        marginTop: 30,
        marginHorizontal: 20,

    },
    container: {
        backgroundColor: "#FFF",
        marginTop: 20,
        height: height * 0.1,
        justifyContent: "center",
        paddingLeft: width * 0.07,
        borderRadius: 10

    }

})