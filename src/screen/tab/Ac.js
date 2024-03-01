import React from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ICONS } from "../../assets/themes";
import Header2 from "../../compontent/Header2";
import CardListComponent from "./CardListComponent";
const { height, width } = Dimensions.get("screen")

const Ac = () => {
    const coupon = [
        {
            id: "1",
            name: "Buy more save more",
            subname: "₹100 off 2nd item onwards",
            image: require("../../assets/logo/add.png")

        },
        {
            id: "2",
            name: "Buy more save more",
            subname: "₹100 off 2nd item onwards",
            image: require("../../assets/logo/brand.png")

        },
        {
            id: "3",
            name: "Buy more save more",
            subname: "₹100 off 2nd item onwards",
            image: require("../../assets/logo/brand.png")

        },
        {
            id: "4",
            name: "Buy more save more",
            subname: "₹100 off 2nd item onwards",
            image: require("../../assets/logo/add.png")

        },
        {
            id: "5",
            name: "Buy more save more",
            subname: "₹100 off 2nd item onwards",
            image: require("../../assets/logo/brand.png")

        }
    ]



    const subcategory = [
        {
            id: "1",
            image: require("../../assets/newimages/AC1.png"),
            name: "Repair & gas refill"
        },
        {
            id: "2",
            image: require("../../assets/newimages/AC.png"),
            name: "Install & Uninstall"
        },
        {
            id: "3",
            image: require("../../assets/newimages/AC2.png"),
            name: "service"
        }
    ]
    const renderItem2 = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.subname}>{item.subname}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );

    const renderItem3 = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn1}>
                <Image source={item.image} style={{ width: 100, height: 100 }} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>

        </View>
    );
    return (
        <ScrollView style={{ flexGrow: 1, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <View>
                <View style={{ backgroundColor: "#FFF" }}>
                    <View style={{ marginHorizontal: 20, }}>
                        <Text style={styles.text}>Ac Repair & Service</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10, marginTop: 10 }}>
                            <Image source={require("../../assets/logo/star.png")} style={{ width: 20, height: 20 }} resizeMode="contain" />
                            <Text>4.48 (6.6 M bookings)</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, columnGap: 10, justifyContent: "space-between", marginHorizontal: 10 }}>
                                <View style={{ flexDirection: "row", columnGap: 10 }}>
                                    <Image source={require("../../assets/logo/checked.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                    <Text style={{ color: "gray", fontFamily: "Roboto-Regular" }}>JU Cover</Text>
                                </View>

                                <Image source={ICONS.arrow} style={{ width: 30, height: 30, }} />
                            </View>
                            <Text style={styles.text1}>Verified quotes & 30 days warranty</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={coupon}
                            renderItem={renderItem2}
                            keyExtractor={item => item.id}
                            style={styles.container}
                            horizontal
                            contentContainerStyle={{ columnGap: 10 }}
                            showsHorizontalScrollIndicator={false}

                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        data={subcategory}
                        renderItem={renderItem3}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <CardListComponent />
            </View>
        </ScrollView>


    );
};

export default Ac;
const styles = StyleSheet.create({
    text: {
        fontSize: 27,
        color: "#000",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic"
    },
    con: {
        marginTop: 10,
        marginHorizontal: 20
    },
    btn1: {
        backgroundColor: "#FFF",
        columnGap: 10,
        marginHorizontal: 10,
        height: height * 0.18,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10

    },
    activeTab: {
        backgroundColor: "#FFF", // Change to your active color
    },
    name: {
        fontSize: 17,
        color: "black",
        fontFamily: "Roboto-bold",
        marginTop: 10,
        textAlign: "center",
        fontWeight: "500"
    },
    btn: {
        width: width * 0.9,
        borderRadius: 10,
        borderWidth: 1,
        // height: height * 0.1,
        padding: 13,
        backgroundColor: '#F5F5F5',
        borderColor: "#dededf",
        marginTop: height * 0.02
    },
    text1: {
        color: "#000",
        fontFamily: "Roboto-Regular",
        marginHorizontal: 20,
        marginTop: 10,
        fontSize: 16
    },
    container: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // backgroundColor: '#F5F5F5',
        padding: 5,
        borderRadius: 20,
        marginTop: height * 0.03,
        // borderColor:"red",
        borderColor: "#F5F5F5",
        borderWidth: 1.5,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },

    subname: {
        fontSize: 14,
        color: 'gray',
        fontFamily: "Roboto-Regular",
    },
});
