import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, Image, ScrollView } from "react-native";
import { ICONS } from "../assets/themes";
import CustomButton from "./Custombutton";
import { tuple } from "yup";
import AddressModal from "./AddressModal";
import RazorpayCheckout from 'react-native-razorpay';

const { width, height } = Dimensions.get("screen");
const TimeSlot = ({ isVisible, onClose, categories }) => {
    const navigation = useNavigation();
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const weekdays = [
        { id: '1', name: 'Mon' },
        { id: '2', name: 'Tue' },
        { id: '3', name: 'Wed' },
        { id: '4', name: 'Thu' },
        { id: '5', name: 'Fri' },
        { id: '6', name: 'Sat' },
        { id: '7', name: 'Sun' },
    ];
    const times = [
        { id: '1', time: '06:30 PM' },
        { id: '2', time: '07:00 PM' },
        { id: '3', time: '07:30 PM' },
        { id: '4', time: '07:30 PM' },
        { id: '5', time: '07:30 PM' },
        { id: '6', time: '07:30 PM' },
        // Add more times as needed
    ];
    const handleViewCard = () => {
        onClose();
        navigation.navigate("Paypal");
    };
    const handleItemSelect = (itemId) => {
        setSelectedItem(itemId);
    };
    const [modalVisible, setModalVisible] = useState(false);
    const handleLogout = () => {
        setModalVisible(false);
        navigation.navigate("LoginScreen")
    };
    // Function to handle item selection
    const handleDaySelect = (dayId) => {
        setSelectedDay(dayId);
    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.con,
                    selectedDay === item.id ? styles.selectedDay : null
                ]}
                onPress={() => handleDaySelect(item.id)}
            >
                <Text style={[styles.text1
                    , selectedDay === item.id ? styles.selecttext : null]}>{item.name}</Text>
                <Text style={[styles.text1
                    , selectedDay === item.id ? styles.selecttext : null]}>11</Text>
            </TouchableOpacity>
        );
    };

    const renderItem2 = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.btn,
                selectedItem === item.id ? styles.selectedDay : null
            ]}
            onPress={() => handleItemSelect(item.id)}
        >
            <Text style={[
                styles.text1,
                selectedItem === item.id ? styles.selecttext : null
            ]}>{item.time}</Text>
        </TouchableOpacity>
    );

    const handlePayment = async () => {
        try {
            const options = {
                description: 'Payment for goods',
                image: 'https://your_image_url.png',
                currency: 'INR', // Currency code (e.g., INR, USD)
                key: 'rzp_test_uhu2i0SIc40SxY', // Your Razorpay key
                amount: '10000', // Payment amount in paise (e.g., for ₹100.00, provide 10000)
                name: 'Your App Name',
                prefill: {
                    email: 'example@example.com', // User's email
                    contact: '1234567890', // User's phone number
                    name: 'John Doe', // User's name
                },
                theme: { color: '#F37254' } // Color theme
            };

            RazorpayCheckout.open(options)
                .then((data) => {
                    // Handle success
                    console.log('Payment success:', data);
                    alert('Payment success');
                })
                .catch((error) => {
                    // Handle failure
                    console.error('Payment failed:', error);
                    alert('Payment failed');
                });
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Error processing payment');
        }
    };

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={{ justifyContent: "flex-end", marginLeft: width * 0.8, paddingBottom: 20, marginTop: height * 0.2, }}>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={require("../assets/Icon/x-mark.png")} style={{ width: 40, height: 40 }} tintColor={"white"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <ScrollView >
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingBottom: 15 }}>
                                <View style={{ flexDirection: "row", columnGap: 10, }}>
                                    <Image source={require("../assets/bottomnavigatiomnimage/homeactive.png")} style={{ height: 20, width: 20 }} />
                                    <Text style={styles.title}>Home - Takhi discount ,center</Text>
                                </View>

                                <Image source={ICONS.arrow} style={{ height: 20, width: 20 }} />
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={[styles.title, { marginTop: height * 0.02 }]}>When should the professional arrive ?</Text>
                            <Text style={styles.text}>Your service will take approx 2 hrs</Text>
                        </View>
                        <View style={styles.com}>
                            <Text style={styles.title}>Get service later</Text>
                            <Text style={styles.text}>Serivce at the earliest available time slot</Text>
                            <FlatList
                                data={weekdays}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                horizontal
                                contentContainerStyle={{ columnGap: 10 }}
                                showsHorizontalScrollIndicator={false}
                            />
                            <View>
                                <Text style={[styles.title, { marginTop: 10 }]}>Select start time of service</Text>
                                <FlatList
                                    data={times}
                                    // numColumns={4}
                                    renderItem={renderItem2}
                                    keyExtractor={item => item.id}
                                    // columnWrapperStyle={{ columnGap: 10, rowGap: 10 }}
                                    horizontal
                                    contentContainerStyle={{ columnGap: 10 }}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: height * 0.02 }}>
                            <CustomButton size={"large"} label={"Proceed to checkout"} backgroundColor={"#004E8C"} color={"white"} onPress={handleViewCard} />
                        </View>
                    </ScrollView>
                </View>
            </View>
            <AddressModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onLogout={handleLogout}
            />

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        backgroundColor: "white",
        padding: 30,
        // borderRadius: 10,
        width: width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        fontSize: 17,
        color: "#000",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic",
    },
    text: {
        fontFamily: "Roboto-Medium",
        fontSize: 15,
        color: "gray",
        marginTop: height * 0.01
    },
    com: {
        borderWidth: 1,
        borderColor: "lightgray",
        padding: 20,
        marginTop: height * 0.02,
        borderRadius: 10
        // flex:1
    },
    con: {
        borderWidth: 1,
        borderColor: "lightgray",
        padding: 20,
        marginTop: height * 0.02,
        borderRadius: 10,
        width: width * 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    // con: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: 20,
    //     paddingVertical: 10,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ccc',
    //   },
    text1: {
        fontSize: 16,
        color: 'black',
    },
    selectedDay: {
        backgroundColor: '#004E8C',
        color: 'white',
    },
    selecttext: {
        color: 'white',
    },
    btn: {
        borderRadius: 5,
        borderWidth: 1,
        width: width * 0.2,
        alignItems: "center",
        padding: 5,
        borderColor: "lightgray",
        marginVertical: height * 0.01

    }
});

export default TimeSlot;
