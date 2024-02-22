import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Dimensions, TextInput, TouchableOpacity, Platform, ScrollView, ImageBackground } from 'react-native';
import TextinputComponent from '../../compontent/TextinputComponent';
import CustomButton from '../../compontent/Custombutton';

import { Formik } from 'formik';
import * as Yup from 'yup';
const { width, height } = Dimensions.get("screen")

const ForgetPassword = (props) => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),

    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: "#FFF", flex: 1 }}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <ScrollView>
                    <View style={styles.container1}>
                        <Text style={styles.header}>Forget Password</Text>
                        <Text style={styles.subheading}>
                            Enter your Register email and create new password
                        </Text>
                        <Formik
                            initialValues={{ email: '', }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                // Handle form submission
                                console.log(values);
                                props.navigation.navigate("Resetpassword")
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
                                <View style={styles.contain}>
                                    <TextinputComponent
                                        inputType="email"
                                        placeholder={"Enter your Email"}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                                    <View style={{ marginTop: height * 0.03 }}>

                                        <CustomButton label={"continue"} size={"large"} onPress={handleSubmit} />
                                    </View>

                                </View>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
        backgroundColor: "#FFFFFF"
    },
    header: {
        fontSize: 30,
        fontWeight: "500",
        color: "#000",
        fontFamily: "Rubik-Bold"
    },
    container1: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: height * 0.07
    },
    logo: {
        width: width * 0.8,
        height: height * 0.08
    },
    subheading: {
        color: "#000",
        fontSize: 17,
        fontWeight: "400",
        marginTop: 5,
        fontFamily: "Rubik-Regular"
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        marginRight: width * 0.54
    },
    img: {
        width: width,
        height: height
    },
    contain: {
        // backgroundColor: "#FFF",
        borderRadius: 10,
        width: width * 0.9,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.04
    },

});

export default ForgetPassword;
