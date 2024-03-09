import React from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import CardListComponent from "../tab/CardListComponent";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen")

const Subcategory = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={"Subcategory"} />
            <ScrollView style={{ flex: 1, paddingBottom: 50, marginTop: height * 0.04 }} showsVerticalScrollIndicator={false}>
                <CardListComponent />
                <View style={styles.paymentcard}>
                    <Text style={styles.text}>₹549</Text>
                    <TouchableOpacity style={styles.smallbutton} onPress={() => navigation.navigate("Summary")}>
                        <Text style={styles.textbut}>View card</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Subcategory;
const styles = StyleSheet.create({
    paymentcard: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: "#FFFF",
        padding: 15,
        alignContent: "center"
    },
    text: {
        fontSize: 27,
        color: "#000",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic"
    },
    smallbutton: {
        height: height * 0.04,
        width: width * 0.3,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#004E8C",
        borderColor: "#004E8C",
        // marginTop: height * 0.01
    },
    textbut: {
        textAlign: "center",
        color: "white"
    },
})