import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Dimensions, ScrollView, BackHandler, Alert, ImageBackground, Image, TextInput } from 'react-native';
import TextinputComponent from '../../compontent/TextinputComponent';
import CustomButton from '../../compontent/Custombutton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CountryPicker from 'react-native-country-picker-modal';
import { showMessage } from 'react-native-flash-message';

const { width, height } = Dimensions.get("screen");

const LoginScreen = (props) => {
  const [countryCode, setCountryCode] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
  };

  const validationSchema = Yup.object().shape({

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
              initialValues={{ phonenumber: '', }}
              // validationSchema={validationSchema}
              onSubmit={(values) => {
                // Handle form submission
                console.log(values);
                showMessage({
                  message: "Login successfully",
                  type: "success",
                  icon: "success"
                })
                props.navigation.navigate("Otp")
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
                <View style={styles.contain}>
                  {/* <TextinputComponent inputType="phone" placeholder={"Enter your phone number"} onChangeText={handleChange('phonenumber')}
                    onBlur={handleBlur('phonenumber')} value={values.phonenumber} /> */}
                  <View style={styles.container2}>
                    <CountryPicker
                      withFlag
                      withCallingCode
                      withCallingCodeButton
                      withFilter
                      withEmoji
                      onSelect={onSelectCountry}
                      countryCode={countryCode}
                      containerButtonStyle={styles.countryPicker}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="phone-pad"
                    />
                  </View>
                  {errors.phonenumber && touched.phonenumber && <Text style={[styles.error, { marginRight: width * 0.4 }]}>{errors.phonenumber}</Text>}
                  <View style={{ marginTop: height * 0.03 }}>
                    <CustomButton label={"Verfiy phone number"} size={"large"} onPress={handleSubmit} backgroundColor={"#f5fffa"} color={"#9400d3"} />

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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  countryPicker: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    backgroundColor: "white",
    width: width * 0.9
  },
});

export default LoginScreen;
