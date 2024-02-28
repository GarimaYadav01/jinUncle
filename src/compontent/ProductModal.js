import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, Dimensions } from "react-native";
import { IMAGE } from "../assets/themes";
import CustomButton from "./Custombutton";
const { width, height } = Dimensions.get("screen")

const ProductModal = ({ isVisible, onClose, product }) => {
    const { name, rate, sizes, image, color, quantiy, goToCart } = product;
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleAddToCart = () => {
        // Add logic to add the product to the cart
        // For now, just toggle the state
        setIsAddedToCart(!isAddedToCart);
    };
   

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
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        {/* <Text style={styles.closeButtonText}>X</Text> */}
                        <Image source={require("../assets/authimages/cross.png")} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    {/* <Image source={{ uri: image }} style={styles.productImage} resizeMode="contain" /> */}
                    <View style={{ alignItems: "center" }}>
                        <Image source={IMAGE.orangeteddy} style={styles.productImage} resizeMode="contain" />
                    </View>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.productRate}>{rate}</Text>
                    <Text style={styles.productRate}>quantiy
                        :<Text style={{ color: "gray", }}>{quantiy}</Text></Text>
                    <Text style={styles.productRate}>Color: <Text style={{ color: "gray", }}>{color}</Text></Text>
                    <Text style={styles.productSizes}><Text style={{ color: "black" }}>Sizes:</Text> {sizes.join(", ")}</Text>

                    <CustomButton
                        label={isAddedToCart ? "Go to Cart" : "Add to Cart"}
                        onPress={handleAddToCart}
                    />
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
        width: 200,
        height: 200,
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
});

export default ProductModal;
