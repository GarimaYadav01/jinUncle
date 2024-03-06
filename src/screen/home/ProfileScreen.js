import React, { useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../assets/themes";
import CustomButton from "../../compontent/Custombutton";
import { useNavigation } from "@react-navigation/native";
import LogoutModal from "../../compontent/LogoutModal";
const { height, width } = Dimensions.get("screen")

const ProfileScreen = () => {
    const navigation = useNavigation();
    const buttonData = [
        {
            id: "1",
            lable: "My bookings",
            image: ICONS.arrow,
            screen: "Mybooking"
        },
        {
            id: "2",
            lable: "Help center",
            image: ICONS.arrow,
            screen: "Helpcenter"
        },
        {
            id: "3",
            lable: "Wallet",
            image: ICONS.arrow,
            screen: "MyWallet"
        },
        // {
        //     id: "4",
        //     lable: "Plus membership",
        //     image: ICONS.arrow,
        //     screen: "Mybooking"
        // },
        {
            id: "5",
            lable: "My rating",
            image: ICONS.arrow,
            screen: "Rateing"
        },
        {
            id: "6",
            lable: "Manage addresses",
            image: ICONS.arrow,
            screen: "Address"
        },
        {
            id: "7",
            lable: "Manage payment methods",
            image: ICONS.arrow,
            screen: "Managepaymentmethods"
        },
        {
            id: "8",
            lable: "Settings",
            image: ICONS.arrow,
            screen: "Settings"
        },
        {
            id: "9",
            lable: "Scheduled bookings",
            image: ICONS.arrow,
            screen: "Schechdulebooking"
        },
        {
            id: "10",
            lable: "About",
            image: ICONS.arrow,
            screen: "Aboutus"
        },
    ]
    const handleMenuItemPress = (screen) => {
        // Navigate to the specified screen
        navigation.navigate(screen);
    };
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = () => {
        setModalVisible(false);
        navigation.navigate("LoginScreen")
    };
    return (
        <SafeAreaView style={{ flex: 1, }}  >
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
                    <TouchableOpacity style={{ marginTop: height * 0.06, marginRight: width * 0.1 }}>
                        <Image source={require("../../assets/Newicon/edit-info.png")} style={{ width: 40, height: 40 }} />

                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.container1}>
                        {buttonData.map((button, index) => (
                            <TouchableOpacity key={button.id} style={styles.buttonContainer} onPress={() => handleMenuItemPress(button.screen)}>
                                <Text style={styles.label}>{button.lable}</Text>
                                <Image source={button.image} style={styles.icon} />
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => setModalVisible(true)}>
                    <Text style={styles.label}>Logout</Text>

                </TouchableOpacity>
            </ScrollView>
            <LogoutModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onLogout={handleLogout}
            />

        </SafeAreaView>

    )
}
export default ProfileScreen;
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "#000",
        // textAlign: "center"
    },
    con: {
        backgroundColor: "#FFF",
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