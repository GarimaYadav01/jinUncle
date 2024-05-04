import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, FlatList, Image, ScrollView } from "react-native";
import Header from "../../compontent/Header";
import { carddetails, imagebaseurl } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import LoaderScreen from "../../compontent/LoaderScreen";
const { height, width } = Dimensions.get("screen");

const Addcard = () => {
    const { iscardlist, isLoading } = useContext(AuthContext)
    console.log("iscardlist------->", iscardlist);
    const priceDetail = iscardlist?.data?.price_detail;
    const cartProducts = iscardlist?.data?.cart_products;
    console.log("priceDetail------>", priceDetail);
    console.log("cartProducts------>", cartProducts);

    const renderPriceDetail = () => {
        return Object?.entries(priceDetail)?.map(([key, value]) => (
            <View style={styles.priceDetailContainer} key={key}>
                <Text style={styles.priceDetailLabel}>{key}</Text>
                <Text style={styles.priceDetailValue}>{value}</Text>
            </View>
        ));
    };

    const renderitem = ({ item }) => {
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
            <View style={styles.cardContainer}>
                <Image source={{ uri: imagePath }} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <Text style={[styles.text1, { marginLeft: width * 0.1 }]}>quantity:{qty}</Text>
                    {/* <Text style={styles.cardPrice}>{item.varient_data}</Text> */}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
            <Header title={"Add to Cart"} />
            <ScrollView style={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <FlatList
                        data={cartProducts}
                        renderItem={renderitem}
                        keyExtractor={(item) => item.cart_id.toString()}
                        ListEmptyComponent={() => (
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: height * 0.2 }}>
                                <Text style={styles.text}>No Data Found</Text>
                            </View>
                        )}
                    />
                    <View style={styles.priceDetailSection}>
                        {/* <Text style={styles.priceDetailHeading}>Price Details</Text> */}
                        {/* {renderPriceDetail()} */}
                    </View>
                </View>
            </ScrollView>
            {isLoading && <LoaderScreen isLoading={isLoading} />}
        </SafeAreaView>
    );
}

export default Addcard;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
        marginHorizontal: 20
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
        color: "gray",
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
});
