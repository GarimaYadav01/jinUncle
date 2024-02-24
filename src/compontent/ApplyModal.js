import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, StyleSheet, Dimensions, ScrollView, } from "react-native";
import CustomButton from "./Custombutton";
import Modal from "react-native-modal";
const { width, height } = Dimensions.get("screen");

const ApplyModal = ({ isVisible, hideModal, handleSave, onClose }) => {


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}

        >
            <View style={styles.modalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.modalContent}>
                        <View style={styles.line}></View>
                        <Text style={styles.modalTitle}>Add new card</Text>
                        <TextInput
                            placeholder="Name on card"
                            style={styles.input}
                            onChangeText={(text) => setCardDetails({ ...cardDetails, name: text })}
                        />
                        <TextInput
                            placeholder="Card number"
                            style={styles.input}
                            onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
                        />
                        <TextInput
                            placeholder="Expiry Date"
                            style={styles.input}
                            onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
                        />
                        <TextInput
                            placeholder="CVV"
                            style={styles.input}
                            onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                        />
                        {/* <Button title="Save" onPress={() => handleSave(cardDetails)} />
                     */}

                        <CustomButton label={"ADD CARD"} size={"large"} onPress={onClose} />
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
        marginVertical: height * 0.02

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

    }
});

export default ApplyModal;
