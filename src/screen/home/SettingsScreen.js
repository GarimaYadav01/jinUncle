import React, { useContext, useState, useEffect } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ac from "../tab/Ac";
import AuthContext from "../context/AuthContext";
import { imagebaseurl } from "../../apiconfig/Apiconfig";
import LoaderScreen from "../../compontent/LoaderScreen";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("screen");

const SettingsScreen = () => {
    const { iscategories, isLoading } = useContext(AuthContext);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        if (iscategories.length > 0) {
            setActiveTabIndex(0);
        }
    }, [iscategories]);

    const handleTabPress = (index, item) => {
        setActiveTabIndex(index);
        const categoryName = item.name;
        setSelectedCategoryName(categoryName);
        console.log("Category Name:", categoryName);
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
                style={[
                    styles.btn,
                    activeTabIndex === index && styles.activeTab
                ]}
                onPress={() => handleTabPress(index, item)}
            >
                <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 20 }} resizeMode="contain" />
                <Text style={[styles.name, activeTabIndex === index && { color: '#004E8C' }]}>{item.name}</Text>
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
                        keyExtractor={(item) => item.id.toString()}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyListContainer}>
                                <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                <Text style={styles.emptyListText}>No data found</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={styles.tabContent}>
                    {activeTabIndex !== null && <Ac activeTab={selectedCategoryName} />}
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
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    emptyListText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: "bold"
    },
});
