import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import { ICONS } from "../../assets/themes";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen")
const Helpcenter = () => {
    const navigation = useNavigation();
    const buttonData = [
        {
            id: "1",
            lable: "Account",
            image: ICONS.arrow,
            screen: "Account",
            icon: ICONS.user
        },
        {
            id: "2",
            lable: "Getting started with jinnuncle",
            image: ICONS.arrow,
            screen: "Helpcenter",
            icon: ICONS.support

        },
        {
            id: "3",
            lable: "Payment & UC creadits",
            image: ICONS.arrow,
            screen: "Wallet",
            icon: ICONS.income
        },
        {
            id: "4",
            lable: "JinnUncle Plus membership",
            image: ICONS.arrow,
            screen: "Mybooking",
            icon: ICONS.premium
        },
        {
            id: "5",
            lable: "JU Safety",
            image: ICONS.arrow,
            screen: "Mybooking",
            icon: ICONS.safety
        },
        {
            id: "5",
            lable: "Warranty",
            image: ICONS.arrow,
            screen: "Mybooking",
            icon: ICONS.warranty
        },
    ]
    const handleMenuItemPress = (screen) => {
        // Navigate to the specified screen
        navigation.navigate(screen);
    };
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Header title={"Help & Support"} />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.Header}>How can we help you ?</Text>
                    <View style={{ marginTop: 20, backgroundColor: "#fff", width: width }}>
                        <View style={styles.container1}>
                            {buttonData.map((button, index) => (
                                <TouchableOpacity key={button.id} style={styles.buttonContainer} onPress={() => handleMenuItemPress(button.screen)}>
                                    <View style={{ flexDirection: "row", columnGap: 10, alignItems: "center", }}>
                                        <Image source={button.icon} style={styles.icon} />
                                        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", justifyContent: "space-between" }}>
                                            <Text style={styles.label}>{button.lable}</Text>
                                            <Image source={button.image} style={styles.icon1} />
                                        </View>

                                    </View>

                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>

    )
};

export default Helpcenter;
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
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 20,
    },
    Header: {
        fontSize: 25,
        fontFamily: "Roboto-Bold",
        color: "black",
        // textAlign:"center",
        fontWeight: "500",
        marginHorizontal: 25,
        marginTop: 20
    },
    all: {
        fontFamily: "Roboto-Medium",
        fontSize: 20,
        color: "#000",
        marginHorizontal: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        // backgroundColor: "#FFF",
        justifyContent: "space-between",
        paddingHorizontal: 20

    },
    label: {
        fontSize: 20,
        // marginRight:width*0.2,
        color: "#000",
        fontFamily: "Roboto-Regular"
    },
    icon: {
        width: 20,
        height: 20,
    },
    icon1: {
        width: 20,
        height: 20,

    }
});