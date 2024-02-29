import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Header from "../../compontent/Header";
import { showMessage } from "react-native-flash-message";
import ApplyModal from "../../compontent/ApplyModal";

const { height, width } = Dimensions.get("screen")
const Secondreferral = () => {
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
                        I have not received the reward for referral
                    </Text>
                    <Text style={styles.sectionText}>You are eligible for the referral reward when :</Text>
                    <View>
                        <Text style={styles.sectionText}>
                            1. Your referral is first-time user on jinnuncle app.
                        </Text>
                        <Text style={styles.sectionText}>
                            2. They have successfully availed at least 1 serivce from us
                        </Text>

                        <Text style={styles.sectionText}>
                            Your reward will be creadited within 24 hours of serivce delivery
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
export default Secondreferral;
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
        fontFamily: "Roboto-Regular"
    },
});