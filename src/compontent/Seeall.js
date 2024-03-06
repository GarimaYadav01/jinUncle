import React, { useEffect, useRef } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList, Image } from "react-native";

const { width, height } = Dimensions.get("screen");

const Seeall = ({ isVisible, onClose, categories }) => {
    const flatListRef = useRef(null); // Ref for the FlatList

    useEffect(() => {
        // Scroll the FlatList to the bottom when it's rendered and visible
        if (isVisible) {
            // Delay scrolling for 500 milliseconds to allow the list to render
            const timer = setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn} onPress={() => handleMenuItemPress(item.screen)}>
                <Image source={item.image} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );

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
                        ref={flatListRef} // Assign the ref to the FlatList
                        data={categories}
                        numColumns={2}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
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
        // backgroundColor: "#FFF",
        columnGap: 10,
        marginHorizontal: 10,
        // height: height * 0.18,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 10

    },
});

export default Seeall;
