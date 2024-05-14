import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, Button, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import CustomButton from "./Custombutton";
import { AirbnbRating } from 'react-native-ratings';
// import ImagePicker from 'react-native-image-crop-picker';
const { width, height } = Dimensions.get("screen");
import ImagePicker from 'react-native-image-crop-picker';

const Rateingmodal = ({ isVisible, hideModal, handleSave }) => {
    // const handleRating = (rating) => {
    //     // Handle the rating as needed, such as saving it to state or sending it to a server
    //     console.log('Selected rating:', rating);
    // };

    const [imageUris, setImageUris] = useState([]);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);



    const handleRating = (rating) => {
        setRating(rating);
    };

    const handleMessageChange = (text) => {
        setMessage(text);
    };




    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image) => {
            if (!image.cancelled) {
                setImageUris([...imageUris, image.path]);
            }
        }).catch((error) => {
            console.log('Errssssor:', error);
        });
    };

    const handleSendReview = () => {
        // Call handleSave function with rating and message as parameters
        handleSave(rating, message);
    };







    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={hideModal}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.line}></View>
                        <Text style={styles.modalTitle}>What is your rate?</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={0}
                            size={30}
                            onFinishRating={handleRating}
                        />
                        <View style={{ marginTop: height * 0.02 }}>
                            <Text style={styles.text}>Please share your opinion about the product</Text>
                            <TextInput
                                placeholder="Your review"
                                style={styles.input}
                                placeholderTextColor={"#9B9B9B"}
                                placeholderStyle={{ paddingTop: 10 }}
                                multiline={true}
                                value={message}
                                onChangeText={handleMessageChange}
                            />
                            <TouchableOpacity style={styles.btn} onPress={openCamera}>
                                <Text style={[styles.text, { fontSize: 10 }]}>Add your photos</Text>
                            </TouchableOpacity>
                        </View>
                        <CustomButton label={"SEND REVIEW"} size={"large"} onPress={handleSendReview} backgroundColor={"#004E8C"} color={"white"} />
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.20)",

    },
    modalContent: {
        backgroundColor: "#F9F9F9",
        padding: 20,
        borderRadius: 10,
        width: width,
        marginTop: height * 0.35

    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        marginVertical: height * 0.01,
        color: "black"

    },
    // input: {
    //     borderWidth: 1,
    //     padding: Platform.OS === 'ios' ? 18 : 8,
    //     width: width * 0.9,
    //     backgroundColor: "#FFF",
    //     borderColor: "#FFF",
    //     marginVertical: height * 0.02,
    //     borderRadius: 5,
    //     color: "black"

    // },
    line: {
        backgroundColor: "#9B9B9B",
        borderRadius: 10,
        borderWidth: 1,
        height: height * 0.01,
        width: width * 0.2,
        borderColor: "#9B9B9B",
        alignSelf: "center"
    },
    text: {
        fontFamily: "Metropolis",
        fontSize: 18,
        alignSelf: "center",
        width: width * 0.7,
        textAlign: "center",
        color: "gray"

    },
    input: {
        height: height * 0.15,
        borderWidth: 1,
        width: width * 0.9,
        backgroundColor: "#FFF",
        borderColor: "#FFF",
        marginVertical: height * 0.01,
        borderRadius: 10,
        paddingBottom: height * 0.08,
        color: "black"
    },
    btn: {
        paddingVertical: 10,
        backgroundColor: "#FFF",
        borderColor: "#FFF",
        borderWidth: 1,
        width: width * 0.3,
        // paddingBottom: height * 0.08

    }
});

export default Rateingmodal;
