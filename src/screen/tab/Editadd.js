import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, SafeAreaView, Dimensions, Text, ScrollView, Platform } from 'react-native';
import Header from "../../compontent/Header";
import CustomButton from "../../compontent/Custombutton";
import { useFormik } from 'formik';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import AuthContext from "../context/AuthContext";
import { addaddress, updateaddress } from "../../apiconfig/Apiconfig";
const { height, width } = Dimensions.get('screen');

const Editadd = ({ route }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState([]);

    const { isaddress } = useContext(AuthContext);
    const adress = route?.params?.adress
    const { addressId } = route.params;

    console.log("addressId----->", addressId)
    console.log("isaddress--isaddress-->", adress)
    console.log("",)

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = ' Name is required';
        }
        if (!values.address) {
            errors.address = 'Address is required';
        }
        if (!values.city) {
            errors.city = 'City is required';
        }
        if (!values.state) {
            errors.state = 'State/Province/Region is required';
        }
        if (!values.zipCode) {
            errors.zipCode = 'Zip Code is required';
        }
        if (!values.country) {
            errors.country = 'Country is required';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: adress.name || '',
            address: adress.address || '',
            city: adress.city || '',
            state: adress.state || '',
            zipCode: adress.pincode || '',
            country: adress.country || '',
        },

        validate,
        onSubmit: values => {
            handleupdateaddress();
            console.log("install--->", values);
        },
    });
    const handleupdateaddress = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("address_id", addressId);
            formdata.append("name", formik.values.name);
            formdata.append("address", formik.values.address);
            formdata.append("city", formik.values.city);
            formdata.append("state", formik.values.state);
            formdata.append("pincode", formik.values.zipCode);
            formdata.append("country", formik.values.country);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(updateaddress, requestOptions);
            console.log("Response:", response);
            const result = await response.json();
            console.log("resultupdateaddress---->", result);
            if (result.status == 200) {
                showMessage({
                    message: " update address successfully ",
                    type: "success",
                    icon: "success"
                });
                setIsLoading(false);
                navigation.goBack();
            }
        } catch (error) {
            console.log("error---json->", error);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Adding Shipping Address"} />
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.label}>
                        Name
                    </Text>
                    <TextInput
                        placeholder="Enter your name"
                        style={styles.inputText}
                        placeholderTextColor={"gray"}
                        onChangeText={formik.handleChange('name')}
                        value={formik.values.name}

                    />
                    {formik.errors.name && <Text style={styles.error}>{formik.errors.name}</Text>}

                    <Text style={styles.label}>
                        Address
                    </Text>
                    <TextInput
                        placeholder="Enter your address"
                        style={styles.inputText}
                        placeholderTextColor={"gray"}
                        onChangeText={formik.handleChange('address')}
                        value={formik.values.address}


                    />
                    {formik.errors.address && <Text style={styles.error}>{formik.errors.address}</Text>}

                    <Text style={styles.label}>
                        City
                    </Text>
                    <TextInput
                        placeholder="Enter your city"
                        style={styles.inputText}
                        placeholderTextColor={"gray"}
                        onChangeText={formik.handleChange('city')}
                        value={formik.values.city}

                    />
                    {formik.errors.city && <Text style={styles.error}>{formik.errors.city}</Text>}

                    <Text style={styles.label}>
                        State/Province/Region
                    </Text>
                    <TextInput
                        placeholder="Enter your state/province/region"
                        style={styles.inputText}
                        placeholderTextColor={"gray"}
                        onChangeText={formik.handleChange('state')}
                        value={formik.values.state}

                    />
                    {formik.errors.state && <Text style={styles.error}>{formik.errors.state}</Text>}

                    <Text style={styles.label}>
                        Zip Code (Postal Code)
                    </Text>
                    <TextInput
                        placeholder="Enter your zip code"
                        style={styles.inputText}
                        placeholderTextColor={"gray"}
                        onChangeText={formik.handleChange('zipCode')}
                        value={formik.values.zipCode}
                    />
                    {formik.errors.zipCode && <Text style={styles.error}>{formik.errors.zipCode}</Text>}

                    <Text style={styles.label}>
                        Country
                    </Text>
                    <TextInput
                        placeholder="Enter your country"
                        style={styles.inputText}
                        placeholderTextColor={"gray"}
                        onChangeText={formik.handleChange('country')}
                        value={formik.values.country}

                    />
                    {formik.errors.country && <Text style={styles.error}>{formik.errors.country}</Text>}

                    <CustomButton label={"SAVE ADDRESS"} size={"large"} onPress={formik.handleSubmit} backgroundColor={"#004E8C"} color={"white"} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Editadd;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        marginHorizontal: 16,
        paddingBottom: 150,
    },
    label: {
        fontSize: 18,
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        marginTop: 10,
        color: "black",
    },
    inputText: {
        borderWidth: 1,
        padding: Platform.OS === 'ios' ? 18 : 10,
        width: width * 0.9,
        backgroundColor: "#FFF",
        borderColor: "#FFF",
        marginVertical: height * 0.01,
        borderRadius: 5,
        color: "black",
    },
    error: {
        color: "red"
    }
});