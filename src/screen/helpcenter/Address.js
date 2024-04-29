
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, SafeAreaView, StatusBar, Text, ScrollView, FlatList, TouchableOpacity, Platform } from 'react-native';
import Header from "../../compontent/Header";
import CheckBox from 'react-native-check-box';
import { getaddress } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContiuneShopping from "../home/ContiuneShopping";
const Address = (props) => {
    const [isaddress, setIsaddress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const Data = [
        {
            name: "Mahesh Kumar",
            address: "3 Newbridge Court Chino Hills, CA 91709, United States",
            button: "Edit"
        },

    ];

    const [isCheckedList, setIsCheckedList] = useState(Array(Data.length).fill(false));
    const onCheckBoxPress = (index) => {
        const newIsCheckedList = [...isCheckedList];
        newIsCheckedList[index] = !newIsCheckedList[index];
        setIsCheckedList(newIsCheckedList);
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
            const result = await response.json();
            console.log("Response--result--->", result)
            if (result.status == 200) {
                setIsaddress(result);
                console.log("resutl--dd-dd-->", result)
            }

        } catch (error) {
            console.log("error--getadrres-->", error)
        }
    }

    useEffect(() => {
        handlegetaddress();
    }, [props.navigate])

    const renderItem = ({ item, index }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.name}>
                    {item.name}
                </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("AddressEdit")}>
                    <Text style={[styles.button, { color: "#004E8C" }]}>
                        {item.button}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.address}>{item.address}</Text>
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    isChecked={isCheckedList[index]}
                    onClick={() => onCheckBoxPress(index)}
                    checkBoxColor={isCheckedList ? '#004E8C' : 'black'}
                />
                <Text style={styles.label}>Use as the shipping address</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Manage Addresses"} />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <FlatList
                    data={Data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity style={styles.addButton} onPress={() => props.navigation.navigate("AddressEdit")}>
                    <Image source={require("../../assets/logo/plus.png")} resizeMode="contain" style={{ width: 50, height: 50 }} />
                </TouchableOpacity>
            </ScrollView>
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
});

export default Address;
