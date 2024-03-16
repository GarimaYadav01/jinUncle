import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, Dimensions, TextInput, TouchableOpacity, Platform, ScrollView, ImageBackground, Alert } from 'react-native';
import TextinputComponent from '../../compontent/TextinputComponent';
import CustomButton from '../../compontent/Custombutton';
import CodeInput from 'react-native-code-input';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from 'react-native-async-storage/async-storage';
const { width, height } = Dimensions.get("screen")

const Otp = (props) => {
    const phoneNumber = props.route.params.phoneNumber;
    console.log("Phone Number:", phoneNumber);
    const [code, setCode] = useState('');
    const [isCodeEntered, setIsCodeEntered] = useState(false);
    const navigation = useNavigation();

    const onCodeFilled = (code) => {
        setCode(code);
        setIsCodeEntered(true);
    };
    const handleVerfiotp = async () => {
        try {
            const myHeaders = new Headers();
            // myHeaders.append("token", "WlhsS01XTXlWbmxZTW14clNXcHZhVTFVVVdsTVEwcDNXVmhPZW1ReU9YbGFRMGsyU1d0R2EySlhiSFZKVTFFd1RrUlJlVTVFUlhsT1EwWkJTMmxaYkVscGQybGhSemt4WTI1TmFVOXFVVFJNUTBwcldWaFNiRmd6VW5CaVYxVnBUMmxKZVUxRVNUQk1WRUY2VEZSRk1rbEVSWGxQYWswMFQycEZOVWxwZDJsamJUbHpXbE5KTmtscVNXbE1RMHByV2xoYWNGa3lWbVpoVjFGcFQyMDFNV0pIZURrPQ==");


            const formdata = new FormData();
            formdata.append("mobile", phoneNumber);
            formdata.append("type", "2");
            formdata.append("otp", code);

            const requestOptions = {
                method: "POST",
                // headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            const response = await fetch("https://aduetechnologies.com/jinuncle/api/auth/otp_verify", requestOptions);
            const result = await response.json(); // Assuming the response is JSON
            console.log("jkdsg---->", result);
            if (response.status === 200) {
                // Store the token in AsyncStorage
                // await AsyncStorage.setItem('accessToken', result.data.access_token);

                showMessage({
                    message: "OTP verified successfully",
                    type: "success",
                    icon: "success"
                });
                navigation.navigate("Location");
            }
        } catch (error) {
            console.error("dffjjdkfkl------>", error);
        }
    }
    const handleResendOTP = async () => {
        try {


            const formdata = new FormData();
            formdata.append("mobile", phoneNumber);

            const requestOptions = {
                method: "POST",

                body: formdata,
                redirect: "follow"
            };

            const response = await fetch("https://aduetechnologies.com/jinuncle/api/auth/resend_otp", requestOptions);
            const result = await response.text();

            console.log(result);

            if (response.status === 200) {

                showMessage({
                    message: response.message,
                    type: "success",
                    icon: "success"
                })
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to resend OTP. Please try again.");
        }
    };
    const [timer, setTimer] = useState(180);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isResendVisible, setIsResendVisible] = useState(true);
    const startTimer = () => {
        setIsTimerRunning(true);
        handleResendOTP();
        setIsResendVisible(false); // Hide resend button when timer starts
        setTimer(180); // Reset timer to initial value
    };

    // Function to stop the timer
    const stopTimer = () => {
        setIsTimerRunning(false);
        setIsResendVisible(true); // Show resend button when timer stops
    };

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 0) {
                        stopTimer(); // Stop the timer when it reaches zero
                        return 0;
                    } else {
                        return prevTimer - 1; // Decrement timer by 1 second
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval); // Clear interval when timer stops
        }
        return () => clearInterval(interval); // Clear interval on unmount or when timer stops
    }, [isTimerRunning]);

    // Function to format time to minutes and seconds
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"transparent"} translucent />
            <ScrollView>
                <View style={styles.container1}>
                    <Text style={styles.header}>Otp Verification</Text>
                    <Text style={styles.subheading}>
                        Enter your  one time password +91 3746327490
                    </Text>
                    <CodeInput
                        activeColor="#004E8C"
                        inactiveColor="#000"
                        autoFocus={true}
                        inputPosition="center"
                        size={60}
                        codeLength={4}
                        onFulfill={(code) => onCodeFilled(code)}
                        containerStyle={styles.codeInputContainer}
                        codeInputStyle={styles.codeInput}
                    />
                </View>
                <View style={{ justifyContent: "flex-end", alignSelf: "center", marginLeft: width * 0.7, marginVertical: height * 0.04 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", }}>
                        {isResendVisible && (
                            <TouchableOpacity onPress={startTimer}>
                                <Text style={styles.resend}>Resend</Text>
                            </TouchableOpacity>
                        )}
                        {isTimerRunning && <Text style={styles.timer}>{formatTime(timer)}</Text>}
                    </View>
                </View>
                <CustomButton
                    size={"large"}
                    label={"Continue"}
                    onPress={handleVerfiotp}
                    backgroundColor={isCodeEntered ? "#004E8C" : "white"}
                    color={isCodeEntered ? "white" : "#004E8C"}
                    disabled={!isCodeEntered}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        // backgroundColor: "#000"
    },
    header: {
        fontSize: 40,
        // fontWeight: "500",
        color: "#000",
        fontFamily: "Roboto-BoldItalic"
    },
    container1: {
        // flex: 1,
        marginHorizontal: 20,
        marginTop: height * 0.07,
        // backgroundColor:"red"
    },
    logo: {
        width: width * 0.8,
        height: height * 0.08
    },
    subheading: {
        color: "#000",
        fontSize: 16,
        // fontWeight: "500",
        marginTop: 5,
        fontFamily: "Roboto-BoldItalic"
    },

    error: {
        color: 'red',
        fontSize: 14,
        marginTop: -5,
    },
    codeInputContainer: {
        marginTop: height * 0.06,
        columnGap: 15
    },
    codeInput: {
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
        // color: "white"
    },
    resend: {
        fontFamily: "Roboto-BoldItalic",
        fontSize: 18,
        color: "#004E8C"
    },
    timer: {
        fontSize: 14,
        fontStyle: "normal",
        color: "#004E8C"
    },
    img: {
        height: height,
        width: width
    }
});
export default Otp;
