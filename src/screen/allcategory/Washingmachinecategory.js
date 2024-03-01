import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../assets/themes";
import Header2 from "../../compontent/Header2";
import CardListComponent from "../tab/CardListComponent";
import Washingmachine from "../tab/Washingmachine";

const { height, width } = Dimensions.get("screen")

const Washingmachinecategory = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        require('../../assets/newbanners/WashingMachine.png'),
        require('../../assets/newbanners/WashingMachine1.png'),
        require('../../assets/newbanners/WashingMachine2.png'),
        // Add more image sources as needed
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            // Update the index to the next image
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    const coupon = [
        {
            id: "1",
            name: "Buy more save more",
            subname: "$100 off 2nd item onwards",
            image: require("../../assets/logo/add.png")

        },
        {
            id: "2",
            name: "Buy more save more",
            subname: "$100 off 2nd item onwards",
            image: require("../../assets/logo/brand.png")

        },
        {
            id: "3",
            name: "Buy more save more",
            subname: "$100 off 2nd item onwards",
            image: require("../../assets/logo/brand.png")

        },
        {
            id: "4",
            name: "Buy more save more",
            subname: "$100 off 2nd item onwards",
            image: require("../../assets/logo/add.png")

        },
        {
            id: "5",
            name: "Buy more save more",
            subname: "$100 off 2nd item onwards",
            image: require("../../assets/logo/brand.png")

        }
    ]

    const subcategory = [
        {
            id: "1",
            image: require("../../assets/newimages/AC1.png"),
            name: "Repair & gas refill"
        },
        {
            id: "2",
            image: require("../../assets/newimages/AC.png"),
            name: "Install & Uninstall"
        },
        {
            id: "3",
            image: require("../../assets/newimages/AC2.png"),
            name: "service"
        }
    ]
    const renderItem2 = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.subname}>{item.subname}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );

    const renderItem3 = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn1}>
                <Image source={item.image} style={{ width: 100, height: 100 }} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>

        </View>
    );
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flexGrow: 1, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                <View >
                    {/* <TextinputComponent /> */}
                    {/* <View style={styles.container1}> */}
                    <ImageBackground source={images[currentIndex]} style={styles.image1}  >
                        <Header2 />
                    </ImageBackground>
                    {/* </View> */}
                </View>
                <Washingmachine />
            </ScrollView>
        </SafeAreaView>

    );
};

export default Washingmachinecategory;
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "#000",
        fontWeight: "500",
        fontFamily: "Roboto-BoldItalic"
    },
    con: {
        marginTop: 10,
        marginHorizontal: 20
    },
    btn1: {
        backgroundColor: "#FFF",
        columnGap: 10,
        marginHorizontal: 10,
        // height: height * 0.18,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 10

    },
    activeTab: {
        backgroundColor: "#FFF", // Change to your active color
    },
    name: {
        fontSize: 16,
        color: "black",
        fontFamily: "Roboto-Regular",
        marginTop: 10,
        textAlign: "center"
    },
    btn: {
        width: width * 0.9,
        borderRadius: 10,
        borderWidth: 1,
        // height: height * 0.06,
        padding: 10,

        backgroundColor: '#F5F5F5',
        borderColor: "#dededf",
        marginTop: height * 0.02
    },
    text1: {
        color: "#000",
        fontFamily: "Roboto-Regular",
        marginHorizontal: 20,
        marginTop: 10,
        fontSize: 16
    },
    container: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 5,
        marginTop: height * 0.03
        // borderColor:"red"
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subname: {
        fontSize: 14,
        color: 'gray',
    },
    image1: {
        width: width,
        // borderRadius: 10,
        height: height * 0.2,
        alignSelf: "center"
    },
});
