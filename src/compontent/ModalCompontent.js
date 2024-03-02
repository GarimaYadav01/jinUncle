import React, { useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image, Dimension, Dimensions, ScrollView, FlatList, } from 'react-native';
import { ICONS } from '../assets/themes';
const { height, width } = Dimensions.get("screen")


const ModalCompontent = ({ visible, onClose, item }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        require('../assets/banner/banner.png'),
        require('../assets/banner/ACBAnner.png'),
        require('../assets/banner/ACBAnner1.png'),
        // Add more image sources as needed
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    const Allmix = [
        {
            id: "1",
            image: require("../assets/newimages/washingmachine1.png"),
            name: " washing",
            icon: require("../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "2",
            image: require("../assets/newimages/washingmachine2.png"),
            name: "cleaning",
            icon: require("../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "3",
            image: require("../assets/newimages/wahingmachine3.png"),
            name: "change the wire",
            icon: require("../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "4",
            image: require("../assets/newimages/AC1.png"),
            name: "Repair & gas refill",
            icon: require("../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "5",
            image: require("../assets/newimages/AC.png"),
            name: "Install & Uninstall",
            icon: require("../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "6",
            image: require("../assets/newimages/AC2.png"),
            name: "service",
            icon: require("../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        }
    ]

    const renderItemallmix = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10, alignContent: "center", justifyContent: "center" }}>
            <TouchableOpacity style={styles.btn1}>
                <Image source={item.image} style={{ width: 100, height: 100, borderRadius: 5 }} resizeMode="contain" />
                <Text style={[styles.name, { width: width * 0.3 }]}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                    <Image source={item.icon} style={styles.starIcon} />
                    <Text style={styles.likes}>{item.likes}</Text>
                </View>
                <Text style={{ color: "black" }}>₹258</Text>

                <TouchableOpacity style={styles.smallbutton}>
                    <Text style={styles.textbut}>Add</Text>
                </TouchableOpacity>
            </TouchableOpacity>

        </View>
    );
    const renderItemallmix2 = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10, alignContent: "center", justifyContent: "center" }}>
            <TouchableOpacity style={styles.btn1}>
                <Image source={item.image} style={{ width: 100, height: 100, borderRadius: 5 }} resizeMode="contain" />
                <Text style={[styles.name, { width: width * 0.3 }]}>{item.name}</Text>
                {/* <View style={styles.ratingContainer}>
                    <Image source={item.icon} style={styles.starIcon} />
                    <Text style={styles.likes}>{item.likes}</Text>
                </View> */}
                <Text style={{ color: "black" }}>₹258</Text>

                <TouchableOpacity style={styles.smallbutton}>
                    <Text style={styles.textbut}>Add</Text>
                </TouchableOpacity>
            </TouchableOpacity>

        </View>
    );
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={{ justifyContent: "flex-end", marginLeft: width * 0.8, paddingBottom: 20,    marginTop:height*0.05, }}>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={require("../assets/Icon/x-mark.png")} style={{ width: 40, height: 40 }} tintColor={"white"} />
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={images[currentIndex]} style={{ borderRadius: 5 }} />
                        </View>

                        <Text style={styles.text}>Ac Repair (split/ window)</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10, marginTop: 10 }}>
                            <Image source={require("../assets/logo/star.png")} style={{ width: 20, height: 20 }} resizeMode="contain" />
                            <Text style={{ color: "gray", fontFamily: "Roboto-Regular" }}>4.48 (6.6 M bookings)</Text>
                        </View>

                        <TouchableOpacity style={styles.btn}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginTop: 10, columnGap: 10, justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image source={require("../assets/Icon/check.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                    <Text style={{ color: "#004E8C", fontSize: 15, fontWeight: "bold" }}>JU Cover</Text>
                                </View>

                                <Text style={{ color: "gray", fontStyle: "normal", fontSize: 16 }}>Standard rate card</Text>
                                <Image source={ICONS.arrow} style={{ width: 30, height: 30, }} />
                            </View>
                            {/* <Text style={styles.text1}>Verified quotes & 30 days warranty</Text> */}
                        </TouchableOpacity>

                        <Text style={styles.text}>Select variant</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <FlatList
                                data={Allmix}
                                renderItem={renderItemallmix}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                        <Text style={styles.text}>Frequently added together</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <FlatList
                                data={Allmix}
                                renderItem={renderItemallmix2}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
                            <Image source={require("../assets/Icon/check.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                            <Text style={{ color: "#004E8C", fontSize: 22, fontWeight: "bold" }}>JU Cover</Text>
                        </View>

                    </ScrollView>
                </View>

            </View>

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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    closeButton: {
        marginTop: 10,
        alignSelf: 'center',
    },
    text: {
        fontSize: 23,
        color: "#000",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic",
        marginVertical: height * 0.01
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
        marginTop: height * 0.01
    },
    text1: {
        fontSize: 16,
        color: "black",
        fontFamily: "Roboto-Medium",
        fontStyle: "normal",
        marginVertical: height * 0.005
    },
    btn: {
        width: width * 0.9,
        borderRadius: 10,
        borderWidth: 1,
        // height: height * 0.06,
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderColor: "#dededf",
        marginTop: height * 0.02
    },
    btn1: {
        backgroundColor: "#FFF",
        columnGap: 10,
        marginHorizontal: 10,
        // height: height * 0.18,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 10

    },
    name: {
        fontSize: 16,
        color: "black",
        fontFamily: "Roboto-Regular",
        marginTop: 10,
        textAlign: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starIcon: {
        width: 14,
        height: 14,
        marginRight: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 5,
        // marginTop:10
    },
    smallbutton: {
        height: height * 0.03,
        width: width * 0.25,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#004E8C",
        borderColor: "#004E8C",
        marginTop: height * 0.01
    },
    textbut: {
        textAlign: "center",
        color: "white"
    }
});

export default ModalCompontent;
