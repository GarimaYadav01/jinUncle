import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, Dimensions, TextInput, TouchableOpacity, Platform, ScrollView, ImageBackground } from 'react-native';
import TextinputComponent from '../../compontent/TextinputComponent';
import CustomButton from '../../compontent/Custombutton';
const { width, height } = Dimensions.get("screen")
import { Formik } from 'formik';
import * as Yup from 'yup';
const Resetpassword = (props) => {
    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        onfrimpassword: Yup.string().required("Confrim password is required")
    });
    return (

        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: "#FFF", flex: 1 }}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <ScrollView>
                    <View style={styles.container1}>
                        <Text style={styles.header}>Reset Password</Text>
                        <Text style={styles.subheading}>
                            Create new password
                        </Text>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                // Handle form submission
                                console.log(values);
                                props.navigation.navigate("LoginScreen")
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
                                <View style={styles.contain}>
                                    <TextinputComponent
                                        inputType="password"
                                        placeholder={"Enter your password"}
                                        secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />

                                    {touched.password && errors.password && <Text style={[styles.error, { marginRight: width * 0.5 }]}>{errors.password}</Text>}

                                    <TextinputComponent
                                        inputType="password"
                                        // label={"Confrim password"}
                                        placeholder={"Enter your Confrim password"}
                                        secureTextEntry={true}
                                        onChangeText={handleChange('onfrimpassword')}
                                        onBlur={handleBlur('onfrimpassword')}
                                        value={values.onfrimpassword}
                                    />

                                    {touched.onfrimpassword && errors.onfrimpassword && <Text style={styles.error}>{errors.onfrimpassword}</Text>}

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
    inputfeild: {
        width: width * 0.9,
        borderWidth: 1,
        padding: 15,
        height: height * 0.08,
        borderRadius: 50,
        borderColor: "#E6E6E6"
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        marginRight: width * 0.34,
        fontFamily: "Rubik-Regular"
    },
    img: {
        width: width,
        height: height
    },
    contain: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        width: width * 0.9,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.04
    },

});

export default Resetpassword;
