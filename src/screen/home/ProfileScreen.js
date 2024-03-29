import React, { useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../assets/themes";
import CustomButton from "../../compontent/Custombutton";
import { useNavigation } from "@react-navigation/native";
import LogoutModal from "../../compontent/LogoutModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderScreen from "../../compontent/LoaderScreen";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("screen")

const ProfileScreen = () => {
    const navigation = useNavigation();

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
            const myHeaders = new Headers();
            myHeaders.append("token", "WlhsS01XTXlWbmxZTW14clNXcHZhVTFVVVdsTVEwcDNXVmhPZW1ReU9YbGFRMGsyU1d0R2EySlhiSFZKVTFFd1RrUlJlVTVFUlhsT1EwWkJTMmxaYkVscGQybGhSemt4WTI1TmFVOXFVVFJNUTBwcldWaFNiRmd6VW5CaVYxVnBUMmxKZVUxRVNUQk1WRUY2VEZSRk1rbEVSWGxQYWswMFQycEZOVWxwZDJsamJUbHpXbE5KTmtscVNXbE1RMHByV2xoYWNGa3lWbVpoVjFGcFQyMDFNV0pIZURrPQ==");
            myHeaders.append("Cookie", "ci_session=1136fffb894fac38c530a22571c68521774899b2");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow"
            };

            const response = await fetch("https://aduetechnologies.com/jinuncle/api/auth/logout", requestOptions);
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
        <SafeAreaView style={{ flex: 1, }} >
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.con}>
                    <View style={{
                        marginTop: height * 0.06, marginLeft: width * 0.07
                    }}>
                        <Text style={[styles.text, { fontSize: 25, color: "white" }]}>
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