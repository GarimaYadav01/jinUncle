import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Header from "../../compontent/Header";
import { showMessage } from "react-native-flash-message";
import ApplyModal from "../../compontent/ApplyModal";

const { height, width } = Dimensions.get("screen")
const Cancellation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const showModal = () => {
        setIsVisible(true);
    };
    const hideModal = () => {
        setIsVisible(false);
    }; ''
    const handlePress = () => {
        showMessage({
            message: 'Your message here',
            type: 'info',
            icon: 'info',
        });
    };
    return (
        <SafeAreaView>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.sectionTitle
                    }>
                        How to book my preferred professional?
                    </Text>
                    <Text style={styles.sectionText}>If you have already taken the serivce & rated the professional above 4 stars, You can book your preferred professional by :</Text>
                    <View>
                        <Text style={styles.sectionText}>
                            1. Adding serivces in your cart
                        </Text>
                        <Text style={styles.sectionText}>
                            2. Selecting your preferred professional from the list of professionals.
                        </Text>
                        <Text style={styles.sectionText}>
                            3. Proceed with placing the booking.
                        </Text>
                        <Text style={styles.sectionText}>
                            If the slots of your preferred professionals are not available,please proceed with placing the booking and we will try to assign you the best professional available.All our professionals are trained to deliver a high quality experience.
                        </Text>
                    </View>


                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginTop: height * 0.04 }}>
                    <View>
                        <Text style={[styles.text2, { fontSize: 20 }]}>Was this article helpful ?</Text>
                    </View>
                    <View style={{ flexDirection: "row", columnGap: 10 }}>
                        <TouchableOpacity
                        >
                            <Image source={require("../../assets/Newicon/like.png")} resizeMode="contain" style={{ width: 20, height: 20, }} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source={require("../../assets/Newicon/dont-like.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default Cancellation;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: "#FFF"
    },
    content: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        // marginBottom: 10,
        color: "black",
        fontFamily: "Roboto-Medium",
        marginVertical: height * 0.03
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight:22,
        fontFamily:"Roboto-Regular"
    },
});