import React, { useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import ApplyModal from "../../compontent/ApplyModal";
import { showMessage } from "react-native-flash-message";
const { height, width } = Dimensions.get("screen")
const Jucredits = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const showModal = () => {
        setIsVisible(true);
    };
    const hideModal = () => {
        setIsVisible(false);
    }; ''
    const handlePress = () => {
        showMessage({
            message: 'Your message here',
            type: 'info',
            icon: 'info',
        });
    };
    return (
        <SafeAreaView>
            <Header />
            <ScrollView>
                <View style={styles.con}>
                    <Text style={styles.text}>
                        How do i use my JU creadits ?
                    </Text >
                    <Text style={styles.text2}>Usage of Ju credits applies to specific services
                    </Text>
                    <Text style={styles.text2}>For more details, you may check by accessing our mobile app > profile > mywallet
                    </Text>
                    <Text style={styles.text2}>Activate the Usage of your creadits at the cart summary page before checking out!
                    </Text>
              
                    <TouchableOpacity style={styles.btn} onPress={() => props.navigation.navigate("Editprofile")}>
                        <Text style={styles.btntext
                        }>
                            Go to wallet
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16, marginTop: height * 0.04 }}>
                    <Text style={[styles.text2, { fontSize: 20 ,color:"gray"}]}>Was this article helpful ?</Text>
                    <TouchableOpacity onPress={showModal}>
                        <Image source={require("../../assets/Newicon/like.png")} resizeMode="contain" style={{ width: 20, height: 20, marginLeft: width * 0.2 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePress}>

                        <Image source={require("../../assets/Newicon/dont-like.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ApplyModal
                isVisible={isVisible}
                hideModal={hideModal}
                onClose={hideModal}
            // handleSave={handleSave}
            />
        </SafeAreaView>

    )
}
export default Jucredits;
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
    con: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        width: width,
        paddingHorizontal: 20,
        // paddingRight: width * 0.1,
        padding: 20
    },
    text: {
        fontFamily: "Roboto-Medium",
        fontSize: 20,
        color: "black",
        marginVertical: height * 0.02
    },
    text2: {
        fontFamily: "Roboto-Medium",
        fontSize: 15,
        color: "gray",
        lineHeight: 22,
        marginTop:10
    },
    btn: {
        height: height * 0.06,
        width: width * 0.6,
        borderWidth: 1,
        backgroundColor: "#004E8C",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        borderColor: "#004E8C",
        marginVertical: height * 0.03
    },
    btntext: {
        fontFamily: "Roboto-Black",
        fontSize: 17,
        color: "white",
        textAlign: "center"
    }
});