import { Formik } from 'formik';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Image, TouchableWithoutFeedback, Platform } from 'react-native';

const { width, height } = Dimensions.get("screen");

const TextinputComponent = ({ label, placeholder, secureTextEntry, inputType, onChangeText, value, onBlur }) => {
  let imageSource;
  switch (inputType) {
    case 'email':
      imageSource = require('../assets/Icon/Email.png');
      break;
    case 'phone':
      imageSource = require('../assets/Icon/Phone.png');
      break;
    case 'person':
      imageSource = require('../assets/Icon/person.png');
      break;
    // case 'password':
    //   imageSource = require('../assets/Icon/closeyes.png'); // Default eye-closed icon
    //   break;
    default:
      imageSource = null;
  }

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (

    <Formik
      initialValues={{ [inputType]: '' }}
      // validationSchema={getValidationSchema()}
      onSubmit={(values) => {
        // Handle form submission
        console.log(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (

        <View >
          <Text style={styles.textInputLabel}>
            {label}
          </Text>
          <View style={styles.inputContainer}>
            {imageSource && (
              <Image source={imageSource} style={styles.icon} />
            )}
            <TextInput
              style={styles.inputField}
              placeholder={placeholder}
              secureTextEntry={!isPasswordVisible && secureTextEntry}
              onChangeText={onChangeText}
              onBlur={onBlur}
              value={value}
              placeholderTextColor={"#FFF"}

            />
            {inputType === 'password' && (
              <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                <Image
                  source={isPasswordVisible ? require('../assets/Icon/eyes.png') : require('../assets/Icon/closeyes.png')}
                  style={styles.eyeIcon}
                />
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.86,
    borderWidth: 1,
    paddingVertical: Platform.OS === 'ios' ? 15 : 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: "#E6E6E6",
    // marginBottom: height * 0.02,
    marginTop: 5,
    color: "black"

  },
  icon: {
    marginRight: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor:"#FFF"
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor:"#FFF"
  },
  inputField: {
    flex: 1,
    color: "#FFF"
  },
  textInputLabel: {
    color: "#393838",
    fontSize: 18,
    // marginBottom: height * 0.02,
    // marginTop: 10
  },
});

export default TextinputComponent;
