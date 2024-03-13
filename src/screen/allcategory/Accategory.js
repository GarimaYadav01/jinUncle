import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../assets/themes";
import Header2 from "../../compontent/Header2";
import CardListComponent from "../tab/CardListComponent";
import Ac from "../tab/Ac";
const { height, width } = Dimensions.get("screen")

const Accategory = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        require('../../assets/banner/ACBAnner.png'),
        require('../../assets/banner/ACBAnner.png'),
        require('../../assets/banner/ACBAnner1.png'),
        // Add more image sources as needed
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            // Update the index to the next image
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change the interval duration as needed (in milliseconds)

        return () => clearInterval(interval); // Clear the interval on component unmount
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
            image: require("../../assets/logo/add.png")
        },
        {
            id: "3",
            name: "Buy more save more",
            subname: "$100 off 2nd item onwards",
            image: require("../../assets/logo/add.png")
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
            image: require("../../assets/logo/add.png")
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
                    <Header2 />
                    <View style={{ marginVertical: height * 0.02 }}>
                        <Image source={images[currentIndex]} style={styles.image1} />
                    </View>
                </View>
                <Ac />
            </ScrollView>
        </SafeAreaView>

    );
};

export default Accategory;
const styles = StyleSheet.create({

    image1: {
        width: width * 0.93,
        // borderRadius: 10,
        height: height * 0.18,
        alignSelf: "center",
        borderRadius: 10
    },
});
