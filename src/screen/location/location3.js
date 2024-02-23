import React, { useEffect } from "react";
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../compontent/Custombutton";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen")
const location2 = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('Bottomnavigation');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigation]);
    return (
        <SafeAreaView style={{ backgroundColor: "#000", flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#000" }}>
                <View style={{ alignSelf: "center", justifyContent: "center", marginTop: height * 0.3 }}>
                    <Image source={require("../../assets/Newicon/location.png")} style={styles.images} />

                    <Text style={styles.text}>
                        Kirti Shikhar Tower, 1020, 10th floor, Janakpuri District Center, Janakpuri, New Delhi, Delhi 110059
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>

    )
}
export default location2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#FFFFFF"
    },

    img: {
        width: width,
        height: height
    },
    text: {
        fontSize: 20,
        fontStyle: "normal",
        color: "white",
        textAlign: "center",
        width: width * 0.7,
        marginTop: height * 0.05

    },
    images: {
        width: 60,
        height: 60,
        alignSelf: "center"
    }
});