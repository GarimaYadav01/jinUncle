import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import { useNavigation } from "@react-navigation/native";
import { ICONS } from "../../assets/themes";
const Wallet = () => {
    const navigation = useNavigation();
    const buttonData = [
        {
            id: "1",
            lable: "I am unable to make payment",
            image: ICONS.arrow,
            screen: "Unable"
        },
        {
            id: "2",
            lable: "How do i check my wallet balance ?",
            image: ICONS.arrow,
            screen: "Gotowallet"
        },

        {
            id: "3",
            lable: "How do i use my JU Credits",
            image: ICONS.arrow,
            screen: "Jucredits"
        },
        {
            id: "4",
            lable: "Can i extend the validiy of the rewards?",
            image: ICONS.arrow,
            screen: "Validitywallet"
        },
        {
            id: "5",
            lable: "How does referral work?",
            image: ICONS.arrow,
            screen: "Referral"
        },
        {
            id: "6",
            lable: "I have not received a reward for referral ",
            image: ICONS.arrow,
            screen: "Secondreferral"
        },
        {
            id: "6",
            lable: "Where can i see my saved payment details?",
            image: ICONS.arrow,
            screen: "Checksavedpayments"
        },


    ]
    const handleMenuItemPress = (screen) => {
        // Navigate to the specified screen
        navigation.navigate(screen);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
            <Header title={"Payment & JU Credits"} />
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
export default Wallet;
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
        color: "#000",
        fontFamily: "Roboto-MediumItalic"
    },
    icon: {
        width: 20,
        height: 20,
    },
});