import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import CustomButton from "../../compontent/Custombutton";
import { useNavigation } from "@react-navigation/native";
import Modalrating from "../../compontent/Modalrating";
const { height, width } = Dimensions.get("screen")

const ContiuneShopping = () => {
    const navigation = useNavigation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.logo} resizeMode='contain' />
            <Text style={styles.title}>Booking Successful!</Text>
            <Text style={styles.text}>Your booking has been confirmed.</Text>
            {/* Add additional details about the booking */}
            <View style={{ marginTop: height * 0.09 }}>
                <CustomButton
                    label={"contiune"}
                    size={"large"}
                    backgroundColor={"#004E8C"}
                    color={"white"}
                    onPress={() => navigation.navigate("Mybooking")}
                // onPress={toggleModal}

                />
            </View>
            <Modalrating isVisible={isModalVisible} onClose={toggleModal} />
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
        color: "black"
    },
    logo: {
        width: 250,
        height: 250
    },
    text: {
        fontSize: 17,
        fontStyle: "normal",
        color: "gray"
    }
});

export default ContiuneShopping;
