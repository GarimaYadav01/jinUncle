import React, { useContext, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ac from "../tab/Ac";
import AuthContext from "../context/AuthContext";
import { imagebaseurl } from "../../apiconfig/Apiconfig";
import LoaderScreen from "../../compontent/LoaderScreen";

const { height, width } = Dimensions.get("screen");

const SettingsScreen = () => {
    const { iscategories, isLoading } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState(null);

    const handleTabPress = (index) => {
        setActiveTab(index);
    };

    const renderItem = ({ item, index }) => {
        let imageData;
        try {
            imageData = JSON.parse(item.image)[0];
        } catch (error) {
            return null;
        }
        const imagePath = imagebaseurl + imageData.image_path;
        return (
            <TouchableOpacity
                style={[styles.btn, activeTab === index && styles.activeTab]}
                onPress={() => handleTabPress(index)}
            >
                <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 20 }} resizeMode="contain" />
                <Text style={[styles.name, activeTab === index && { color: '#004E8C' }]}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.text}>Category</Text>
                    <FlatList
                        data={iscategories}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={styles.tabContent}>
                    {activeTab === 0 && <Ac />}
                    {activeTab === 1 && <Ac />}
                    {activeTab === 2 && <Ac />}
                    {activeTab === 3 && <Ac />}
                    {activeTab === 4 && <Ac />}
                    {activeTab === 5 && <Ac />}
                </View>
            </ScrollView>
            {isLoading && <LoaderScreen isLoading={isLoading} />}
        </SafeAreaView>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: height * 0.03,
        marginHorizontal: 20,
    },
    text: {
        fontSize: 27,
        color: "#000",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic"
    },
    btn: {
        columnGap: 10,
        marginHorizontal: 10,
        padding: 10,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: height * 0.03,
        flex: 1
    },
    activeTab: {
        // Styles for active tab...
    },
    name: {
        fontSize: 16,
        color: "black",
        fontFamily: "Roboto-Regular",
        marginTop: 10,
        textAlign: "center"
    },
    tabContent: {
        marginTop: height * 0.03
    },
});
