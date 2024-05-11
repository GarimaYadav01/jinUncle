
import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, SafeAreaView, StatusBar, Text, ScrollView, FlatList, TouchableOpacity, Platform, Dimensions, } from 'react-native';
import Header from "../../compontent/Header";
import CheckBox from 'react-native-check-box';
import { defaultaddres, deleteaddress, getaddress } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContiuneShopping from "../home/ContiuneShopping";
import AuthContext from "../context/AuthContext";
import LoaderScreen from "../../compontent/LoaderScreen";
import { showMessage } from "react-native-flash-message";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { Modal } from "react-native-paper";

const { height, width } = Dimensions.get("screen")
const Address = (props) => {
    const [isaddress, setIsaddress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    console.log("isLoading----->", isLoading)

    // const { isaddress } = useContext(AuthContext);
    // console.log("isaddress--isaddAuthContextress-->", isaddress)

    const [isCheckedList, setIsCheckedList] = useState(Array(isaddress?.length).fill(false));
    console.log("isCheckedList---->", isCheckedList)
    const onCheckBoxPress = (index, address_id) => {
        const newIsCheckedList = [...isCheckedList];
        newIsCheckedList[index] = !newIsCheckedList[index];
        setIsCheckedList(newIsCheckedList);
        handlewdefult(address_id);
    };


    const saveCheckedList = async () => {
        try {
            await AsyncStorage.setItem('isCheckedList', JSON.stringify(isCheckedList));
        } catch (error) {
            console.log("Error saving isCheckedList:", error);
        }
    };

    const loadCheckedList = async () => {
        try {
            const checkedList = await AsyncStorage.getItem('isCheckedList');
            if (checkedList !== null) {
                setIsCheckedList(JSON.parse(checkedList));
            }
        } catch (error) {
            console.log("Error loading isCheckedList:", error);
        }
    };

    useEffect(() => {
        loadCheckedList();
    }, []);

    useEffect(() => {
        saveCheckedList();
    }, [isCheckedList]);



    const handlewdefult = async (address_id) => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("address_id", address_id);
            console.log("address_id-----address_id--->", address_id)
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(defaultaddres, requestOptions);
            const result = await response.json();
            console.log("result------->", result)
            if (result.status == 200) {
                showMessage({
                    message: result.message,
                    type: "success",
                    icon: "success"
                })
                setIsLoading(false);
                const updatedIsCheckedList = isaddress.map((_, index) => index === 0); // Set first item to true
                setIsCheckedList(updatedIsCheckedList);
                console.log("isCheckedList after update:", updatedIsCheckedList);
            }

        } catch (error) {
            setIsLoading(false);
            console.log("error---------->", error)
        }

    }


    const onDelete = (item) => {
        handleDeleteaddress(item.address_id);
        toggleDeleteModal();
    };

    const toggleDeleteModal = () => {
        setDeleteModalVisible(!deleteModalVisible);
    };



    const handlegetaddress = async () => {
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
            const response = await fetch(getaddress, requestOptions);
            console.log("Response:", response);
            const result = await response.text();
            console.log("Response result:", result);
            // Check if response is HTML or JSON
            if (response.ok) {
                try {
                    const jsonData = JSON.parse(result);
                    setIsaddress(jsonData.data);
                    setIsLoading(false);
                    console.log("Parsed JSON data:", jsonData);
                } catch (error) {
                    console.log("Error parsing JSON:", error);
                }
            } else {
                console.log("Non-JSON response:", result);
            }
        } catch (error) {
            console.log("Error:", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handlegetaddress();
    }, []);



    const handleDeleteaddress = async (address_id) => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("address_id", address_id);
            console.log("address_id-->", address_id)
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(deleteaddress, requestOptions);
            const result = await response.json();
            if (result.status == 200) {
                showMessage({
                    message: result.message,
                    type: "success",
                    icon: "success"
                });
                setIsLoading(false);

            } else if (result.status == 400) {
                showMessage({
                    message: result.message,
                    type: "warning",
                    icon: "warning"
                });
                setIsLoading(false);
            }
            console.log("result---->", result)

        } catch (error) {
            console.log("error--->", error);
            setIsLoading(false);
        }
    }









    const DeleteModal = () => {
        return (
            <Modal visible={deleteModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to delete?</Text>
                        <Image source={require("../../assets/logo/jinnlogo.png")} resizeMode='contain' style={{ width: 100, height: 100 }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-around", }}>
                            <TouchableOpacity onPress={toggleDeleteModal} style={[styles.btn, { backgroundColor: "white" }]}>
                                <Text style={[styles.text, { color: "text" }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDelete} style={styles.btn}>
                                <Text style={[styles.text, { color: "white" }]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };


    const renderItem = ({ item, index }) => {

        const renderRightActions = (progress, dragX) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [100, 0, -100],
            });
            return (
                <TouchableOpacity onPress={() => handleDeleteaddress(item.address_id)}>
                    <Image source={require("../../assets/Icon/delete.png")} style={{ width: 40, height: 40, marginTop: height * 0.08, marginRight: 15 }} tintColor={"red"} />
                </TouchableOpacity>
            );
        };

        return (
            <GestureHandlerRootView>
                <Swipeable renderRightActions={renderRightActions}>

                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>
                                {item.name}
                            </Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Editadd", { addressId: item.address_id, adress: item })}>
                                <Text style={[styles.button, { color: "#004E8C" }]}>
                                    Edit
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.address}>{item.address}</Text>
                        <Text style={styles.address}>{item.country}</Text>
                        <Text style={styles.address}>{item.city}</Text>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox
                                isChecked={isCheckedList[index]}
                                onClick={() => onCheckBoxPress(index, item.address_id)}
                                checkBoxColor={isCheckedList ? '#004E8C' : 'black'}
                            />
                            <Text style={styles.label}>Use as the shipping address</Text>
                        </View>
                    </View>

                </Swipeable>
            </GestureHandlerRootView>
        )

    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Manage Addresses"} />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <FlatList
                    data={isaddress}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyListContainer}>
                            <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                            <Text style={styles.emptyListText}>No data found</Text>
                        </View>
                    )}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => props.navigation.navigate("AddressEdit")}>
                    <Image source={require("../../assets/logo/plus.png")} resizeMode="contain" style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
            </ScrollView>
            {isLoading && <LoaderScreen isLoading={isLoading} />}
            <DeleteModal />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#FFF",
        elevation: 4,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 18,
        fontFamily: Platform.OS === "ios" ? "Rubik" : "Roboto",
        color: "#1E1E1E",
    },
    button: {
        fontSize: 16,
        fontFamily: Platform.OS === "ios" ? "Rubik" : "Roboto",
    },
    address: {
        fontSize: 15,
        fontFamily: Platform.OS === "ios" ? "Rubik" : "Roboto",
        color: "#222",
        marginTop: 10,
    },
    checkBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    label: {
        marginLeft: Platform.OS === "ios" ? 10 : 5,
        fontFamily: Platform.OS === "ios" ? "Rubik" : "Roboto",
        color: "gray"
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    addButtonImage: {
        height: 60,
        width: 60,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    emptyListText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: "bold"
    },
    modalContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width * 0.8,

        marginTop: 10,
        flexGrow: 1,
        // marginHorizontal: 20,
        paddingBottom: 100,
        alignContent: "center",
        alignItems: 'center',
        // height:height


    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: "Roboto-MediumItalic",
        color: "black",
        fontSize: 18
    },
    btn: {
        width: width * 0.3,
        height: height * 0.06,
        borderWidth: 1,
        backgroundColor: "#004E8C",
        borderColor: "#f5fffa",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        color: "black",
        fontFamily: "Roboto-BoldItalic",
        fontSize: 16
    }
});

export default Address;
