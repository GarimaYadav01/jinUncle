import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, Button, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback, Image, } from "react-native";
import CustomButton from "./Custombutton";
import CheckBox from 'react-native-check-box';
// import Modal from "react-native-modal";
const { width, height } = Dimensions.get("screen");

const ApplyModal = ({ isVisible, hideModal, handleSave, onClose }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        name: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
            swipeDirection="down"
            animationIn={"slideInUp"}
            animationOut={"bounceInDown"}
        >
            <View style={styles.modalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.modalContent}>
                        <View style={{ justifyContent: "flex-end", marginLeft: width * 0.85 }}>
                            <TouchableOpacity onPress={onClose}>

                                <Image source={require("../assets/Icon/cross.png")} resizeMode="contain" style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.line}></View>
                        <Text style={styles.modalTitle}>Add new card</Text>
                        <TextInput
                            placeholder="Name on card"
                            style={styles.input}
                            onChangeText={(text) => setCardDetails({ ...cardDetails, name: text })}
                            placeholderTextColor={"gray"}
                        />
                        <TextInput
                            placeholder="Card number"
                            style={styles.input}
                            keyboardType="phone-pad"
                            onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
                            placeholderTextColor={"gray"}
                        />
                        <TextInput
                            placeholder="Expiry Date"
                            style={styles.input}
                            keyboardType="phone-pad"
                            onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
                            placeholderTextColor={"gray"}
                        />
                        <TextInput
                            placeholder="CVV"
                            style={styles.input}
                            keyboardType="phone-pad"
                            onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                            placeholderTextColor={"gray"}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "center", columnGap: 10 }}>
                            <CheckBox
                                checkBoxColor={isChecked ? '#004E8C' : 'black'}
                                isChecked={isChecked}
                                onClick={() => setIsChecked(!isChecked)}
                            />
                            <Text style={styles.text}>Save the card  details securely for future use except CVV</Text>
                        </View>
                        <CustomButton label={"ADD CARD"} size={"large"} onPress={onClose} backgroundColor={"#004E8C"} color={"white"} />
                    </View>
                </ScrollView>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.20)",

    },
    modalContent: {
        backgroundColor: "#F9F9F9",
        padding: 20,
        borderRadius: 10,
        width: width,
        marginTop: height * 0.35

    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        marginVertical: height * 0.02,
        color: "gray"

    },
    input: {
        borderWidth: 1,
        padding: Platform.OS === 'ios' ? 18 : 8,
        width: width * 0.9,
        backgroundColor: "#FFF",
        borderColor: "#FFF",
        marginVertical: height * 0.02,
        borderRadius: 5,
        color: "black"

    },
    line: {
        backgroundColor: "#9B9B9B",
        borderRadius: 10,
        borderWidth: 1,
        height: height * 0.01,
        width: width * 0.2,
        borderColor: "#9B9B9B",
        alignSelf: "center"

    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        width: width * 0.8,
        color: "gray"
    }
});

export default ApplyModal;
