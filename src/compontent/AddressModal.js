
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import AuthContext from '../screen/context/AuthContext';

const { height, width } = Dimensions.get("screen")
const AddressModal = ({ visible, onClose, }) => {
    const navigation = useNavigation();
    const { location } = useContext(AuthContext);
    console.log("location---location->", location)

    const handlesubmit = () => {
        onClose();
        navigation.navigate("AddressEdit")
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>

                <View style={styles.modalView}>
                    <View style={{ justifyContent: "flex-end", marginLeft: width * 0.85 }}>
                        <TouchableOpacity onPress={onClose}>
                            <Image source={require("../assets/Icon/cross.png")} resizeMode="contain" style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.modalText}>Saved address</Text>
                    <TouchableOpacity onPress={handlesubmit}>
                        <View style={{ flexDirection: "row", columnGap: 10, borderBottomWidth: 1, borderBottomColor: "lightgray", paddingBottom: 10 }}>
                            <Text style={styles.text}>+</Text>
                            <Text style={styles.text}>Add another address</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: height * 0.02 }}>
                        <View style={{ flexDirection: "row", columnGap: 10, alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", columnGap: 10 }}>
                                <Text style={{ fontSize: 30, fontWeight: "bold", color: "black" }}>*</Text>
                                <Text style={styles.modalText}>Home</Text>
                            </View>
                            <TouchableOpacity>
                                <Image source={require("../assets/subimages/dots.png")} style={{ width: 15, height: 15 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 15, color: "gray", paddingBottom: 10 }}>{location}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default AddressModal;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 20,
        padding: 20,
        // alignItems: 'center',
        width: width,
        elevation: 5,
    },
    modalText: {
        // marginBottom: 20,
        // textAlign: 'center',
        fontFamily: "Roboto-MediumItalic",
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: height * 0.004
    },
    btn: {
        width: width * 0.3,
        height: height * 0.06,
        borderWidth: 1,
        backgroundColor: "#004E8C",
        borderColor: "#f5fffa",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        color: "#004E8C",
        fontFamily: "Roboto-BoldItalic",
        fontSize: 17,
        fontWeight: "600",
        marginTop: height * 0.01
    }
});
