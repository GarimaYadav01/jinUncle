import React, { useState } from "react";
import { View, TextInput, StyleSheet, SafeAreaView, Dimensions, Text, ScrollView, Platform } from 'react-native';
import Header from "../../compontent/Header";
import CustomButton from "../../compontent/Custombutton";
import { useFormik } from 'formik';
import { useNavigation } from "@react-navigation/native";
import { updateaddress } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get('screen');

const AddressEdit = (props) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState([]);
    const validate = values => {
        const errors = {};
        if (!values.fullName) {
            errors.fullName = 'Full Name is required';
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
            fullName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
        validate,
        onSubmit: values => {
            handleupdateaddress();
            console.log(values);
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
            formdata.append("address_id", "47");
            formdata.append("name", "shahrukh");
            formdata.append("address", "Demo Address");
            formdata.append("city", "Delhi");
            formdata.append("state", "Delhi");
            formdata.append("pincode", "110086");
            formdata.append("country", "India");
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(updateaddress, requestOptions);
            console.log("Response:", response);
            const result = await response.json();
            console.log("resultupdateaddress---->", result)
            if (result.status == 200) {
                showMessage({
                    message: "update successfully adreess",
                    type: "success",
                    icon: "success"
                })
                navigation.goBack();
            }

        } catch (error) {
            console.log("error---json->", error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Adding Shipping Address"} />
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.label}>
                        Full Name
                    </Text>
                    <TextInput
                        placeholder="Enter your fullname"
                        style={styles.inputText}
                        placeholderTextColor={"gray"}
                        onChangeText={formik.handleChange('fullName')}
                        value={formik.values.fullName}

                    />
                    {formik.errors.fullName && <Text style={styles.error}>{formik.errors.fullName}</Text>}

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

export default AddressEdit;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    scrollViewContent: {
        flexGrow: 1,
        marginHorizontal: 16,
        paddingBottom: 150, // Adjust as needed
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
