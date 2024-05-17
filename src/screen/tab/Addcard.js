import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../compontent/Header";
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { carddetails, cardremove, imagebaseurl } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import LoaderScreen from "../../compontent/LoaderScreen";
import { Modal } from "react-native-paper";
const { height, width } = Dimensions.get("screen");
const Addcard = () => {
    const { iscardlist, setIsCardlist } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    console.log("iscardlist------->", iscardlist);
    const priceDetail = iscardlist?.data?.price_detail;
    const cartProducts = iscardlist?.data?.cart_products;
    console.log("priceDetail------>", priceDetail);
    console.log("cartProducts------>", cartProducts);
    const toggleDeleteModal = () => {
        setDeleteModalVisible(!deleteModalVisible);
    };
    const onDelete = (cart_id) => {
        handleremovecard(cart_id);
        // toggleDeleteModal();
    };
    const DeleteModal = () => {
        return (
            <Modal visible={deleteModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to delete?</Text>
                        <Image source={require("../../assets/logo/jinnlogo.png")} resizeMode='contain' style={{ width: 100, height: 100 }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-around", }}>
                            <TouchableOpacity onPress={toggleDeleteModal} style={[styles.btn, { backgroundColor: "white" }]}>
                                <Text style={[styles.text, { color: "text" }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onDelete} style={styles.btn}>
                                <Text style={[styles.text, { color: "white" }]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const handleremovecard = async (cart_id) => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("cart_id", cart_id);
            console.log("cartid--->", cart_id)

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(cardremove, requestOptions);
            const result = await response.json();
            if (result.status == 200) {
                // Remove the deleted card from the card list
                const updatedCardList = cartProducts.filter(card => card.cart_id !== cart_id);
                // Capture the cart_id before updating the state
                const updatedCartId = cart_id;
                setIsCardlist(prevState => ({
                    ...prevState,
                    data: {
                        ...prevState.data,
                        cart_products: updatedCardList
                    }
                }));
                setIsLoading(false);
                console.log("Deleted card with ID:", updatedCartId);
            }
            console.log("resultresultddd---->", result)
        } catch (error) {
            console.log("errorerror----->", error)
            setIsLoading(false);
        }
    }

    const renderitem = ({ item }) => {
        // const onDelete = () => {
        //     // Handle delete action
        //     console.log("Delete notification with id:", item.id);
        // };
        const renderRightActions = (progress, dragX) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [100, 0, -100],
            });
            return (
                <TouchableOpacity onPress={() => onDelete(item.cart_id)}>
                    <Image source={require("../../assets/Icon/delete.png")} style={{ width: 40, height: 40, marginTop: height * 0.08, marginRight: 15 }} tintColor={"red"} />
                </TouchableOpacity>
            );
        };

        console.log("Item:", item);
        let imageData;
        try {
            imageData = JSON.parse(item.service_image)[0];
        } catch (error) {
            return null;
        }
        const imagePath = imagebaseurl + imageData.image_path;
        console.log("imageimageimage---->", imagePath)
        let data;
        try {
            data = JSON.parse(item.varient_data)[0];
        } catch (error) {
            return null;
        }
        const qty = data.quantity;
        return (
            <GestureHandlerRootView>
                <Swipeable renderRightActions={renderRightActions}>
                    <View style={styles.cardContainer}>
                        <Image source={{ uri: imagePath }} style={styles.cardImage} />
                        <View style={styles.cardDetails}>
                            <Text style={styles.cardText}>{item.name}</Text>
                            <Text style={[styles.text1, { marginLeft: width * 0.06 }]}>quantity:{qty}</Text>
                        </View>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Header title={"Add to Cart"} />
            <ScrollView style={{ flexGrow: 1, }} showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <FlatList
                        data={cartProducts}
                        renderItem={renderitem}
                        keyExtractor={(item) => item.cart_id.toString()}
                        ListEmptyComponent={() => (
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: height * 0.2 }}>
                                <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                <Text style={styles.text}>No Data Found</Text>
                            </View>
                        )}
                    />
                    <View style={styles.priceDetailSection}>
                        <TouchableOpacity>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {isLoading && <LoaderScreen isLoading={isLoading} />}
            <DeleteModal />
        </SafeAreaView>
    );
}

export default Addcard;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignSelf: "center",

    },
    cardContainer: {
        flexDirection: 'row',
        padding: 20,
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
        backgroundColor: "#FFFF",
        width: width * 0.9,
        marginTop: height * 0.02,
        borderRadius: 20

    },
    cardImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 20
    },
    cardDetails: {
        flex: 1,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "black",
        marginLeft: 20
    },
    cardLabel: {
        color: 'black',
    },
    cardPrice: {
        marginTop: 5,
        color: 'green',
        fontWeight: 'bold',
    },
    priceDetailHeading: {
        fontSize: 20,
        color: "black",
        fontWeight: "700",
        marginHorizontal: 20
    },
    priceDetailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        columnGap: 20
    },
    priceDetailLabel: {
        color: "black",
        fontSize: 14,
        lineHeight: 22,
        marginTop: 10
    },
    priceDetailSection: {
        mafrginTop: 20
    },
    priceDetailValue: {
        color: "black",
        lineHeight: 22,
        marginTop: 10

    },
    text1: {
        fontSize: 16,
        color: "gray",
        fontFamily: "Roboto-MediumItalic",
        marginVertical: height * 0.005,
        lineHeight: 22
    },
    modalContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width * 0.8,

        marginTop: 10,
        flexGrow: 1,
        // marginHorizontal: 20,
        paddingBottom: 100,
        alignContent: "center",
        alignItems: 'center',
        // height:height


    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: "Roboto-MediumItalic",
        color: "black",
        fontSize: 18
    },
    btn: {
        width: width * 0.3,
        height: height * 0.06,
        borderWidth: 1,
        backgroundColor: "#004E8C",
        borderColor: "#f5fffa",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        color: "black",
        fontFamily: "Roboto-BoldItalic",
        fontSize: 16
    }
});
