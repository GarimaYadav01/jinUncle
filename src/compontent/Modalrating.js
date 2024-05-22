import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

const Modalrating = ({ isVisible, onClose, onSubmitRating }) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const handleRating = () => {
        onClose();
        onSubmitRating(rating, message);
    };

    const handleNotNow = () => {
        onClose();
    };

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Rate this service</Text>
                <View style={{ alignItems: "center" }}>
                    <Image source={require("../assets/logo/jinnlogo.png")} style={{ width: 85, height: 80 }} />
                </View>
                <View style={styles.ratingContainer}>
                    {/* Add a component to set rating */}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.notNowButton} onPress={handleNotNow}>
                        <Text style={styles.buttonText}>Not Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPress={handleRating}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center",
        color: "black"
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    notNowButton: {
        backgroundColor: '#004E8C',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    submitButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Modalrating;
