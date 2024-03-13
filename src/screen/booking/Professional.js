import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")
const Professional = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Does Urban Company charge any cancellation fee?</Text>

                    <Text style={styles.sectionText}>Cancellation fee is charged only if a professional is assigned on your booking and the time of cancellation is closer to your booking time. This is done to fairly compensate our professionals for their time and the cost of travel while travelling to your place .</Text>

                    <Text style={styles.sectionText}>Exact cancellation amount will be shown while you proceed with a cancellation request.</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginTop: height * 0.04 }}>
                    <View>
                        <Text style={[styles.text2, { fontSize: 20, color: "gray" }]}>Was this article helpful ?</Text>
                    </View>
                    <View style={{ flexDirection: "row", columnGap: 10 }}>


                        <TouchableOpacity
                        >
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
export default Professional;

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