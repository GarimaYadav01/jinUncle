import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ac from "../tab/Ac";
import Refrigerator from "../tab/Refrigerator";
import Washingmachine from "../tab/Washingmachine";
const { height, width } = Dimensions.get("screen")
const SettingsScreen = () => {
    const navigation = useNavigation();

    const data = [
        {
            id: "1",
            image: require("../../assets/banner/img2.png"),
            name: "Ac",
            screenName: "Ac"
        },
        {
            id: "2",
            image: require("../../assets/banner/img3.png"),
            name: "Refrigerator",
            screenName: "Refrigerator"

        },
        {
            id: "3",
            image: require("../../assets/banner/img-1.png"),
            name: "Washing Machine",
            screenName: "WashingMachine"

        }
    ]

    const handleTabPress = (screenName) => {
        navigation.navigate(screenName);
    };


    const [activeTab, setActiveTab] = useState(0);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.btn, activeTab === index && styles.activeTab]}
            onPress={() => {
                setActiveTab(index); // Set active tab
                handleTabPress(item.screenName); // Navigate to the selected screen
            }}

        >
            <Image source={item.image} style={{ width: 100, height: 100 }} resizeMode="contain" />
            <Text style={[styles.name, activeTab === index && { color: '#004E8C' }]}>{item.name}</Text>
        </TouchableOpacity>
    );


    const renderAdditionalContent = (tabName) => {
        switch (tabName) {
            case "Ac":
                return (
                    <View>
                        <Ac />
                    </View>
                );
            case "Refrigerator":
                return (
                    <View>
                        <Refrigerator />
                    </View>
                );
            case "Washing Machine":
                return (
                    <View>
                        <Washingmachine />
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.con}>
                    <Text style={styles.text}>Category</Text>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={styles.additionalContent}>
                    {renderAdditionalContent(data[activeTab].name)}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "#000",
        fontWeight: "500"
    },
    con: {
        marginTop: height * 0.03,
        marginHorizontal: 20
    },
    btn: {
        backgroundColor: "lightgray",
        columnGap: 10,
        marginHorizontal: 10,
        // height: height * 0.18,
        padding:10,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: height * 0.03,
        flex:1
    },
    activeTab: {
        backgroundColor: "#FFF", // Change to your active color
    },
    name: {
        fontSize: 16,
        color: "black",
        fontFamily: "Roboto-Regular",
        marginTop: 10,
        textAlign: "center"
    },
    additionalContent: {
        marginTop: height * 0.03
    }
});
