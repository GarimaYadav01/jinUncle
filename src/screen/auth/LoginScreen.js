import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Dimensions, ScrollView, BackHandler, Alert, ImageBackground, Image, TextInput, } from 'react-native';
import TextinputComponent from '../../compontent/TextinputComponent';
import CustomButton from '../../compontent/Custombutton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { Loginapi } from '../../apiconfig/Apiconfig';
import { useNavigation } from '@react-navigation/native';
import LoaderScreen from '../../compontent/LoaderScreen';

const { width, height } = Dimensions.get("screen");

const LoginScreen = (props) => {
  const navigation = useNavigation();
  const [countryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("country_code", countryCode);
      formdata.append("mobile", phoneNumber);
      formdata.append("device_id", "654654654");
      // formdata.append("firebase_token", "f5s6a4f65as4f654sa56f4sa65fsaafafafa");
      const requestOptions = {
        method: "POST",
        // headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
      const response = await fetch(Loginapi, requestOptions);
      const result = await response.text();
      console.log("result------>", result);
      if (response.status == 200) {
        showMessage({
          message: "Otp send successfully",
          type: "success",
          icon: "success"
        })
        navigation.navigate('Otp', { phoneNumber: phoneNumber });
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
                handleLogin(values); // Pass the values object containing the form field values
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.contain}>
                  <View style={styles.container2}>
                    <View style={{ columnGap: 10, flexDirection: "row" }}>
                      <Image source={require("../../assets/Icon/Flag.png")} style={{ height: 20, width: 20, borderRadius: 10 }} />
                      <Text style={{ color: "black" }}>{countryCode}</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      placeholderTextColor={"gray"}
                      maxLength={10}
                      value={phoneNumber}
                      onChangeText={(value) => {
                        handleChange('phoneNumber')(value);
                        setPhoneNumber(value);
                      }}
                      name="phoneNumber"
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
      {isLoading && <LoaderScreen isLoading={isLoading} />}
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
