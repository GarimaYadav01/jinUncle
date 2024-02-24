import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import { useNavigation } from "@react-navigation/native";
import { ICONS } from "../../assets/themes";
const Account = () => {
    const navigation = useNavigation();
    const buttonData = [
        {
            id: "1",
            lable: "I want to change my phone number",
            image: ICONS.arrow,
            screen: "phonenumber"
        },
        {
            id: "2",
            lable: "Where can i check my saved addresses ?",
            image: ICONS.arrow,
            screen: "Helpcenter"
        },

        {
            id: "3",
            lable: "I want to changes my email address",
            image: ICONS.arrow,
            screen: "Mybooking"
        },
        {
            id: "3",
            lable: "Where can i see my saved payment",
            image: ICONS.arrow,
            screen: "Mybooking"
        },
        

    ]
    const handleMenuItemPress = (screen) => {
        // Navigate to the specified screen
        navigation.navigate(screen);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
            <Header title={"Account"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.con}>
                    <View style={styles.container1}>
                        {buttonData.map((button, index) => (
                            <TouchableOpacity key={button.id} style={styles.buttonContainer} onPress={() => handleMenuItemPress(button.screen)}>
                                <Text style={styles.label}>{button.lable}</Text>
                                <Image source={button.image} style={styles.icon} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>

    );
}
export default Account;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    content: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        // backgroundColor: "#FFF",
        justifyContent: "space-between",
        paddingHorizontal: 20

    },
    label: {
        fontSize: 20,
        marginRight: 10,
        color: "#000"
    },
    icon: {
        width: 20,
        height: 20,
    },
});