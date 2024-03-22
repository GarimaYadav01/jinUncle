import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("screen");
const PaymentModal = ({ isVisible, onClose }) => {
    const navigation = useNavigation();
    const handleViewCard = () => {
        onClose();
        navigation.navigate("Summary");
    };

    return (
        <View >
            <Modal
                isVisible={isVisible}
                style={styles.modal}
                swipeDirection={['down']}
                // onSwipeComplete={onClose}
                // onBackdropPress={onClose}
                // onBackButtonPress={onClose}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                backdropColor='transparent'
                backdropTransitionInTiming={0}
                backdropTransitionOutTiming={0}

            >
                <View style={styles.modalContent}>
                    <View style={styles.paymentcard}>
                        <Text style={styles.text}>₹549</Text>
                        <TouchableOpacity style={styles.smallbutton} onPress={handleViewCard}>
                            <Text style={styles.textbut}>View card</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingTop: 10,
    },
    paymentcard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "black"
    },
    smallbutton: {
        height: height * 0.04,
        width: width * 0.27,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#004E8C",
        borderColor: "#004E8C",
        marginTop: height * 0.01
    },
    textbut: {
        textAlign: "center",
        color: "white"
    },
});

export default PaymentModal;
