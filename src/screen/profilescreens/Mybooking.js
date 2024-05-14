import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import { bookingapi, imagebaseurl } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FastField } from "formik";
import { hideMessage } from "react-native-flash-message";
import LoaderScreen from "../../compontent/LoaderScreen";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen")
const Mybooking = () => {
    const navigation = useNavigation();
    const [isgetmybooking, setIsgetmybooking] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("All Booking");
    const getmybooking = async (id) => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("type", id);
            console.log("id-->", id)
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(bookingapi, requestOptions);
            const result = await response.json();
            console.log("response---response->", result);
            if (result.status == 200) {
                setIsLoading(false);
                setIsgetmybooking(result.data);
                console.log("setIsgetmybooking-------->", result.data)
            }
        } catch (error) {
            setIsLoading(false);
            console.log("error:", error);
        }
    }

    data = [
        {
            id: "1",
            name: "All Booking"
        },
        {
            id: "2",
            name: "Upcomming Booking"
        },
        {
            id: "3",
            name: "Runing Booking",
        },
        {
            id: "4",
            name: "Compeleted Booking"
        },
    ]



    const renderTab = ({ item }) => {
        return (
            <TouchableOpacity
                style={[styles.btn, { backgroundColor: selectedTab === item.name ? '#004E8C' : 'white' }]}
                onPress={() => {
                    setSelectedTab(item.name);
                    getmybooking(item.id); // Call getmybooking with the selected tab's id immediately
                }}
            >
                <Text style={[styles.name, { color: selectedTab === item.name ? 'white' : 'black' }]}>{item.name}</Text>
            </TouchableOpacity>
        );
    };


    const filteredData = isgetmybooking.filter(item => {
        if (selectedTab === "All Booking") {
            return true;
        } else if (selectedTab === "Upcomming Booking") {
            // Add condition for Upcomming Booking
            return item.upcomming_condition; // Replace upcomming_condition with actual condition
        } else if (selectedTab === "Runing Booking") {
            // Add condition for Runing Booking
            return item.runing_condition; // Replace runing_condition with actual condition
        } else if (selectedTab === "Compeleted Booking") {
            // Add condition for Compeleted Booking
            return item.compeleted_condition; // Replace compeleted_condition with actual condition
        }
    });


    console.log("filteredData----->", filteredData)

    // const renderItemallmix = ({ item }) => {
    //     console.log("item---wwwww-->", item)
    //     let imageData;
    //     try {
    //         imageData = JSON.parse(item.service_image)[0];
    //     } catch (error) {
    //         return null;
    //     }

    //     const imagePath = imagebaseurl + imageData.image_path;
    //     return (
    //         <View style={styles.continer}>
    //             <View>
    //                 <Image source={{ uri: imagePath }} style={{ width: 100, height: 100, borderRadius: 10 }} resizeMode="contain" />
    //             </View>
    //             <View style={{ marginTop: 10 }}>
    //                 <Text style={[styles.name,]}>{item.service_name}</Text>
    //                 {/* <View style={styles.ratingContainer}>
    //                     <Image source={require("../../assets/logo/star.png")} style={styles.starIcon} />
    //                     <Text style={styles.likes}>{item.rating}</Text>
    //                 </View> */}
    //                 <Text style={{ color: "black" }}>₹{item.final_price}</Text>
    //                 <Text>{item.booking_date_time}</Text>
    //             </View>
    //         </View>
    //     );
    // };



    const renderItem = ({ item }) => {
        console.log("item---wwwww-->", item)
        // let imageData;
        // try {
        //     imageData = JSON.parse(item?.service_image)[0];
        // } catch (error) {
        //     return null;
        // }

        // const imagePath = imagebaseurl + imageData?.image_path;
        return (
            <TouchableOpacity onPress={() => navigation.navigate("Bookingdetails")}>
                <View style={styles.continer}>
                    <View>
                        {/* <Image source={{ uri: imagePath }} style={{ width: 100, height: 100, borderRadius: 10 }} resizeMode="contain" /> */}
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[styles.name,]}>{item.service_name}</Text>
                        <Text style={{ color: "black" }}>₹{item.final_price}</Text>
                        <Text>{item.booking_date_time}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }




    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Header title={"My Booking"} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: height * 0.1, marginTop: height * 0.08 }}>
                    <FlatList
                        data={data}
                        renderItem={renderTab}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View>


                    <FlatList
                        data={filteredData}
                        renderItem={renderItem}
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
            </View>
            {isLoading && <LoaderScreen isLoading={isLoading} />}
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
    },
    name: {
        color: "black",
        textAlign: "center",
        fontSize: 15,
        alignItems: "center",
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