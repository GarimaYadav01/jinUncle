
import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("screen")
const LogoutModal = ({ visible, onClose, onLogout }) => {
 
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you sure you want to log out?</Text>
          <Image source={require("../assets/logo/jinnlogo.png")} resizeMode='contain' style={{ width: 100, height: 100 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center" }}>
            <TouchableOpacity onPress={onClose} style={styles.btn}>
              <Text style={styles.text}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout} style={styles.btn}>
              <Text style={styles.text}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: "Roboto-MediumItalic",
    color: "black",
    fontSize: 18
  },
  btn: {
    width: width * 0.3,
    height: height * 0.06,
    borderWidth: 1,
    backgroundColor: "#004E8C",
    borderColor: "#f5fffa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    color: "#FFF",
    fontFamily: "Roboto-BoldItalic",
    fontSize: 16
  }
});
