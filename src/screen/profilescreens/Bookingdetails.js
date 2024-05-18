import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookingdetailsapi, imagebaseurl } from '../../apiconfig/Apiconfig';
import LoaderScreen from '../../compontent/LoaderScreen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../../compontent/Header';
import Modalrating from '../../compontent/Modalrating';
const { width, height } = Dimensions.get("screen")

const Bookingdetails = ({ route }) => {
    const navigation = useNavigation();
    const bookingid = route?.params?.bookingid;
    console.log("bookingid--->", bookingid)

    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isItems, setIsItems] = useState([]);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    // useFocusEffect(
    //     useCallback(() => {
    //         // Open the modal when the screen is focused
    //         toggleModal();

    //         return () => {
    //             // Cleanup or reset state if needed
    //         };
    //     }, [])
    // );

    const [isbookingdetails, setIsbookingdetails] = useState([]);
    const handlegetbookingdetails = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("booking_id", bookingid);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(Bookingdetailsapi, requestOptions);
            console.log("Response:", response);
            const result = await response.json();
            console.log("result-----result--->", result)
            if (result?.status == 200) {
                setIsbookingdetails(result.data.booking_detail);
                setIsItems(result.data.items);
                setIsLoading(false)
                console.log("result.data.booking_detail------>", result.data.booking_detail)
            }
        } catch (error) {
            console.log("erroetbookingdetailsr------>", error)
            setIsLoading(false);
        }
    }


    useEffect(() => {
        const handleFocus = () => {
            handlegetbookingdetails();
        };
        handleFocus();
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);
        return unsubscribeFocus;
    }, []);


    const renderItem2 = ({ item }) => {
        return (
            <View style={styles.continer}>
                <View style={{ marginTop: 10 }}>

                    <Text>name:<Text style={{ color: "gray" }}> {item.name}</Text></Text>
                    <Text style={{ color: "black" }}>price:<Text style={{ color: "gray" }}>₹{item.price}</Text></Text>

                    <Text>orderdate:<Text style={{ color: "gray" }}> {item.order_date_time}</Text></Text>
                    <Text>quantity:<Text style={{ color: "gray" }}> {item.quantity}</Text></Text>

                </View>
            </View>

        )
    }
    const renderItem = ({ item }) => {
        let imageData;
        try {
            imageData = JSON.parse(item.service_image)[0];
        } catch (error) {
            return null;
        }

        const imagePath = imagebaseurl + imageData?.image_path;
        const priceDetail = JSON.parse(item.price_detail);


        console.log("itemDetail--->", isItems)





        return (
            <TouchableOpacity onPress={() => navigation.navigate("Rateing", { bookingid: item.booking_id })}>
                <View style={styles.continer}>
                    <View style={{ alignItems: "center" }}>
                        <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                    </View>
                    <Text style={[styles.name,]}>{item.service_name}</Text>
                    <View style={{ marginLeft: 20, flex: 1, marginTop: 10 }}>

                        <Text>slot time:<Text style={{ color: "gray" }}> {item.slot_time}</Text></Text>
                        <Text>order id:<Text style={{ color: "gray" }}> {item.order_id}</Text></Text>
                        <Text>slot date:<Text style={{ color: "gray" }}> {item.slot_date}</Text></Text>
                        <Text>slot date:<Text style={{ color: "gray" }}> {item.slot_date}</Text></Text>
                        <Text>slot date:<Text style={{ color: "gray" }}> {item.slot_date}</Text></Text>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Price Details:</Text>
                            <Text>Sub Total: <Text style={{ color: "gray" }}>₹{priceDetail.cart_sub_total}</Text></Text>
                            <Text>Delivery Charge: <Text style={{ color: "gray" }}>₹{priceDetail.delivery_charge}</Text></Text>
                            <Text>Cart Total: <Text style={{ color: "gray" }}>₹{priceDetail.cart_total}</Text></Text>
                            <Text>Coupon Name: <Text style={{ color: "gray" }}>{priceDetail.coupon_name}</Text></Text>
                            <Text>Coupon Discount: <Text style={{ color: "gray" }}>₹{priceDetail.coupon_discount}</Text></Text>
                            <Text>Payable Amount: <Text style={{ color: "gray" }}>₹{priceDetail.payable_amount}</Text></Text>
                            <Text>Total Products: <Text style={{ color: "gray" }}>{priceDetail.total_product}</Text></Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Items:</Text>
                            {/* 
                            <View key={index}>
                                <Text>Name: {itemDetail.name}</Text>
                                <Text>Price: ₹{itemDetail.price}</Text>
                                <Text>Quantity: {itemDetail.quantity}</Text>
                            </View> */}
                            <FlatList
                                data={isItems}
                                renderItem={renderItem2}
                            />

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={"Booking Details"} />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        data={isbookingdetails}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.booking_id.toString()}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyListContainer}>
                                <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                <Text style={styles.emptyListText}>No data found</Text>
                            </View>
                        )}
                    />
                </View>
                {isLoading && <LoaderScreen isLoading={isLoading} />}
            </View>
            <Modalrating isVisible={isModalVisible} onClose={toggleModal} />
        </SafeAreaView>

    )
}

export default Bookingdetails

const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto-Bold",
        fontSize: 25
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
    starIcon: {
        width: 14,
        height: 14,
        marginRight: 5,
    },
    continer: {
        marginBottom: 20,
        marginTop: 10,
        // flexDirection: "row",
        backgroundColor: "#FFF",
        padding: 10,
        width: width * 0.9,
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 10,
        columnGap: 20,

    },
    name: {
        color: "black",
        textAlign: "center",
        fontSize: 20,
        alignItems: "center",
        fontWeight: "bold",
        marginTop: 20
        // flex:1
    },
    btn: {
        borderWidth: 1,
        backgroundColor: "white",
        width: width * 0.4,
        height: height * 0.05,
        borderColor: "white",
        // columnGap:10,
        marginHorizontal: 10,
        textAlign: "center",
        borderRadius: 50,
        justifyContent: "center",
        marginTop: height * 0.03
    }
});