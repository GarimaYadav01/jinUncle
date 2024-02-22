import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, Dimensions, TextInput, TouchableOpacity, Platform, ScrollView, ImageBackground } from 'react-native';
import TextinputComponent from '../../compontent/TextinputComponent';
import CustomButton from '../../compontent/Custombutton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';
const { width, height } = Dimensions.get("screen")

const SignupScreen = (props) => {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        fullname: Yup.string().required("fullname is required"),
        phonenumber: Yup.string().required("phonenumber is required"),
        confrimpassword: Yup.string().required("confrimpassword is required"),
    });
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.con}>
                <View style={{ backgroundColor: "#FFF", flex: 1 }}>
                    <StatusBar backgroundColor={"transperent"} translucent />

                    <View style={styles.container1}>
                        <Image source={require("../../assets/logo/logo.png")} style={styles.logo} resizeMode='contain' />

                        <Text style={styles.subheading}>
                            SignUp Your Account
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <Formik
                                initialValues={{ email: '', password: '', fullname: '', phonenumber: '', confrimpassword: '' }}
                                // validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    // Handle form submission
                                    console.log(values);
                                    showMessage({
                                        message: "signup successfully",
                                        icon: "success",
                                        type: "success"

                                    })
                                    props.navigation.navigate("Bottomnavigation")
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
                                    <View style={styles.contain}>
                                        <TextinputComponent inputType="person" placeholder={"Enter your fullname "} onChangeText={handleChange('fullname')}
                                            onBlur={handleBlur('fullname')}

                                            value={values.fullname} />
                                        {errors.fullname && touched.fullname && <Text style={[styles.error, { marginRight: width * 0.46 }]}>{errors.fullname}</Text>}
                                        <TextinputComponent inputType="phone" placeholder={"Enter your phone number"} onChangeText={handleChange('phonenumber')}
                                            onBlur={handleBlur('phonenumber')} value={values.phonenumber} />
                                        {errors.phonenumber && touched.phonenumber && <Text style={[styles.error, { marginRight: width * 0.4 }]}>{errors.phonenumber}</Text>}

                                        <TextinputComponent
                                            inputType="password"
                                            placeholder={"Enter your password"}
                                            secureTextEntry={true}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                        />
                                        {touched.password && errors.password && <Text style={[styles.error, { marginRight: width * 0.46 }]}>{errors.password}</Text>}
                                        <TextinputComponent inputType="password" placeholder={"Enter your confrim password"} secureTextEntry={true} onChangeText={handleChange('confrimpassword')}
                                            onBlur={handleBlur('confrimpassword')}
                                            value={values.confrimpassword} />
                                        {touched.confrimpassword && errors.confrimpassword && <Text style={styles.error}>{errors.confrimpassword}</Text>}
                                        <View style={{ marginTop: height * 0.03 }}>
                                            <CustomButton label={"Continue"} size={"large"} onPress={handleSubmit} />
                                        </View>
                                        <View style={{ flexDirection: "row", columnGap: 20, marginTop: 10, justifyContent: "center", alignItems: "center" }}>
                                            {/* <Image source={require("../../assets/Icon/whatsapp.png")} style={{ width: 30, height: 30 }} /> */}
                                            {/* <Text style={styles.whatsapp}>
                                                Whatsapp
                                            </Text> */}
                                        </View>
                                    </View>
                                )}
                            </Formik>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
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
        color: "#FFF",
        fontFamily: "Rubik-Bold"
    },
    container1: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: height * 0.07,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "pink"
    },
    logo: {
        width: width * 0.8,
        height: height * 0.08
    },
    subheading: {
        color: "#000",
        fontSize: 30,
        fontWeight: "400",
        marginTop: height*0.04,
        fontFamily: "Rubik-Regular"
        
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        marginRight: width * 0.33,
        fontFamily: "Rubik-Regular"
    },
    img: {
        width: width,
        height: height
    },
    contain: {
        // backgroundColor: "red",
        borderRadius: 10,
        width: width * 0.9,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.02,
        padding: 30
    },
    con: {
        flexGrow: 1,
        paddingBottom: 50,

    },
    whatsapp: {
        fontStyle: "normal",
        fontSize: 20,
        fontWeight: "400",
        color: "black"


    }

});

export default SignupScreen;
