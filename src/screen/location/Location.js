import React from "react";
import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../compontent/Custombutton";
const { width, height } = Dimensions.get("screen")
const Location = (props) => {
    return (
        <SafeAreaView>
            <View
            // style={{ backgroundColor: "#000", flex: 1 }}
            >
                <StatusBar backgroundColor="transparent" translucent={true} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#000" }}>
                    {/* <ImageBackground source={require("../../assets/Newicon/blackscreen.png")} style={styles.img}> */}
                    <View style={{ alignSelf: "center", marginVertical: height * 0.2, }}>
                        <Image source={require("../../assets/Newicon/location.png")} style={styles.images} />

                        <View style={{ marginTop: height * 0.2 }}>
                            <Text style={styles.text}>
                                Where do you want your Service?
                            </Text>
                            <CustomButton label={"At my current location"} size={"large"} backgroundColor="#9400d3" color={"white"} onPress={() => props.navigation.navigate("Location2")} />
                            <CustomButton label={"I'll enter my location manually"} size={"large"} backgroundColor="#f5fffa" color={"#9400d3"} />
                        </View>
                    </View>
                    {/* </ImageBackground> */}
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}
export default Location;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#FFFFFF"
    },
    img: {
        width: width,
        height: height
    },
    text: {
        fontSize: 20,
        fontStyle: "normal",
        color: "white",
        textAlign: "center"

    },
    images: {
        width: 200,
        height: 200,
        alignSelf: "center"
    }
});