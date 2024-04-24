import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import TextinputComponent from "../../compontent/TextinputComponent";
import { useNavigation } from "@react-navigation/native";
import { Copuonapiget, applycopuon } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("screen")
const Copuon = (props) => {
    const navigation = useNavigation();
    const [iscopon, setIscopon] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log("iscopon----iscopon--->", iscopon)
    const coupons = [
        { id: 1, title: '50% Off', description: 'Get 50% off on all items', expiry: 'Expires on 31st March' },
        { id: 2, title: 'Free Shipping', description: 'Enjoy free shipping on orders above $50', expiry: 'Expires on 15th April' },

    ];
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
            console.log("error ---->", error)
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
                navigation.goBack();
            }

        } catch (error) {
            console.log("error---cop-->", error);
        }
    }

    const renderCoupon = ({ item }) => (
        <TouchableOpacity onPress={() => handlepostcopuon(item)}>
            <View style={styles.card}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.amount}</Text>
                <Text style={styles.expiry}>{item.expiry}</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Header title={"coupon"} />
            {/* {console.log("couponcoupon-->", nameiscopon)} */}
            {/* <Text style={{ fontSize: 14, color: "black" }}>{nameiscopon}</Text> */}
            <View style={{ marginHorizontal: 20, marginTop: height * 0.04 }}>
                <FlatList
                    data={iscopon}
                    renderItem={renderCoupon}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </SafeAreaView>
    )
}
export default Copuon;
const styles = StyleSheet.create({
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
});