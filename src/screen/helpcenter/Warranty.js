import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import { useNavigation } from "@react-navigation/native";
import { ICONS } from "../../assets/themes";
const Warranty = () => {
    const navigation = useNavigation();
    const buttonData = [
        {
            id: "1",
            lable: "Which services are covered under UC warranty ?",
            image: ICONS.arrow,
            screen: "Services"
        },
        {
            id: "2",
            lable: "Do i have to pay for the service under warranty?",
            image: ICONS.arrow,
            screen: "Pay"
        },
    ]
    const handleMenuItemPress = (screen) => {
        // Navigate to the specified screen
        navigation.navigate(screen);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
            <Header title={"Warranty"} />
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
export default Warranty;
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