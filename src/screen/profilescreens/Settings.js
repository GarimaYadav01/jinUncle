import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Switch, Dimensions, TouchableOpacity, Modal, Button } from "react-native";
import Header from "../../compontent/Header";


const { height, width } = Dimensions.get("screen");

const Settings = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (!isEnabled) {
            openUpdateModal(); // Open the update modal when the switch is toggled to the enabled state
        }
    };

    const openDeleteModal = () => setDeleteModalVisible(true);
    const closeDeleteModal = () => setDeleteModalVisible(false);

    const openUpdateModal = () => setUpdateModalVisible(true);
    const closeUpdateModal = () => setUpdateModalVisible(false);

    const handlelogutaccount = () => {
        setDeleteModalVisible(false);
        navigation.navigate("LoginScreen")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={"Settings"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.container}>
                        <Image source={require("../../assets/Newicon/whatsapp.png")} style={{ width: 30, height: 30, }} resizeMode="contain" />
                        <Text style={styles.text}>Updates on WhatsApp {isEnabled ? 'ON' : 'OFF'}</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={openDeleteModal} style={{ flexDirection: "row", marginTop: height * 0.02, paddingHorizontal: 25, alignItems: "center" }}>
                    <Image source={require("../../assets/Icon/delete.png")} style={{ width: 30, height: 30 }} />
                    <Text style={styles.delete}>Delete Account</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Delete Account Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={closeDeleteModal}
            >
                <View style={styles.container1}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to Delete account?</Text>
                        <Image source={require("../../assets/logo/jinnlogo.png")} resizeMode='contain' style={{ width: 100, height: 100 }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "center" }}>
                            <TouchableOpacity onPress={closeDeleteModal} style={styles.btn}>
                                <Text style={styles.text1}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlelogutaccount} style={styles.btn}>
                                <Text style={styles.text1}>
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={updateModalVisible}
                onRequestClose={closeUpdateModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={closeUpdateModal} style={{ marginLeft: width * 0.6, paddingBottom: 10 }}>

                            <Image source={require("../../assets/Icon/cross.png")} resizeMode="contain" style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={[styles.modalText, { textAlign: "center" }]}>You'll receiving booking updates on whatsapp</Text>
                        <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.logo} resizeMode='contain' />
                        {/* <Button title="Close" onPress={closeUpdateModal} /> */}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    delete: {
        fontFamily: "Roboto-Regular",
        fontSize: 20
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: height * 0.04,
        paddingHorizontal: 25,
        columnGap: 10
    },
    text: {
        fontSize: 20,
        paddingRight: 27
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 10,
        width: width * 0.8,
        alignItems: "center"
    },
    logo: {
        width: 100,
        height: 100
    },
    container1: {
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
    text1: {
        color: "#FFF",
        fontFamily: "Roboto-BoldItalic",
        fontSize: 16
    }
});
