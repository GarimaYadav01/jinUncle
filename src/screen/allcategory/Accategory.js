import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../assets/themes";
import Header2 from "../../compontent/Header2";
import CardListComponent from "../tab/CardListComponent";
import Ac from "../tab/Ac";
import AuthContext from "../context/AuthContext";
import LoaderScreen from "../../compontent/LoaderScreen";
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
