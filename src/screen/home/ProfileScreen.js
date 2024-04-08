import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../assets/themes";
import CustomButton from "../../compontent/Custombutton";
import { useNavigation } from "@react-navigation/native";
import LogoutModal from "../../compontent/LogoutModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderScreen from "../../compontent/LoaderScreen";
import { showMessage } from "react-native-flash-message";
import AuthContext from "../context/AuthContext";
import { logout } from "../../apiconfig/Apiconfig";
const { height, width } = Dimensions.get("screen")

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { isgetprofile, getProfile } = useContext(AuthContext);
    console.log("getprofile------fetch--->", isgetprofile);

    useEffect(() => {
        getProfile();
    })

    const [isLoading, setIsLoading] = useState();
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
        navigation.navigate(screen);
    };
    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const requestOptions = {
                method: "POST",
                headers: token,
                redirect: "follow"
            };
            const response = await fetch(logout, requestOptions);
            const data = await response.text();
            console.log("Logout response:", data);
            // Clear the token from AsyncStorage
            await AsyncStorage.removeItem('token');
            console.log('Logout successful');
            setIsLoading(false);
            setModalVisible(false);
            navigation.navigate("LoginScreen")
            showMessage({
                message: "Logout suceesfully ",
                type: "success",
                icon: "success"
            })
            // onClose();
        } catch (error) {
            console.error('Error logging out:', error);
            setIsLoading(false);
        }
    };
    const [modalVisible, setModalVisible] = useState(false);
    // const handleLogout = () => {
    //     setModalVisible(false);
    //     navigation.navigate("LoginScreen")
    // };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF", paddingBottom: 20 }} >
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.con}>
                    <View style={{
                        marginTop: height * 0.06, marginLeft: width * 0.07
                    }}>
                        <Text style={[styles.text, { fontSize: 25, color: "white" }]}>
                            Verified customer
                        </Text>
                        <Text style={styles.text}>
                            +91{isgetprofile?.mobile || 'N/A'}
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

                <View style={styles.btn}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <View>
                            <Text style={styles.text2}>Refer & earn  ₹100</Text>
                            <Text style={styles.text1}>Get ₹100 when your friend completes their first booking</Text>
                        </View>
                        <View>
                            <Image source={require("../../assets/gif/giftbox.png")} resizeMode="contain" style={{ width: 70, height: 70 }} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnsmal} onPress={() => navigation.navigate("Refer")}>
                        <Text style={styles.refer}>Refer now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <LogoutModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onLogout={handleLogout}
            />
            {isLoading && <LoaderScreen isLoading={isLoading} />}
        </SafeAreaView>

    )
}
export default ProfileScreen;
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "white",
        // textAlign: "center"
    },
    con: {
        backgroundColor: "#004E8C",
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
        paddingBottom: 100
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
    text1: {
        color: "black",
        fontSize: 15,
        width: width * 0.4
    },
    text2: {
        color: "black",
        fontSize: 17,
        // width: width * 0.4,
        fontWeight: "bold"
    },
    btn: {
        // flexDirection: "row",
        backgroundColor: "#e6e6fa",
        borderWidth: 1,
        width: width * 0.9,
        padding: 10,
        borderColor: "#e6e6fa",
        borderRadius: 10,
        // justifyContent: "space-between",
        alignSelf: "center",
        marginTop: height * 0.02,
        paddingHorizontal: 25
    },
    btnsmal: {
        width: width * 0.3,
        borderWidth: 1,
        justifyContent: "center",
        backgroundColor: "#004E8C",
        borderColor: "#004E8C",
        borderRadius: 5,
        padding: 5,
        marginTop: 10
    },

    refer: {
        color: "white",
        fontSize: 15,
        textAlign: "center"
    }
});