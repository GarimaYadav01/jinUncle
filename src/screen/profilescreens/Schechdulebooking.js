import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import { bookingapi, imagebaseurl, schedbook } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("screen")
const Mybooking = () => {
    const [isgetmybooking, setIsgetmybooking] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getmybooking = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(schedbook, requestOptions);
            const result = await response.json();
            console.log("response---response->", result);
            if (result.status == 200) {
                setIsgetmybooking(result.data);
                console.log("setIsgetmybooking-------->", result.data)
            }
        } catch (error) {
            console.log("error:", error);
        }
    }


    useEffect(() => {
        const handleFocus = () => {
            getmybooking();
        };
        handleFocus();
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);
        return unsubscribeFocus;
    }, []);

    const renderItemallmix = ({ item }) => {
        console.log("item----->", item)
        let imageData;
        try {
            imageData = JSON.parse(item.service_image)[0];
        } catch (error) {
            return null;
        }

        const imagePath = imagebaseurl + imageData.image_path;
        return (
            <View style={styles.continer}>
                <View>
                    <Image source={{ uri: imagePath }} style={{ width: 100, height: 100, borderRadius: 10 }} resizeMode="contain" />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={[styles.name,]}>{item.service_name}</Text>
                    {/* <View style={styles.ratingContainer}>
                        <Image source={require("../../assets/logo/star.png")} style={styles.starIcon} />
                        <Text style={styles.likes}>{item.rating}</Text>
                    </View> */}
                    <Text style={{ color: "black" }}>₹{item.final_price}</Text>
                    <Text>{item.booking_date_time}</Text>
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Header title={"My Booking"} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={isgetmybooking}
                    renderItem={renderItemallmix}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyListContainer}>
                            <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                            <Text style={styles.emptyListText}>No data found</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>

    )
}
export default Mybooking;
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
        flexDirection: "row",
        backgroundColor: "#FFF",
        padding: 10,
        width: width * 0.9,
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 10,
        columnGap: 20
    }
});