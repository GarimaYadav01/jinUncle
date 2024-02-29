import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")
const Book = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Can i re-book the same professional if i like their serivce</Text>

                    <Text style={styles.sectionText}>Yes.if you rate their serivce with five stars,you will get an option to re-book with the same professional the next time you book. Click on their profile and secure their slots.</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginTop: height * 0.04 }}>
                    <View>
                        <Text style={[styles.text2, { fontSize: 20 }]}>Was this article helpful ?</Text>
                    </View>
                    <View style={{flexDirection:"row" ,columnGap:10}}>


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
export default Book;

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
        lineHeight:22,
        fontFamily:"Roboto-Regular"
    },
});