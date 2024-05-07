import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, Image } from "react-native";
import AuthContext from "../screen/context/AuthContext";
import { imagebaseurl } from "../apiconfig/Apiconfig";
const { width, height } = Dimensions.get("screen");
const Seeall = ({ isVisible, onClose, categories }) => {

    const { issubCategories, mostpolluar } = useContext(AuthContext);
    console.log("issubCategories--->", issubCategories)
    const flatListRef = useRef(null);
    const navigation = useNavigation();
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);
    const handleMenuItemPress = (screen) => {
        onClose();
        navigation.navigate(screen);
        console.log("Pressed item with screen:", screen);
    };
    const renderItem = ({ item }) => {
        console.log("item----->", item)
        let imageData;
        try {
            imageData = JSON.parse(item.banner)[0];
        } catch (error) {
            return null;
        }

        const imagePath = imagebaseurl + imageData.image_path;
        return (
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("MostpollarDetails", { mostpolluarid: item.id })}>
                    <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                    <Text style={[styles.name,]}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Image source={require("../assets/logo/star.png")} style={styles.starIcon} />
                        <Text style={styles.likes}>{item.rating}</Text>
                    </View>
                    <Text style={{ color: "black" }}>₹{item.price}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={{ justifyContent: "flex-end", marginLeft: width * 0.8, paddingBottom: 20, marginTop: height * 0.2, }}>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={require("../assets/Icon/x-mark.png")} style={{ width: 40, height: 40 }} tintColor={"white"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Select a Category & Subcategory</Text>
                    <FlatList
                        ref={flatListRef}
                        data={mostpolluar}
                        numColumns={2}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        backgroundColor: "white",
        padding: 20,
        // borderRadius: 10,
        width: width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic"
    },
    categoryItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    categoryText: {
        fontSize: 18,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: "flex-end",
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "blue",
    },
    name: {
        fontSize: 17,
        color: "black",
        fontFamily: "Roboto-Regular",
        marginTop: 10,
        textAlign: "center"
    },
    btn: {
        columnGap: 10,
        marginHorizontal: 10,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 10
    },
    starIcon: {
        width: 14,
        height: 14,
        marginRight: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 5,
        // marginTop:10
    },
});

export default Seeall;
