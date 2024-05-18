import React from "react";
import { View, TextInput, StyleSheet, SafeAreaView, Dimensions, Text, ScrollView, Platform } from 'react-native';
import Header from "../../compontent/Header";
import CustomButton from "../../compontent/Custombutton";
import { useFormik } from 'formik';
const { height, width } = Dimensions.get('screen');

const Addcardeeee = (props) => {
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
            props.navigation.navigate("PaymentScreen")
            console.log("Values----values---->", values);
        },
    });
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

export default Addcardeeee;
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
