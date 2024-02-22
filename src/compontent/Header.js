import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, Platform, StatusBar } from "react-native";

const { height, width } = Dimensions.get("screen");

const Header = ({ title, onBackPress }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView>
      {/* <StatusBar backgroundColor={"#FFF"} barStyle={"light-content"} /> */}
      <View style={[styles.container, Platform.OS === 'ios' && styles.iosContainer]}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image source={require("../assets/Icon/left-chevron.png")} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight + 5,
    // backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },

  iosContainer: {
    // Add iOS-specific styles here
    borderBottomWidth: 1,
    // borderBottomColor: "#C0C0C0",
  },
  backIcon: {
    width: 24,
    height: 24,
    // tintColor: "#fff", 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: width * 0.1,
    textAlign: "center",
    // backgroundColor:"red"
  },
});

export default Header;
