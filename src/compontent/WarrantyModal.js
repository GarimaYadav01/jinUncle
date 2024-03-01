import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WarrantyModal = ({ visible, onClose, item }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <Image source={require("../assets/Icon/x-mark.png")} style={{width:20,height:20}}/>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text>Service: </Text>
                    <Text>Likes: </Text>
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
    },
    closeButton: {
        marginTop: 10,
        alignSelf: 'center',
    },
});

export default WarrantyModal;
