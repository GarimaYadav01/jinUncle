import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, SafeAreaView, Dimensions, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Header from "../../compontent/Header";
import CheckBox from 'react-native-check-box';
import { IMAGE } from "../../assets/themes";
import { AirbnbRating } from 'react-native-ratings';
import Rateingmodal from "../../compontent/Rateingmodal";
import { addrating, ratinggetapi } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("screen");

const Rateing = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const getrating = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            const requestOptions = {
                method: "get",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            const response = await fetch(ratinggetapi, requestOptions);
            const result = await response.json();
            console.log("result--result-result-sjdj>", result)
        } catch (error) {
            console.log("error======>", error)
        }
    }


    useEffect(() => {
        getrating();
    })



    const handlesubmitrating = async (rating, message) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("booking_id", "51");
            formdata.append("message", message);
            formdata.append("rating", rating);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(addrating, requestOptions);
            const result = await response.json();
            console.log("result---addrating-->", result)
            if (result.status == 200) {
                showMessage({
                    message: "rating successfully",
                    icon: "success",
                    type: "success"
                })
            }


        } catch (error) {
            console.log("errorratingadd---->", error)
        }
    }

    const showModal = () => {
        setIsVisible(true);
    };

    const hideModal = () => {
        setIsVisible(false);
    };

    const handleSave = () => {
        hideModal();
        handlesubmitrating();
    };

    const handleRating = (rating) => {
        // Handle the rating as needed, such as saving it to state or sending it to a server
        console.log('Selected rating:', rating);
    };

    // const data = [
    //     {
    //         comment: "I loved this dress so much as soon as I tried it on I knew I had to buy it in another color. I am 5'3 about 155lbs and I carry all my weight in my upper body. When I put it on I felt like it thinned me put and I got so many compliments.",
    //         lable: "Kim Shine",
    //         date: "August 13, 2019",
    //         // icon: IMAGE.car,
    //     },
    //     {
    //         comment: "I loved this dress so much as soon as I tried it on I knew I had to buy it in another color. I am 5'3 about 155lbs and I carry all my weight in my upper body. When I put it on I felt like it thinned me put and I got so many compliments.",
    //         lable: "Kim Shine",
    //         date: "August 13, 2019",
    //         // icon: IMAGE.car,
    //     }
    // ];

    const renderReviewItem = ({ item }) => (
        <View style={styles.card}>
            {/* <Image source={IMAGE.proboy} resizeMode="contain" style={{ width: 30, height: 30, marginTop: -height * 0.07, marginRight: height * 0.08 }} /> */}
            <View style={{ marginHorizontal: 20 }}>
                <Text style={styles.kim}>{item.lable}</Text>
                <View style={styles.container2}>
                    <AirbnbRating
                        count={5}
                        defaultRating={0}
                        size={20}
                        onFinishRating={handleRating}
                    />
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.loved}>{item.comment}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        {[1, 2, 3, 4].map((index) => (
                            <Image key={index} source={item.icon} resizeMode="contain" style={{ width: 100, height: 100 }} />
                        ))}
                    </View>
                </ScrollView>
                <View style={{ flexDirection: "row", alignSelf: "center", marginLeft: width * 0.6, marginTop: height * 0.05 }}>
                    <Text>Helpful</Text>
                    {/* <Image source={require("../../assets/payment/icon.png")} resizeMode="contain" style={{ width: 30, height: 30, marginTop: -height * 0.01 }} /> */}
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView>
            <Header title={"Rating and reviews"} />
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>8 reviews</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <CheckBox
                            isChecked={isChecked}
                            onClick={() => setIsChecked(!isChecked)}
                        />
                        <Text style={styles.text}>With photo</Text>
                    </View>
                </View>
                <View style={{ marginTop: height * 0.03 }}>

                    <FlatList
                        data={data}
                        renderItem={renderReviewItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.btn} onPress={showModal}>
                        <View style={{ flexDirection: "row", alignSelf: "center", columnGap: 10 }}>
                            <Image source={require("../../assets/logo/pen.png")} resizeMode="contain" style={{ width: 25, height: 25, marginTop: -height * 0.005, tintColor: "#FFF" }} />
                            <Text style={styles.text2}>Write a review</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Rateingmodal
                    isVisible={isVisible}
                    hideModal={hideModal}
                    handleSave={handleSave}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Rateing;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 150,
    },
    content: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "gray"
    },
    text: {
        fontFamily: "Metropolis",
        fontSize: 14,
        fontWeight: "400",
        color: "black",
        margin: 8
    },
    card: {
        borderWidth: 1,
        paddingVertical: height * 0.07,
        backgroundColor: "#FFF",
        borderColor: "#FFF",
        borderRadius: 10,
        marginVertical: height * 0.01
    },
    kim: {
        fontFamily: "Metropolis",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "500",
        color: "black",
        marginTop: 10
    },
    loved: {
        fontFamily: "Metropolis",
        fontSize: 14,
        fontStyle: "normal",
        color: "#222",
        lineHeight: 22,
        width: width * 0.7
    },
    container2: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    date: {
        fontSize: 14,
        fontFamily: "Metropolis",
        fontStyle: "normal",
        color: "#9B9B9B"
    },
    btn: {
        borderWidth: 1,
        height: height * 0.05,
        width: width * 0.41,
        backgroundColor: "#004E8C",
        borderColor: "#004E8C",
        borderRadius: 50,
        textAlign: "center",
        // paddingVertical: height * 0.01,
        marginLeft: width * 0.5,
        marginTop: 15,
        justifyContent: "center",

    },
    text2: {
        fontSize: 13,
        fontFamily: "Rubik",
        fontStyle: "normal",
        color: "#FFF",
        fontWeight: "400"
    }
});
