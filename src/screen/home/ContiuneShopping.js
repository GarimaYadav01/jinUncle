import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import CustomButton from "../../compontent/Custombutton";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get("screen")

const ContiuneShopping = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/Icon/check2.png")} style={{ height: 200, width: 200 }} />
            <Text style={styles.title}>Booking Successful!</Text>
            <Text style={{}}>Your booking has been confirmed.</Text>
            {/* Add additional details about the booking */}
            <View style={{ marginVertical: height * 0.03 }}>
                <CustomButton label={"contiune"} size={"large"} backgroundColor={"#004E8C"} color={"white"} onPress={() => navigation.navigate("Bottomnavigation")} />
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default ContiuneShopping;
