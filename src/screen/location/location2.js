import React, { useEffect } from "react";
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../compontent/Custombutton";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen")
const location2 = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('Location3');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigation]);
    return (
        <SafeAreaView style={{ backgroundColor: "#FFF", flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#FFFF" }}>
                <View style={{ alignSelf: "center", justifyContent: "center", marginTop: height * 0.3 }}>
                    <Image source={require("../../assets/Newicon/XOsX.gif")} style={styles.images} />
                    <Text style={styles.text}>
                        Fetching your location
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
        color: "#000",
        textAlign: "center",
        fontFamily:"Roboto-BoldItalic"

    },
    images: {
        width: 200,
        height: 230,
        alignSelf: "center"
    }
});