import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Linking } from 'react-native'
import React, { useContext } from 'react'
import Header from '../../compontent/Header'
import SendIntentAndroid from 'react-native-send-intent';
import Clipboard from '@react-native-clipboard/clipboard';
import Navigation from '../../navigation/Navigation';
import AuthContext from '../context/AuthContext';
const { height, width } = Dimensions.get("screen")
const Refer = () => {

    const { isgetprofile } = useContext(AuthContext);
    console.log("isgetprofile--->", isgetprofile)

    const handleWhatsappPress = () => {
        const phoneNumber = "1234567890";
        const message = "Hello from my app!";
        const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        Linking.canOpenURL(whatsappUrl)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(whatsappUrl);
                } else {
                    console.error("WhatsApp is not installed on this device");
                }
            })
            .catch((err) => console.error("An error occurred", err));
    };

    const copyLinkToClipboard = async () => {
        try {
            const link = 'https://example.com'; // Replace this with your actual link
            await Clipboard.setString(link);
            Alert.alert('Link copied to clipboard', link);
        } catch (error) {
            console.error('Error copying link to clipboard:', error);
        }
    };
    return (
        <SafeAreaView>
            <Header title={"Refer & Earn"} />
            <ScrollView>
                <View style={{ marginTop: height * 0.03, marginHorizontal: 20 }}>
                    <Text style={styles.text}>Refer and get free Services</Text>
                    <Text style={styles.tex}>Invite your friends to try Urban Company serivce they get instant ₹100 once they take a</Text>
                    <Text style={[styles.text, { alignSelf: "center", marginTop: height * 0.03 }]}>Refer via</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 10 }}>
                        <View style={{ marginTop: height * 0.03 }}>
                            <TouchableOpacity onPress={handleWhatsappPress}>
                                <Image source={require("../../assets/gif/whatsapp.png")} style={{ width: 40, height: 40, marginLeft: 10 }} />
                                <Text style={styles.tex}>whatsapp</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: height * 0.03, alignSelf: "center" }}>
                            <TouchableOpacity onPress={copyLinkToClipboard}>
                                <Image source={require("../../assets/gif/link.png")} style={{ width: 45, height: 45, marginLeft: 10 }} />
                                <Text style={styles.tex}>Copy link</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: height * 0.04 }}>
                        <Text style={styles.text}>How it works?</Text>
                        <View>
                            <Text style={styles.tex}><Text style={{ color: "black", fontSize: 17, fontWeight: "bold" }}>1.</Text>invite your friends & get rewarded</Text>
                            <Text style={styles.tex}><Text style={{ color: "black", fontSize: 17, fontWeight: "bold" }}>2.</Text>they get 100 on their service is completed</Text>
                            <Text style={styles.tex}><Text style={{ color: "black", fontSize: 17, fontWeight: "bold" }}>3.</Text>you get 100 once their service is completed</Text>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Refer

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    },
    tex: {
        color: "gray",
        fontSize: 15,
        lineHeight: 22,
        marginRight: 30,
        marginTop: 10
    }
})