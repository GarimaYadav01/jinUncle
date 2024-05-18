import React, { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "../../compontent/Header";
import TextinputComponent from "../../compontent/TextinputComponent";
import CustomButton from "../../compontent/Custombutton";
import ApplyModal from "../../compontent/ApplyModal";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { Editprofileapi, getprofile } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../context/AuthContext";
import { Formik } from 'formik';
import * as Yup from 'yup';
const { height, width } = Dimensions.get("screen");

const Editprofile = () => {
    const { isgetprofile, isLoading, getProfile } = useContext(AuthContext);
    const navigation = useNavigation();

    useEffect(() => {
        const handleFocus = () => {
            getProfile();
        };
        handleFocus();
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);
        return unsubscribeFocus;
    }, []);

    const handleEditprofile = async (values) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("name", values.name);
            formdata.append("email", values.email);
            formdata.append("phone", values.phone);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(Editprofileapi, requestOptions);
            const result = await response.text();
            if (response.status == 200) {
                showMessage({
                    message: "Update profile",
                    type: "success",
                    icon: "success"
                })
                navigation.goBack();
            }
            console.log("Responseeditprofile----->", result);
        } catch (error) {
            console.error("Editprofileerror------>", error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Header title={"Edit profile"} />
            <ScrollView>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <Formik
                        initialValues={{
                            name: isgetprofile.name || '',
                            email: isgetprofile.email || '',
                            phone: isgetprofile.mobile || '',
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Name is required'),
                            email: Yup.string().email('Invalid email').required('Email is required'),
                            phone: Yup.string().required('Phone number is required'),
                        })}
                        onSubmit={(values) => {
                            handleEditprofile(values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={{ alignContent: "center", alignSelf: "center", marginTop: height * 0.04 }}>
                                <TextinputComponent
                                    label={"Name"}
                                    placeholder={"Enter your name."}
                                    inputType={"person"}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    error={errors.name}
                                />
                                {touched.name && errors.name && <Text style={{ color: "red", fontSize: 14 }}>{errors.name}</Text>}
                                <TextinputComponent
                                    label={"Email"}
                                    placeholder={"Enter your email."}
                                    inputType={"email"}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    error={errors.email}
                                />
                                {touched.email && errors.email && <Text style={{ color: "red", fontSize: 14 }}>{errors.email}</Text>}
                                <TextinputComponent
                                    label={"Phone number"}
                                    placeholder={"Enter your phone number."}
                                    inputType={"phone"}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    error={errors.phone}
                                    disabled={true}

                                />
                                {touched.phone && errors.phone && <Text style={{ color: "red", fontSize: 14 }}>{errors.phone}</Text>}
                                <View style={{ marginTop: 20 }}>
                                    <CustomButton
                                        label={"Update Now"}
                                        size={"large"}
                                        onPress={handleSubmit}
                                        backgroundColor={"#004E8C"}
                                        color={"white"}
                                    />
                                </View>
                            </View>
                        )}
                    </Formik>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Editprofile;
