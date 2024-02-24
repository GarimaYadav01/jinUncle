import React, { useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "../../compontent/Header";
import TextinputComponent from "../../compontent/TextinputComponent";
import CustomButton from "../../compontent/Custombutton";
import ApplyModal from "../../compontent/ApplyModal";
const { height, width } = Dimensions.get("screen")
const Editprofile = () => {
   

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Header title={"Edit profile"} />
            <ScrollView>
                <View style={{ alignContent: "center", alignSelf: "center", marginTop: height * 0.04 }}>
                    <TextinputComponent label={"Name"} placeholder={"Enter you name."} inputType={"person"} />
                    <TextinputComponent label={"Email"} placeholder={"Enter you email."} inputType={"email"} />
                    <TextinputComponent label={"Phone number"} placeholder={"Enter you phone number."} inputType={"phone"} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <CustomButton label={"Update Now"} size={"large"} />
                </View>

            </ScrollView>
          
        </SafeAreaView>
    );
}
export default Editprofile;