import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Dimensions, ScrollView, BackHandler, Alert, ImageBackground, Image, TextInput } from 'react-native';
import TextinputComponent from '../../compontent/TextinputComponent';
import CustomButton from '../../compontent/Custombutton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { Loginapi } from '../../apiconfig/Apiconfig';

const { width, height } = Dimensions.get("screen");

const LoginScreen = (props) => {
  const [countryCode, setCountryCode] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("token", "WlhsS01XTXlWbmxZTW14clNXcHZhVTFVVVdsTVEwcDNXVmhPZW1ReU9YbGFRMGsyU1d0R2EySlhiSFZKVTFFd1RrUlJlVTVFUlhsT1EwWkJTMmxaYkVscGQybGhSemt4WTI1TmFVOXFVVFJNUTBwcldWaFNiRmd6VW5CaVYxVnBUMmxKZVUxRVNUQk1WRUY2VEZSRk1rbEVSWGxQYWswMFQycEZOVWxwZDJsamJUbHpXbE5KTmtscVNXbE1RMHByV2xoYWNGa3lWbVpoVjFGcFQyMDFNV0pIZURrPQ==");
      myHeaders.append("Cookie", "ci_session=2ba4714d71d91ec966b5478516d5fb1cecc1e2c7");

      const formdata = new FormData();
      formdata.append("country_code", "+91");
      formdata.append("mobile", phoneNumber);
      formdata.append("device_id", "654654654");
      formdata.append("firebase_token", "f5s6a4f65as4f654sa56f4sa65fsaafafafa");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = await fetch("https://aduetechnologies.com/jinuncle/api/auth/login", requestOptions);
      const result = await response.text();
      console.log("result------>", result);
      if (response.status == 200) {
        showMessage({
          message: response.message,
          type: "success",
          icon: "success"
        })

        props.navigation.navigate("Otp", { phoneNumber: phoneNumber })


      }

      // Handle the result here, e.g., check for success/failure and navigate accordingly
    } catch (error) {
      console.error(error);
      // Handle errors, e.g., display an error message
      Alert.alert("Error", "Failed to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleInputChange = (text) => {
    setPhoneNumber(text);
    setIsFilled(text.trim() !== '');
  };

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be at least 10 characters')
      .max(15, 'Must not exceed 15 characters'),
  });

  useEffect(() => {
    const backAction = () => {
      if (props.navigation.isFocused()) {
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [props.navigation]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#FFF", flex: 1 }}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <ScrollView>
          <View style={styles.container1}>
            <View style={{ flexDirection: "row" }}>
              <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.logo} resizeMode='contain' />
              <View>
                <Text style={[styles.text, { color: "#004E8C" }]}>
                  Jinnuncle is now
                </Text>
                <Text style={styles.header}>
                  Jinnuncle
                </Text>
                <Text style={styles.text}>Your Home Service Expert</Text>
                <Text style={[styles.text, { color: "#004E8C" }]}>Quick <Text>.</Text><Text>Affordable<Text>.</Text><Text>Trusted</Text></Text></Text>
              </View>
            </View>
            <Formik
              initialValues={{ phoneNumber: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                // Handle form submission
                handleLogin();
                // console.log(values);
                // showMessage({
                //   message: "Login successfully",
                //   type: "success",
                //   icon: "success",
                // });
                // actions.resetForm(); // Reset the form after submission
                // props.navigation.navigate("Otp");
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                <View style={styles.contain}>
                  <View style={styles.container2}>
                    {/* <CountryPicker
                      withFlag
                      withCallingCode
                      withCallingCodeButton
                      withFilter
                      withEmoji
                      onSelect={onSelectCountry}
                      countryCode={countryCode}
                      containerButtonStyle={styles.countryPicker}
                    /> */}
                    <View style={{ columnGap: 10, flexDirection: "row" }}>
                      <Image source={require("../../assets/Icon/Flag.png")} style={{ height: 20, width: 20, borderRadius: 10 }} />
                      <Text>+91</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      placeholderTextColor={"gray"}
                      // onChangeText={handleInputChange("")}
                      maxLength={10}
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                    />
                  </View>
                  {touched.phoneNumber && errors.phoneNumber &&
                    <Text style={styles.error}>{errors.phoneNumber}</Text>
                  }

                  <View style={{ marginTop: height * 0.03 }}>
                    <CustomButton
                      label={"Verify phone number"}
                      size={"large"}
                      onPress={handleSubmit}
                      // backgroundColor={isFilled ? "#004E8C" : "white"} // Change background color based on input
                      // color={isFilled ? "white" : "#004E8C"} // Change text color based on input
                      // disabled={!isFilled} // Disable button if input is not filled
                      backgroundColor={"#004E8C"}
                      color={"white"}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  header: {
    fontSize: 35,
    fontWeight: "700",
    color: "black",
    fontFamily: "Roboto-BoldItalic",
    textAlign: "center"

  },
  container1: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: height * 0.2,
    alignItems: "center",
    justifyContent: "center",
    // flexDirection:"row"
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
    // justifyContent: "flex-start",
    fontFamily: "Rubik-Regular",
    width: width * 0.8,
    marginHorizontal: 16
  },
  contain: {
    // backgroundColor: "red",
    borderRadius: 10,
    width: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.05
  },
  img: {
    width: width,
    height: height
  },
  text: {
    fontSize: 14,
    fontStyle: "normal",
    color: "black",
    fontFamily: "Roboto-MediumItalic"

  },
  logo: {
    height: 90,
    width: 90,
    // tintColor:"#FFF"
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'pink',
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    borderColor: "gray",
    borderWidth: 1,

  },
  input: {
    flex: 1,
    marginLeft: 10,
    // backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: "black"
  },

  countryPicker: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    // borderWidth: 1,
    // marginLeft: 20

  },
  // input: {
  //   flex: 1,
  //   // height: 40,
  //   marginLeft: 10,
  //   color:"black",
  //   // backgroundColor: "pink",
  //   width: width * 0.6,
  //   borderWidth: 1,
  //   alignSelf:"center",
  //   backgroundColor:"#FFF"
  // },
});

export default LoginScreen;
