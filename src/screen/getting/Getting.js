import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header2 from "../../compontent/Header2";
import Header from "../../compontent/Header";
import { ICONS } from "../../assets/themes";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen")
const Getting = (props) => {
    const navigation = useNavigation();
    const data = [
        {
            id: "1",
            name: "How to place a booking",
            icon: ICONS.arrow,
            screen: "Booking"
        },
        {
            id: "2",
            name: "Can i re-book the same professional if i like their serivce?",
            icon: ICONS.arrow,
            screen: "Book"
        },
        {
            id: "3",
            name: "How to book my preferred professional",
            icon: ICONS.arrow,
            screen: "Cancellation"
        },

        {
            id: "5",
            name: "Do i have to order a minimum value of services before i can place the booking",
            icon: ICONS.arrow,
            screen: "Minimum"
        },
        {
            id: "6",
            name: "Does urban company charge any can cancellation fee ?",
            icon: ICONS.arrow,
            screen: "Professional"
        }
    ]
    const handleMenuItemPress = (screen) => {
        // Navigate to the specified screen
        navigation.navigate(screen);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.com}>
                    <Text style={styles.sectionTitle}>Getting started with Ju</Text>
                </View>
                <View style={styles.cons}>
                    <Text style={styles.Text}>About us</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate("Aboutus")}>
                        <Text style={styles.text1}>What is JU Company</Text>
                        <Image source={ICONS.arrow} resizeMode="contain" style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cons}>
                    <Text style={styles.Text}>Bookings</Text>
                    <View style={styles.container1}>
                        {data.map(item => (
                            <View key={item.id} style={styles.item}>
                                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => handleMenuItemPress(item.screen)}>
                                    <Text style={[styles.text1, { width: width * 0.8, paddingBottom: 10, color: "gray" }]}>{item.name}</Text>
                                    <Image source={item.icon} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Getting;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    content: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: "700",
        marginBottom: 10,
        fontFamily: "Roboto-BoldItalic",
        color: "black",
        marginTop: 10
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 20,
    },
    com: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginTop: 10,
        marginHorizontal: 20
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    cons: {
        width: width,
        padding: 10,
        backgroundColor: "#FFF",
        marginTop: height * 0.03
    },
    Text: {
        color: "black",
        fontSize: 18,
        marginHorizontal: 20,
        marginVertical: height * 0.01
    },
    text1: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontStyle: "normal",
        color: "gray"

    },
    container1: {
        flex: 1,
        padding: 20,

    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: "gray",
        marginVertical: height * 0.03,
        justifyContent: "space-between"
    },
    text: {
        fontSize: 16,
        marginRight: 10,
    },
    icon: {
        width: 20,
        height: 20,
    },
});
