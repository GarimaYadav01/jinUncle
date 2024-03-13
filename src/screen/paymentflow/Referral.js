import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Header from "../../compontent/Header";
import { showMessage } from "react-native-flash-message";
import ApplyModal from "../../compontent/ApplyModal";

const { height, width } = Dimensions.get("screen")
const Referral = () => {
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
                        How does referral work ?
                    </Text>
                    <Text style={styles.sectionText}>To be eligible for the referral reward, you have to fulfil the below requirements:</Text>
                    <View>
                        <Text style={styles.sectionText}>
                            1. Your friend must be a first-time user of Urban Company
                        </Text>
                        <Text style={styles.sectionText}>
                            2. Download our mobile app and register via your referral link.
                        </Text>
                        <Text style={styles.sectionText}>
                            3. Account details must have a verified mobile number
                        </Text>
                        <Text style={styles.sectionText}>
                            Once your friend takes serivce with us , they will get instant 100 Rs off you can win upto 5000Rs in rewards
                        </Text>
                    </View>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginTop: height * 0.04 }}>
                    <View>
                        <Text style={[styles.text2, { fontSize: 20,color:"gray" }]}>Was this article helpful ?</Text>
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
export default Referral;
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
        lineHeight: 22,
        fontFamily: "Roboto-Regular",
        color:"gray"
    },
});