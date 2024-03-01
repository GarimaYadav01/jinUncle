import React, { useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import ApplyModal from "../../compontent/ApplyModal";
import { showMessage } from "react-native-flash-message";

const { height, width } = Dimensions.get("screen")

const Saved = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const showModal = () => {
        setIsVisible(true);
    };
    const hideModal = () => {
        setIsVisible(false);
    };
    const handlePress = () => {
        showMessage({
            message: 'Your message here',
            type: 'info',
            icon: 'info',
        });
    };
    return (
        <SafeAreaView>
            <Header title={"Account"} />
            <ScrollView>
                <View style={{ backgroundColor: "#FFF" }}>

                    <View style={{ marginHorizontal: 20 }}>


                        <Text style={styles.text}>Where Can i check my saved addresses?</Text>

                        <Text style={styles.text1}>You can check your saved address using the following ways</Text>
                        <Text style={styles.text1}>
                            1. while selecting the location on the app homescreen
                        </Text>

                        <Text style={styles.text1}>     2. Check address on the checkout screen before making payment</Text>

                        <Text style={styles.text1}>Alternatively,you can also click on the below link to check all saved address:</Text>

                        <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate("Address")}>
                            <Text style={styles.btntext
                            }>
                                My addresses
                            </Text>
                        </TouchableOpacity>

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
            <ApplyModal
                isVisible={isVisible}
                hideModal={hideModal}
                onClose={hideModal}
            // handleSave={handleSave}
            />
        </SafeAreaView>
    );
};

export default Saved;
const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        // backgroundColor: "#FFF",
        justifyContent: "space-between",
        paddingHorizontal: 20

    },
    label: {
        fontSize: 20,
        marginRight: 10,
        color: "#000"
    },
    icon: {
        width: 20,
        height: 20,
    },
    text: {
        fontStyle: "normal",
        fontSize: 20,
        color: "#000",
        marginTop: height * 0.05,
        textAlign: "center",
        fontFamily: "Roboto-Black"
    },
    text1: {
        fontSize: 16,
        fontStyle: "normal",
        textAlign: "center",
        marginVertical: height * 0.01,

    },
    btn: {
        height: height * 0.06,
        width: width * 0.6,
        borderWidth: 1,
        backgroundColor: "#004E8C",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        borderColor: "#004E8C",
        marginVertical: height * 0.03
    },
    btntext: {
        fontFamily: "Roboto-Black",
        fontSize: 17,
        color: "white",
        textAlign: "center"
    }
});