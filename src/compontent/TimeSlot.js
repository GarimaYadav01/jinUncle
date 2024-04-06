import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, Image, ScrollView } from "react-native";
import { ICONS } from "../assets/themes";
import CustomButton from "./Custombutton";
import { tuple } from "yup";
import AddressModal from "./AddressModal";
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { timeSlotting } from "../apiconfig/Apiconfig";
import LoaderScreen from "./LoaderScreen";
const { width, height } = Dimensions.get("screen");
const TimeSlot = ({ isVisible, onClose, categories }) => {
    const navigation = useNavigation();
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [timeSlotget, setTimeslotget] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log("hhhdg----->", timeSlotget)
    const handlesubmit = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem("token")
            const myHeaders = new Headers();
            myHeaders.append("token", token);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(timeSlotting, requestOptions);
            const result = await response.json();
            console.log("responsetimeslot------->", result)
            if (result.status == 200) {
                setTimeslotget(result.data);
                setIsLoading(false);
                console.log("settimelot----->", result)
            }
        } catch (error) {
            console.log("rror----->", error)
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handlesubmit();
    }, []);

    const handleViewCard = () => {
        onClose();
        navigation.navigate("PaymentScreen");
    };
    const handleItemSelect = (itemId) => {
        setSelectedItem(itemId);
    };
    const [modalVisible, setModalVisible] = useState(false);

    const openmodal = () => {
        setModalVisible(true);
    }

    const handleDaySelect = (dayId) => {
        setSelectedDay(dayId);
    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.con,
                    selectedDay === item.date ? styles.selectedDay : null
                ]}
                onPress={() => handleDaySelect(item.date)}
            >
                <Text style={[
                    styles.text1,
                    selectedDay === item.date ? styles.selecttext : null
                ]}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderItem2 = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.btn,
                selectedItem === item.name ? styles.selectedDay : null
            ]}
            onPress={() => handleItemSelect(item.name)}
        >
            <Text style={[
                styles.text1,
                selectedItem === item.name ? styles.selecttext : null
            ]}>{item.name}</Text>
        </TouchableOpacity>
    );

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
                        <TouchableOpacity onPress={openmodal}>
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
                                data={timeSlotget.days}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                contentContainerStyle={{ columnGap: 10 }}
                                showsHorizontalScrollIndicator={false}
                            />
                            <View>
                                <Text style={[styles.title, { marginTop: 10 }]}>Select start time of service</Text>
                                <FlatList
                                    data={timeSlotget.times}
                                    // numColumns={4}
                                    renderItem={renderItem2}
                                    keyExtractor={(item, index) => index.toString()}
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
            />
            {isLoading && <LoaderScreen isLoading={isLoading} />}
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
