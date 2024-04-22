import React, { useContext, useState, useEffect, useRef } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ac from "../tab/Ac";
import AuthContext from "../context/AuthContext";
import { imagebaseurl } from "../../apiconfig/Apiconfig";
import LoaderScreen from "../../compontent/LoaderScreen";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WarrantyModal from "../../compontent/WarrantyModal";
import { ICONS } from "../../assets/themes";
import CardListComponent from "../tab/CardListComponent";
const { height, width } = Dimensions.get("screen");

const SettingsScreen = ({ route }) => {
    // const { iscategories, isLoading } = useContext(AuthContext);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [selectedCategoryName, setSelectedCategoryName] = useState(null);
    const [subcategoryClicked, setSubcategoryClicked] = useState(false);
    const handleSubcategoryClick = () => {
        setSubcategoryClicked(true);
    };

    const flatListRef = useRef(null);
    const { isLoading, categoryDetail, issubCategories, iscategories } = useContext(AuthContext);
    console.log("isLoading-->", isLoading)
    console.log("issubCategoriesissubCategories----->----->", issubCategories)
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const handleCardPress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleAddButtonPress = () => {
        setShowPayment(true);
    };

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


    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
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



    const renderItem3 = ({ item }) => {
        let imageData;
        try {
            imageData = JSON.parse(item.image)[0];
        } catch (error) {
            return null;
        }
        const imagePath = imagebaseurl + imageData.image_path;
        return (
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <TouchableOpacity style={styles.btn1} onPress={handleSubcategoryClick}>
                    <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                    <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
            </View>
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
                    <View>
                        <ScrollView style={{ flexGrow: 1, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                            <View>
                                {selectedCategoryName && (
                                    <View style={{ backgroundColor: "#FFF" }}>
                                        <View style={{ marginHorizontal: 20, }}>
                                            <Text style={styles.text}>{selectedCategoryName}</Text>
                                            <Text style={{ color: "gray", fontSize: 15, lineHeight: 22 }}>{categoryDetail?.short_description}</Text>
                                            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10, marginTop: 10 }}>
                                                <Image source={require("../../assets/logo/star.png")} style={{ width: 20, height: 20 }} resizeMode="contain" />
                                                <Text style={{ color: "gray", fontSize: 16, fontWeight: "400" }}>4.48 (6.6 M bookings)</Text>
                                            </View>
                                            <TouchableOpacity style={styles.btn2} onPress={handleCardPress}>
                                                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: height * 0.01, columnGap: 10, justifyContent: "space-between", marginHorizontal: 10 }}>
                                                    <View style={{ flexDirection: "row", columnGap: 10 }}>
                                                        <Image source={require("../../assets/logo/checked.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                                        <Text style={{ color: "gray", fontFamily: "Roboto-Regular" }}>JU Cover</Text>
                                                    </View>
                                                    <Image source={ICONS.arrow} style={{ width: 30, height: 30, }} />
                                                </View>
                                                <Text style={styles.text1}>Verified quotes & 30 days warranty</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, marginTop: height * 0.02 }}>
                                    <FlatList
                                        data={issubCategories}
                                        renderItem={renderItem3}
                                        keyExtractor={item => item.id}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        ListEmptyComponent={() => (
                                            <View style={styles.emptyListContainer}>
                                                <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                                <Text style={styles.emptyListText}>No data found</Text>
                                            </View>
                                        )}
                                    />
                                </View>
                                <View style={{ marginVertical: height * 0.015 }}>
                                <CardListComponent scrollToTop={scrollToTop} />
                                </View>

                            </View>

                            <WarrantyModal visible={modalVisible} onClose={closeModal} />
                        </ScrollView>

                    </View>
                    {/* {activeTabIndex !== null && <Ac activeTab={selectedCategoryName} />} */}
                </View>
                {isLoading && <LoaderScreen isLoading={isLoading} />}
            </ScrollView>

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
    btn1: {
        // backgroundColor: "#FFF",
        columnGap: 10,
        marginHorizontal: 10,
        height: height * 0.18,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10

    },

    btn2: {
        width: width * 0.9,
        borderRadius: 10,
        borderWidth: 1,
        // height: height * 0.1,
        padding: 13,
        backgroundColor: '#F5F5F5',
        borderColor: "#dededf",
        marginVertical: height * 0.02
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
    // itemContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginBottom: 10,
    //     // backgroundColor: '#F5F5F5',
    //     padding: 5,
    //     borderRadius: 20,
    //     marginTop: height * 0.03,
    //     // borderColor:"red",
    //     borderColor: "#F5F5F5",
    //     borderWidth: 1.5,
    // },
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
    paymentcard: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: "#FFFF",
        padding: 15,
        alignContent: "center"
    },
    smallbutton: {
        height: height * 0.04,
        width: width * 0.3,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#004E8C",
        borderColor: "#004E8C",
        // marginTop: height * 0.01
    },
    textbut: {
        textAlign: "center",
        color: "white"
    },
});
