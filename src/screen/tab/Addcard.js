import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen")

const Addcard = () => {
    const addcard = [
        {
            id: "1",
            name: "Ac installtion",
            lable: "Ac",
            price: "₹500",
            image: require("../../assets/newimages/washingmachine1.png"),
        },
        {
            id: "2",
            name: " Ac installation",
            lable: "Ac",
            price: "₹1200",
            image: require("../../assets/newimages/washingmachine1.png"),
        },
        {
            id: "3",
            name: "Washing machine installtion",
            lable: "washing machine",
            price: "₹1000",
            image: require("../../assets/newimages/washingmachine1.png"),
        },

    ]

    const renderitem = ({ item }) => (
        <View style={styles.cardContainer}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardDetails}>
                <Text style={styles.cardText}>{item.name}</Text>
                <Text style={styles.cardLabel}>{item.label}</Text>
                <Text style={styles.cardPrice}>{item.price}</Text>
            </View>
        </View>
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
            <Header title={"Add to card"} />
            {/* <View style={{ justifyContent: "center", alignItems: "center", marginTop: height * 0.2 }}>
                <Text style={styles.text}>No Data Found</Text>
            </View> */}
            <View>
                <FlatList
                    data={addcard}
                    renderItem={renderitem} />
            </View>
        </SafeAreaView>

    )
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
    },
    cardLabel: {
        color: 'gray',
    },
    cardPrice: {
        marginTop: 5,
        color: 'green',
        fontWeight: 'bold',
    },
});