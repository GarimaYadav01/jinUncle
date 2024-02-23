import React from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../assets/themes";
import CustomButton from "../../compontent/Custombutton";
const { height, width } = Dimensions.get("screen")

const ProfileScreen = () => {

    const buttonData = [
        {
            id: "1",
            lable: "My bookings",
            image: ICONS.arrow,
            // icon:require("")
        },
        {
            id: "2",
            lable: "Help center",
            image: ICONS.arrow
        },
        {
            id: "3",
            lable: "Wallet",
            image: ICONS.arrow
        },
        {
            id: "4",
            lable: "Plus membership",
            image: ICONS.arrow
        },
        {
            id: "5",
            lable: "My rating",
            image: ICONS.arrow
        },
        {
            id: "3",
            lable: "Manage addresses",
            image: ICONS.arrow
        },
        {
            id: "3",
            lable: "Manage payment methods",
            image: ICONS.arrow
        },
        {
            id: "3",
            lable: "Settings",
            image: ICONS.arrow
        },
        {
            id: "3",
            lable: "Scheduled bookings",
            image: ICONS.arrow
        },
        {
            id: "4",
            lable: "About UC",
            image: ICONS.arrow
        },
        {
            id: "5",
            lable: "Logout",
            image: ICONS.arrow
        },
    ]
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView style={styles.container}>
                <View style={styles.con}>
                    <View style={{
                        marginTop: height * 0.05, marginLeft: width * 0.07
                    }}>
                        <Text style={[styles.text, { fontSize: 25 }]}>
                            Verified customer
                        </Text>
                        <Text style={styles.text}>
                            +91 7364778488
                        </Text>

                    </View>
                    <TouchableOpacity style={{ marginTop: height * 0.05, marginRight: width * 0.1 }}>
                        <Image source={require("../../assets/Newicon/edit.png")} style={{ width: 40, height: 40 }} />

                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.container1}>
                        {buttonData.map(button => (
                            <TouchableOpacity key={button.id} style={styles.buttonContainer}>
                                <Text style={styles.label}>{button.lable}</Text>
                                <Image source={button.image} style={styles.icon} />
                            </TouchableOpacity>
                        ))}
                    </View>
             
                </View>
            </ScrollView>

        </SafeAreaView>

    )
}
export default ProfileScreen;
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "#FFF",
        // textAlign: "center"
    },
    con: {
        backgroundColor: "#000",
        // height: height * 0.15,
        width: width,
        alignSelf: "center",
        // borderRadius: 10,
        elevation: 1,
        shadowOpacity: 2,
        height: height * 0.15,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#f5fffa"

    },
    container: {
        flexGrow: 1,
        // paddingBottom: 50
    },
    img: {
        height: 150,
        width: 150,
        alignSelf: "center"
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
        marginRight: 10,
        color: "#000"
    },
    icon: {
        width: 20,
        height: 20,
    },
    // container1: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   },
});