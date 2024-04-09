import React, { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../../compontent/Header";
import { ICONS } from "../../assets/themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { wallet } from "../../apiconfig/Apiconfig";
import LoaderScreen from "../../compontent/LoaderScreen";
const { height, width } = Dimensions.get("screen")
const MyWallet = () => {
    const [expanded, setExpanded] = useState(false);
    const [isWallet, setIsWallet] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    const handlegetwallet = async () => {
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
            const response = await fetch(wallet, requestOptions);
            console.log("Response----->", response);
            const result = await response.json();
            console.log("resulwallet----->", result)
            if (response?.status == 200) {
                setIsWallet(result.data);
                setIsLoading(false);
                console.log("setiswallet-------->", result.data)
            }
        } catch (error) {
            console.log("error---->", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handlegetwallet();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={"My Wallet"} />
            <View style={{
                backgroundColor: "#FFF", flexDirection: "row", justifyContent: "center", padding: 10
            }}>
                <Image source={require("../../assets/banner/wallet.png")} resizeMode="contain" style={{ width: 30, height: 40, marginTop: height * 0.01 }} />
                <View style={{ marginHorizontal: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                        <Text style={styles.text}>UC Cash</Text>
                        <Text style={styles.text}>₹{isWallet}</Text>
                    </View>
                    <Text style={styles.text1}>Formerly Ju Credits. Applicable on all services</Text>
                </View>
            </View>

            <View>
                <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
                    <Text style={styles.headerText}>Have a question?</Text>
                    <Image source={ICONS.arrow} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
                {expanded && (
                    <View style={styles.content}>
                        <Text style={styles.subtext2}>I have Uc credits. What happens to them now?</Text>
                        <Text style={styles.subtext}>Ali JU Credits have been converted JU Cash. They are applicable on all services.</Text>
                        <Text style={styles.subtext2}>What is JU Cash?</Text>
                        <Text style={styles.subtext}>JU cash is given by us as part of our customer experience programs. It is redeemable across all categories and is valid for 1 year from the date of issue.</Text>
                        <Text style={styles.subtext2}>What is JU Rewards?</Text>
                        <Text style={styles.subtext}>JU reward points are given by us as part of promotional campaigns so that users like you can try out our flagship services. They are applicable on selected categories only as mentioned as the rewards.</Text>
                        <Text style={styles.subtext}>Are there any other important terms and Conditions?</Text>
                        <Text style={styles.subtext}>Yes: 1. Reward points can't be clubbed with other ongoing Ju offers; however, third-party offers like Amazon pay can be combined. 2. Locked date slots can't be unlocked using rewards after service on the final bill after service delivery in such cases. 3. Rewards will expire irrespective of service delivery window is long. it is thus advised to use pre-payment options to avail rewards in such cases. 4. Rewards/cash won't be applicable on cash payments.</Text>
                    </View>
                )}
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Wallet</Text>
            </View>
            {isLoading && <LoaderScreen isLoading={isLoading}/>}
        </SafeAreaView>
    )
}

export default MyWallet;

const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto-BoldItalic",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "500",
        color: "black"
    },
    text1: {
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        width: width * 0.7,
        // textAlign: "center",
        marginTop: height * 0.01,
        marginLeft: width * 0.05,
        color: "gray"
    },
    subtext: {
        fontSize: 16,
        fontStyle: "normal",
        // textAlign: "center",
        fontFamily: "Roboto-Bold",
        lineHeight: 24,
        color: "gray"
    },
    subtext2: {
        fontSize: 16,
        fontStyle: "normal",
        color: "black",
        fontFamily: "Roboto-Bold",
        marginVertical: height * 0.01
    },

    content: {
        padding: 10,
        marginHorizontal: 15
    },
    header: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: height * 0.08,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerText: {

        fontSize: 16,
        fontWeight: 'bold',
        marginTop: height * 0.02,
        color: "black"


    },
})