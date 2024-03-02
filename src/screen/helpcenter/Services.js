import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")
const Services = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Which services are covered under JU warranty ?</Text>

                    <Text style={styles.sectionText}>JU Warranty covers:</Text>
                    <Text style={styles.sectionText}><Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>1.</Text> <Text style={{ color: "black" }}>Appliance repairs</Text>Like AC, RO,Washing machine repairs etc.</Text>
                    <Text style={styles.sectionText}><Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>2.</Text> <Text style={{ color: "black" }}>Pest control</Text> serivces</Text>
                    <Text style={styles.sectionText}><Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>3.</Text><Text style={{ color: "black" }}>Painting</Text> serivces </Text>

                    <View>
                        <Text style={styles.sectionText}>However, the JU warranty <Text>does not</Text> cover:</Text>
                        <Text style={styles.sectionText}><Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>1.</Text> Any new issue that occurs post the service</Text>
                        <Text style={styles.sectionText}><Text style={{ color: "black", fontSize: 20, fontWeight: "500" }}>2.</Text> Any item/service that is not mentioned on the invoice</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginTop: height * 0.04 }}>
                    <View>
                        <Text style={[styles.text2, { fontSize: 20 }]}>Was this article helpful ?</Text>
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
export default Services;

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
        fontFamily: "Roboto-Regular"
    },
});