import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, Dimensions } from "react-native";
import { IMAGE } from "../assets/themes";
import CustomButton from "./Custombutton";
const { width, height } = Dimensions.get("screen")
const DeleteModal = ({ isVisible, onClose, onDelete }) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <StatusBar backgroundColor={"transparent"} translucent />
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Image source={require("../assets/authimages/cross.png")} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                            <Image source={IMAGE.orangeteddy} style={styles.productImage} resizeMode="contain" />
                        </View>
                        <Text style={styles.productName}>Teddy</Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: "row", columnGap: 30, marginLeft: 10, marginVertical: height * 0.01 }}>
                        <Image source={require("../assets/authimages/70021.png")} resizeMode="contain" style={styles.img} />
                        <Text style={styles.add}>Add to favorites</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", columnGap: 30, marginTop: 15, marginLeft: 10 }} onPress={onDelete}>
                        <Image source={require("../assets/authimages/delete.webp")} resizeMode="contain" style={styles.img} />
                        <Text style={styles.add}>Delete from the list</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        // alignItems: "center",
        width: width * 0.9,


    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 100,

    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        marginLeft: 15
    },
    productRate: {
        fontSize: 16,
        color: "black",
        marginBottom: 5,
        marginLeft: 15
    },
    productSizes: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 15
    },
    addToCartButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
    },
    addToCartButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    add: {
        fontSize: 18,
        fontStyle: "normal",
        fontFamily: "Rubik-Regular",
        fontWeight: "400"

    },
    img: {
        height: 40,
        width: 40
    }
});

export default DeleteModal;
