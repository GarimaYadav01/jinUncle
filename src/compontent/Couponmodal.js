
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Copuonapiget, applycopuon } from "../apiconfig/Apiconfig";
const { height, width } = Dimensions.get("screen")

const CouponModal = ({ visible, onClose, onApplyCouponSuccess }) => {
    const navigation = useNavigation();
    const [iscopon, setIscopon] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log("iscopon----iscopon--->", iscopon)


    const handlegetapi = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(Copuonapiget, requestOptions);
            console.log("Response:", response);
            const result = await response.json();
            console.log("copuonresult----->", result)
            if (result.status == 200) {
                setIscopon(result.data);
                setIsLoading(false);
                console.log("copuonresult---data-->", result.data)
            }
        } catch (error) {
            console.log("error------>", error)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handlegetapi();
    }, [])



    const handlepostcopuon = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("coupon", iscopon.name);
            // formdata.append("coupon", "admin");
            console.log("iscopon.name--->", iscopon.name)
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(applycopuon, requestOptions);
            const result = await response.json();
            console.log("result--->", result)
            if (response?.status === 200) {
                showMessage({
                    message: "apply copoun successfully",
                    type: "success",
                    icon: "success"
                })
                onApplyCouponSuccess(result.data);
                onClose();
                setIsLoading(false);
            }

        } catch (error) {
            console.log("error---cop-->", error);
            setIsLoading(false);
        }
    }

    const renderCoupon = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handlepostcopuon(item)}>
                <View style={styles.card}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description}>{item.amount}</Text>
                    <Text style={styles.expiry}>{item.expiry}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={{ justifyContent: "flex-end", marginLeft: width * 0.8, paddingBottom: 20, marginTop: height * 0.2, }}>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={require("../assets/Icon/x-mark.png")} style={{ width: 40, height: 40, marginTop: 10 }} tintColor={"white"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.modalView}>
                    <Text style={styles.text}>Apply your Copuon</Text>
                    <View style={{ marginHorizontal: 20, marginTop: height * 0.04 }}>
                        <FlatList
                            data={iscopon}
                            renderItem={renderCoupon}
                            keyExtractor={(item) => item.id.toString()}
                        // ListEmptyComponent={() => (
                        //     <View style={styles.emptyListContainer}>
                        //         <Image source={require("../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                        //         <Text style={styles.emptyListText}>No data found</Text>
                        //     </View>
                        // )}
                        />
                    </View>
                    {/* <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                        onPress={onClose}
                    >
                        <Text style={styles.textStyle}>Close Modal</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.2
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width * 0.9
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        width: width * 0.8
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    expiry: {
        fontSize: 14,
        color: 'gray',
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.2,
    },
    emptyListText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: "bold"
    },
    text: {
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic"
    },
});

export default CouponModal;
