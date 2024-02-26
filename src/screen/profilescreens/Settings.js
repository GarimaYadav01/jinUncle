import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Switch, Dimensions } from "react-native";
import Header from "../../compontent/Header";
const { height, width } = Dimensions.get("screen");
const Settings = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={"Settings"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.container}>
                        <Image source={require("../../assets/Newicon/whatsapp.png")} style={{ width: 30, height: 30, }} resizeMode="contain" />
                        <Text style={styles.text}>Updates on whatsapp {isEnabled ? 'ON' : 'OFF'}</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: "row", marginTop:height*0.02,paddingHorizontal:25,columnGap:10}}>
                    <Image source={require("../../assets/Icon/delete.png")} style={{ width: 30, height: 30 }} />
                    <Text style={styles.delete}>Delete Account</Text>
                </View>
            </ScrollView>

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
        columnGap:10

    },
    text: {
        fontSize: 20,
        paddingRight:27
    }
});