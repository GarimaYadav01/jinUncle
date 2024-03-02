import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image, Dimension, Dimensions, ScrollView, } from 'react-native';
const { height, width } = Dimensions.get("screen")


const WarrantyModal = ({ visible, onClose, item }) => {
    const navigation = useNavigation();
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                <View style={styles.modalContainer}>
                    <View style={{ justifyContent: "flex-end", marginLeft: width * 0.8, paddingBottom: 20 }}>
                        <TouchableOpacity onPress={onClose}>

                            <Image source={require("../assets/Icon/x-mark.png")} style={{ width: 40, height: 40 }} tintColor={"white"} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require("../assets/Icon/check.png")} style={{ width: 30, height: 30 }} />
                            <Text style={styles.text}>JU COVER </Text>
                        </View>

                        <Text style={styles.subtext}>End-to-end serivce protection </Text>

                        <View style={styles.con}>
                            <Text style={styles.text1}>30 day warranty on repairs</Text>

                            <View>
                                <Text style={styles.text1}>Free repairs if the same issue arises</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10, marginVertical: height * 0.01 }}>
                                <Image source={require("../assets/Icon/wrench.png")} style={{ height: 20, width: 20 }} resizeMode='contain' />

                                <Text style={styles.text1}> Free repairs if the same issue arises</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10, marginVertical: height * 0.01 }}>
                                <Image source={require("../assets/Icon/flash.png")} style={{ height: 20, width: 20 }} resizeMode='contain' />
                                <Text style={styles.text1}>One-click hassle free claims</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10, marginVertical: height * 0.01 }}>
                                <Image source={require("../assets/Icon/screwdriver.png")} style={{ height: 20, width: 20 }} resizeMode='contain' />
                                <Text style={styles.text1}>Up to ₹10,000 cover if anything is damaged during the repair</Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <Image source={require("../assets/Icon/high-quality.png")} resizeMode='contain' style={{ height: 100, width: 100 }} />
                            </View>

                        </View>
                        <View style={[styles.con, { backgroundColor: "#e6e6fa" }]}>
                            <Text style={styles.text}>Fixed rate card</Text>
                            <View style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}>
                                <Image source={require("../assets/Icon/document.png")} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                <Text style={[styles.text1, { width: width * 0.7 }]}>All our prices are decided basis market stand</Text>
                            </View>
                            <View style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}>
                                <Image source={require("../assets/Icon/music.png")} resizeMode='contain' style={{ width: 25, height: 25 }} />
                                <Text style={[styles.text1, { width: width * 0.7 }]}>if you are charged different from the rate card, you reach out to our help center</Text>
                            </View>
                            <View style={{ alignItems: "center" ,marginTop:height*0.01}}>
                                <Image source={require("../assets/Icon/check2.png")} style={{ width: 100, height: 100 }} />
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate("Rateing") } style={styles.closeButton}>
                        <Text style={[styles.subtext,{color:"#004E8C"}]}>View rate</Text>
                    </TouchableOpacity>
                        </View>

                       
                        {/* <View style={styles.container}>
                        <Video
                            source={require("../assets/vedio/AirCondi..mp4")}
                            style={styles.video}
                            resizeMode="contain"
                            controls={true}
                        />
                    </View> */}
                    </View>
                </View>

            </ScrollView>


        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        // borderRadius: 10,
        width: width,
     height:height
    },
    closeButton: {
        marginTop: 10,
        // alignSelf: 'center',
        marginHorizontal:20
    },
    text: {
        fontSize: 27,
        color: "#004E8C",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic"
    },
    subtext: {
        fontSize: 16,
        color: 'gray',
        fontFamily: "Roboto-Regular",
        fontWeight: "500",
        marginVertical: height * 0.01
    },
    con: {
        width: width * 0.9,
        padding: 20,
        backgroundColor: "#f0fff0",
        marginTop: height * 0.01,
        borderRadius:10
    },
    text1: {
        fontSize: 16,
        color: "black",
        fontFamily: "Roboto-Medium",
        fontStyle: "normal",
        marginVertical: height * 0.005
    }
});

export default WarrantyModal;
