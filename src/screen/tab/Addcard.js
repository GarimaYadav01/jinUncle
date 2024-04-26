import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, FlatList, Image } from "react-native";
import Header from "../../compontent/Header";
import { carddetails } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("screen");

const Addcard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [iscardlist, setIsCardlist] = useState([]);

    const gethandlecart = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(carddetails, requestOptions);
            const result = await response.json();
            if (result.status == 200) {
                setIsCardlist(result.data);
            }
            setIsLoading(false);
        } catch (error) {
            console.log("Error fetching cart details:", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        gethandlecart();
    }, []);

    const renderitem = ({ item }) => {
        console.log("Item:", item);
        return (
            <View style={styles.cardContainer}>
                {/* Assuming item.image is the path to the image */}
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <Text style={styles.cardLabel}>{item.lable}</Text>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
            <Header title={"Add to Cart"} />
            <FlatList
                data={iscardlist}
                renderItem={renderitem}
                keyExtractor={(item) => item.cart_id.toString()}
                ListEmptyComponent={() => (
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: height * 0.2 }}>
                        <Text style={styles.text}>No Data Found</Text>
                    </View>
                )}
            />
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
