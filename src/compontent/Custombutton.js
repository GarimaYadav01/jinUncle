import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("screen")
const CustomButton = ({ label, size, onPress, backgroundColor, color }) => {
  const buttonStyle = size === 'large' ? styles.btnLarge : styles.btnSmall;
  const textStyle = size === 'large' ? styles.textLarge : styles.textSmall;

  return (
    <View>
      <TouchableOpacity style={[styles.btn, buttonStyle, { backgroundColor: backgroundColor }]} onPress={onPress}>
        <Text style={[styles.textinput, textStyle, { color:color}]}>{label}</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 10,
  },
  btnLarge: {
    borderWidth: 1,
    width: width * 0.84,
    height: height * 0.065,
    backgroundColor: "#004E8C",
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: Platform.OS === 'android' ? 4 : 0,
    shadowOffset: { width: 2, height: 2 },
    borderColor: "#f5fffa",
    // marginVertical: height * 0.03,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10
  },
  btnSmall: {
    borderWidth: 1,
    width: width * 0.45,
    height: height * 0.065,
    backgroundColor: "#004E8C",
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: Platform.OS === 'android' ? 4 : 0,
    shadowOffset: { width: 2, height: 2 },
    borderColor: "#2d3194",
    marginVertical: height * 0.03,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10
  },
  textinput: {
    color: "#000000",
    fontSize: 22,
    fontFamily:"Roboto-BoldItalic",
    fontStyle:"normal"
    // marginVertical: 5,
  },
  textLarge: {
    color: "white",
    fontSize: 18,
    marginVertical: Platform.OS === 'android' ? height * 0.015 : height * 0.015,
    textAlign: "center",
    // padding: Platform.OS === 'android' ? 8  : 10
  },
  textSmall: {
    color: "#FFF",
    fontSize: 15,
    // padding: Platform.OS === 'android' ? 10 : 8,
    textAlign: "center",
    marginVertical: Platform.OS === 'android' ? height * 0.015 : height * 0.015,
  },
});

export default CustomButton;
