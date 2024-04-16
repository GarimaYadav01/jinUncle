import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { ICONS } from "../../assets/themes";
import Header2 from "../../compontent/Header2";
import CardListComponent from "../tab/CardListComponent";
import Refrigerator from "../tab/Refrigerator";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import WarrantyModal from "../../compontent/WarrantyModal";
import LoaderScreen from "../../compontent/LoaderScreen";
import { imagebaseurl } from "../../apiconfig/Apiconfig";
const { height, width } = Dimensions.get("screen")

const Fridagecategory = ({ route }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();
    const subcategory = route?.params?.subcategory || "Default Category";
    console.log("subcategorysubcategory----->", route?.params?.subcategory)
    const { isLoading, categoryDetail, issubCategories, issubcategorydetails } = useContext(AuthContext);
    console.log("categoryDetail-->", categoryDetail)
    console.log("issubCategoriesissubCategories----->----->", issubcategorydetails)
    const images = [
        require('../../assets/newbanners/FridgeBanner.png'),
        require('../../assets/newbanners/FridgeBanner1.png'),
        require('../../assets/newbanners/fridgeBannner2.png'),
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
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
                <TouchableOpacity style={styles.btn1} >
                    <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                    <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    const imagesArray = JSON.parse(issubcategorydetails.image);
    const imageUrls = imagesArray.map(image => {
        const imagePath = imagebaseurl + image.image_path;
        // return { ...image, image_path: imagePath };
    });

    console.log("imageUrls--->", imageUrls)
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flexGrow: 1, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                <View >
                    <Header2 />
                    <View style={{ marginVertical: height * 0.02 }}>
                        <Image source={images[currentIndex]} style={styles.image1} />
                    </View>
                </View>
                <View>
                    <ScrollView style={{ flexGrow: 1, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                        <View>
                            <View style={{ backgroundColor: "#FFF" }}>
                                <View style={{ marginHorizontal: 20, }}>
                                    <Text style={styles.text}>{subcategory}</Text>
                                    <Text style={{ color: "gray", fontSize: 15, lineHeight: 22 }}>{issubcategorydetails?.short_description}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10, marginTop: 10 }}>
                                        <Image source={require("../../assets/logo/star.png")} style={{ width: 20, height: 20 }} resizeMode="contain" />
                                        <Text style={{ color: "gray", fontSize: 16, fontWeight: "400" }}>4.48 (6.6 M bookings)</Text>
                                    </View>
                                    <TouchableOpacity style={styles.btn} onPress={handleCardPress}>
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
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, marginTop: height * 0.02 }}>
                                <FlatList
                                    data={issubCategories}
                                    renderItem={renderItem3}
                                    keyExtractor={item => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                            <View style={{ marginVertical: height * 0.015 }}>
                                <CardListComponent />
                            </View>
                        </View>

                        <WarrantyModal visible={modalVisible} onClose={closeModal} />
                    </ScrollView>
                    {isLoading && <LoaderScreen isLoading={isLoading} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Fridagecategory;
const styles = StyleSheet.create({
    image1: {
        width: width * 0.93,
        // borderRadius: 10,
        height: height * 0.18,
        alignSelf: "center",
        borderRadius: 10
    },
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
        // backgroundColor: "#FFF",
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
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.03,
        borderRadius: 30
    },
});
