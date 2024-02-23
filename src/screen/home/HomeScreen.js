import React from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get("screen")
const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: height * 0.03, marginHorizontal: 20 }}>
                    <Image source={require("../../assets/Newicon/location.png")} style={styles.images} />
                    <TouchableOpacity>
                        <Text style={styles.text}>Janakpuri District Center</Text>
                        <Text style={[styles.text,{fontSize:14,color:"#c0c0c0"}]}>Janakpuri-Delhi- 110058-india</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require("../../assets/Newicon/add.png")} resizeMode="contain" style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                </View>
            </ScrollView>

        </SafeAreaView>

    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "#000",
        fontWeight: "500"

        // textAlign: "center"
    },
    con: {
        backgroundColor: "#000",
        // height: height * 0.15,
        width: width,
        alignSelf: "center",
        // borderRadius: 10,
        elevation: 1,
        shadowOpacity: 2,
        height: height * 0.15,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#f5fffa"

    },
    container: {
        flexGrow: 1,
        // paddingBottom: 50
    },
    img: {
        height: 150,
        width: 150,
        alignSelf: "center"
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
    images: {
        height: 30,
        width: 30,
        resizeMode: "contain"
    }
});