import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")
const Unable = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>I am unable to make payment</Text>

                    <Text style={styles.sectionText}>Note: Simpl and Lazypay are temporarily facing high error rates. We request you to use a different payment methof for now. Our team is working to fix this.</Text>
                    <Text style={styles.sectionText}><Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>*</Text>  Select a different payment mode than the one you're trying with (e.g. try using your debit card instead of UPI).</Text>
                    <Text style={styles.sectionText}><Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>*</Text>  If switching payment mode doesn't work - then select "pay online after serivce" or "pay with cash after serivce". In case paying online,you will be able to pick a mode of your choice after the service ends.</Text>
                    <Text style={styles.sectionText}><Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>*</Text>  If multiple payment options are failing or pay after services is not available-please wait for some time and try placing the booking again.</Text>

                    <Text style={styles.sectionText}>If any <Text style={{ color: "black" }}>amount has been debited and the booking shows "payment failed" - please don't worry.</Text> any debited amount will be credited back to your source account within 7 working days.</Text>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginTop: height * 0.04 }}>
                    <View>
                        <Text style={[styles.text2, { fontSize: 20, color: "gray" }]}>Was this article helpful ?</Text>
                    </View>
                    <View style={{ flexDirection: "row", columnGap: 10 }}>
                        <TouchableOpacity>
                            <Image source={require("../../assets/Newicon/like.png")} resizeMode="contain" style={{ width: 20, height: 20, }} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source={require("../../assets/Newicon/dont-like.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>

    )
}
export default Unable;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: "#FFF"
    },
    content: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        // marginBottom: 10,
        color: "black",
        fontFamily: "Roboto-Medium",
        marginVertical: height * 0.03
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 22,
        fontFamily: "Roboto-Regular",
        color: "gray"
    },
});