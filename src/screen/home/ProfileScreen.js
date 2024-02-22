import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
const { height, width } = Dimensions.get("screen")

const ProfileScreen = () => {

    const button = [
        {
            id: "1",
            lable: "Basics"
        },
        {
            id: "2",
            lable: "Size Details"
        },
        {
            id: "3",
            lable: "skin & Hair"
        },

    ]

    const card = [
        {
            id: "1",
            lable: "orders"
        },
        {
            id: "2",
            lable: "Insider"
        },
        {
            id: "3",
            lable: "Help Center"
        },
        {
            id: "4",
            lable: "Coupons"
        }
    ]

    const method = [
        {
            id: "1",
            lable: "Payments & Currencies"
        },
        {
            id: "2",
            lable: "Earn & Redeem"
        },
        {
            id: "3",
            lable: "Manage Account"
        },
        {
            id: "4",
            lable: "Challenges"
        },
        {
            id: "5",
            lable: "Wishlist"
        },
        {
            id: "6",
            lable: "Myntra Suggests"
        },
        {
            id: "6",
            lable: "Myntra Suggests"
        },

    ]

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.con}>
                    {/* <StatusBar backgroundColor={"#0088CC"} /> */}
                    <View style={{ justifyContent: "center", alignSelf: "center", marginTop: height * 0.04 }}>
                        <Image source={require("../../assets/logo/logo.png")} />

                        <Image source={require("../../assets/Newicon/useractive.png")} style={styles.img} resizeMode="contain" />
                        <Text style={styles.text}>
                            Garima Yadav
                        </Text>
                        <Text style={styles.text}>
                            garimayadav933@gmail.com
                        </Text>
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
        color: "#000",
        textAlign: "center"
    },
    con: {
        // backgroundColor: "#0088CC",
        // height: height * 0.15,
        width: width,
        alignSelf: "center",
        // borderRadius: 10,
        elevation: 1,
        shadowOpacity: 2,

    },
    container: {
        flexGrow: 1,
        // paddingBottom: 50
    },
    img: {
        height: 150,
        width: 150,
        alignSelf: "center"
    }
});