import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextinputComponent from "../../compontent/TextinputComponent";
const { width, height } = Dimensions.get("screen")
const HomeScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        require('../../assets/banner/banner.png'),
        require('../../assets/banner/banner2.png'),
        require('../../assets/banner/banner2.png'),
        // Add more image sources as needed
    ];

    const data = [
        {
            id: "1",
            image: require("../../assets/banner/img2.png"),
            name: "Ac"
        },
        {
            id: "2",
            image: require("../../assets/banner/img3.png"),
            name: "Refrigerator"
        },
        {
            id: "3",
            image: require("../../assets/banner/img-1.png"),
            name: "Washing Machine"
        }
    ]


    const subcategory = [
        {
            id: "1",
            image: require("../../assets/subimages/gas.webp"),
            name: "Repair & gas refill"
        },
        {
            id: "2",
            image: require("../../assets/subimages/repair.jpg"),
            name: "Install & Uninstall"
        },
        {
            id: "3",
            image: require("../../assets/subimages/image.jpeg"),
            name: "service"
        }
    ]

    const subcategoryfridge = [
        {
            id: "1",
            image: require("../../assets/subimages/singledoor.jpeg"),
            name: "Single door"
        },
        {
            id: "2",
            image: require("../../assets/subimages/doubledoor.png"),
            name: "Double door"
        },
        {
            id: "3",
            image: require("../../assets/subimages/sidebyside.jpeg"),
            name: "Side by Side"
        }
    ]
    useEffect(() => {
        const interval = setInterval(() => {
            // Update the index to the next image
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change the interval duration as needed (in milliseconds)

        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []);


    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn}>
                <Image source={item.image} style={{ width: 100, height: 100 }} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>

        </View>
    );

    const renderItem2 = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn}>
                <Image source={item.image} style={{ width: 100, height: 100 }} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>

        </View>
    );
    const renderItemfridage = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn}>
                <Image source={item.image} style={{ width: 100, height: 100 }} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>

        </View>
    );


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flexGrow: 1, paddingbottom: 50 }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: height * 0.03, marginHorizontal: 20 }}>
                    {/* <Image source={require("../../assets/Newicon/location.png")} style={styles.images} /> */}
                        <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.images} />
                    <TouchableOpacity>
                        <Text style={styles.text}>Janakpuri District Center</Text>
                        <Text style={[styles.text, { fontSize: 14, color: "#c0c0c0" }]}>Janakpuri-Delhi- 110058-india</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require("../../assets/Newicon/add.png")} resizeMode="contain" style={{ width: 30, height: 30, marginLeft: 40 }} />
                    </TouchableOpacity>

                </View>

                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <Image
                            source={require("../../assets/banner/magnifying-glass.png")}
                            style={styles.searchIcon}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search..."
                            placeholderTextColor="#888"
                        />
                    </View>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    {/* <TextinputComponent /> */}
                    <View style={styles.container1}>
                        <Image source={images[currentIndex]} style={styles.image} />
                    </View>
                </View>
                <View style={styles.con}>
                    <Text style={styles.text}>Category</Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>
                            AC Repair & service
                        </Text>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList
                                data={subcategory}
                                renderItem={renderItem2}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        {/* <TextinputComponent /> */}
                        <View style={styles.container1}>
                            <Image source={images[currentIndex]} style={styles.image} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>
                            Refrigerator Repair & service
                        </Text>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList
                                data={subcategoryfridge}
                                renderItem={renderItemfridage}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
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
        marginTop: 10,
        marginHorizontal: 20

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
        height: 50,
        width: 50,
        resizeMode: "contain"
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.03,
        borderRadius: 30

    },
    image: {
        width: width * 0.95,
        borderRadius: 10
    },
    btn: {
        backgroundColor: "#FFF",
        columnGap: 10,
        marginHorizontal: 10,
        height: height * 0.18,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10

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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        width: width * 0.9,
        marginTop: 20,
        backgroundColor: "#FFF"
    },
    searchIcon: {
        height: 20,
        width: 20,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        height: 50,
        color: '#333',

    },
});
