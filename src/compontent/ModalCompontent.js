import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("screen")

const ModalCompontent = ({ visible, onClose, item }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">

            <View style={styles.modalContainer}>
                <View style={{ justifyContent: "flex-end", marginLeft: width * 0.8, paddingBottom: 20 }}>
                    <Image source={require("../assets/Icon/x-mark.png")} style={{ width: 40, height: 40 }} tintColor={"white"} />
                </View>

                <View style={styles.modalContent}>
                    <Text style={styles.text}>JU COVER </Text>
                    <Text style={styles.subtext}>End-to-end serivce protection </Text>

                    <View style={styles.con}>
                        <Text>30 day warranty on repairs</Text>

                        <View>
<Text>Free repairs if the same issue arises</Text>
                        </View>
                    
                    </View>
                    <Text>Starts: </Text>
                    <Text>Label: </Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width
    },
    closeButton: {
        marginTop: 10,
        alignSelf: 'center',
    },
    text: {
        fontSize: 27,
        color: "#004E8C",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic"
    },
    subtext: {
        fontSize: 16,
        color: 'gray',
        fontFamily: "Roboto-Regular",
        fontWeight: "500"
    },
    con: {
        width: width * 0.9,
        padding: 20,
        backgroundColor: "#f0fff0"
    }
});

export default ModalCompontent;
