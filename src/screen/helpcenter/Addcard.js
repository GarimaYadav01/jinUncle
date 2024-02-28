import React from "react";
import { View, TextInput, StyleSheet, SafeAreaView, Dimensions, Text, ScrollView, Platform } from 'react-native';
import Header from "../../compontent/Header";
import CustomButton from "../../compontent/Custombutton";

const { height, width } = Dimensions.get('screen');

const Addcard = (props) => {
    
    return (
        <SafeAreaView style={styles.container}>
            <Header title={"Adding Shipping Address"} />
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.label}>
                        Full Name
                    </Text>
                    <TextInput
                        placeholder="Enter your fullname"
                        style={styles.inputText}
                    />

                    <Text style={styles.label}>
                        Address
                    </Text>
                    <TextInput
                        placeholder="Enter your address"
                        style={styles.inputText}
                    />

                    <Text style={styles.label}>
                        City
                    </Text>
                    <TextInput
                        placeholder="Enter your city"
                        style={styles.inputText}
                    />

                    <Text style={styles.label}>
                        State/Province/Region
                    </Text>
                    <TextInput
                        placeholder="Enter your state/province/region"
                        style={styles.inputText}
                    />

                    <Text style={styles.label}>
                        Zip Code (Postal Code)
                    </Text>
                    <TextInput
                        placeholder="Enter your zip code"
                        style={styles.inputText}
                    />

                    <Text style={styles.label}>
                        Country
                    </Text>
                    <TextInput
                        placeholder="Enter your country"
                        style={styles.inputText}
                    />

                    <CustomButton label={"SAVE ADDRESS"} size={"large"} onPress={() => props.navigation.goBack()}  backgroundColor={"#004E8C"} color={"white"}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Addcard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    scrollViewContent: {
        flexGrow: 1,
        marginHorizontal: 16,
        paddingBottom: 150, // Adjust as needed
    },
    label: {
        fontSize: 18,
        fontFamily: Platform.OS === 'ios' ? "Arial" : "Roboto",
        marginTop: 10,
        color: "black",
    },
    inputText: {
        borderWidth: 1,
        padding: Platform.OS === 'ios' ? 18 : 10,
        width: width * 0.9,
        backgroundColor: "#FFF",
        borderColor: "#FFF",
        marginVertical: height * 0.02,
        borderRadius: 5,
        color: "black",
    },
});
