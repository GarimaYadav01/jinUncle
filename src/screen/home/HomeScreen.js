import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextinputComponent from "../../compontent/TextinputComponent";
import { useNavigation } from "@react-navigation/native";
import Applyproma from "../../compontent/Applyproma";
import ApplyModal from "../../compontent/ApplyModal";
const { width, height } = Dimensions.get("screen")
const HomeScreen = () => {
    const navigation = useNavigation();


    const [currentIndex, setCurrentIndex] = useState(0);
    // const images = [
    //     require('../../assets/banner/banner.png'),
    //     require('../../assets/banner/banner2.png'),
    //     require('../../assets/banner/banner2.png'),
    //     // Add more image sources as needed
    // ];
    const images = [
        require('../../assets/newbanners/fridgeBannner2.png'),
        require('../../assets/banner/ACBAnner.png'),
        require('../../assets/banner/ACBAnner1.png'),
        // Add more image sources as needed
    ];
    const data = [
        {
            id: "1",
            image: require("../../assets/banner/img2.png"),
            name: "Ac",
            screen: "Accategory"

        },
        {
            id: "2",
            image: require("../../assets/banner/img3.png"),
            name: "Refrigerator",
            screen: "Fridagecategory"
        },
        {
            id: "3",
            image: require("../../assets/banner/img-1.png"),
            name: "Washing Machine",
            screen: "Washingmachinecategory"
        }
    ]
    const handleMenuItemPress = (screen) => {
        // Navigate to the specified screen
        navigation.navigate(screen);
    };

    const subcategory = [
        {
            id: "1",
            image: require("../../assets/newimages/AC1.png"),
            name: "Repair & gas refill"
        },
        {
            id: "2",
            image: require("../../assets/newimages/AC.png"),
            name: "Install & Uninstall"
        },
        {
            id: "3",
            image: require("../../assets/newimages/AC2.png"),
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

    const subcategorywashingmachine = [
        {
            id: "1",
            image: require("../../assets/newimages/washingmachine1.png"),
            name: "Single door"
        },
        {
            id: "2",
            image: require("../../assets/newimages/washingmachine2.png"),
            name: "Double door"
        },
        {
            id: "3",
            image: require("../../assets/newimages/wahingmachine3.png"),
            name: "Side by Side"
        }
    ]

    const Allmix = [
        {
            id: "1",
            image: require("../../assets/newimages/washingmachine1.png"),
            name: "washing",
            icon: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "2",
            image: require("../../assets/newimages/washingmachine2.png"),
            name: "cleaning",
            icon: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "3",
            image: require("../../assets/newimages/wahingmachine3.png"),
            name: "change the wire",
            icon: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "4",
            image: require("../../assets/newimages/AC1.png"),
            name: "Repair & gas refill",
            icon: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "5",
            image: require("../../assets/newimages/AC.png"),
            name: "Install & Uninstall",
            icon: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        },
        {
            id: "6",
            image: require("../../assets/newimages/AC2.png"),
            name: "service",
            icon: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: 549,
        }
    ]
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn} onPress={() => handleMenuItemPress(item.screen)}>
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

    const renderItemallmix = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn}>
                <Image source={item.image} style={{ width: 100, height: 100,borderRadiu:10 }} resizeMode="contain" />
                <Text style={[styles.name, { width: width * 0.3 }]}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                    <Image source={item.icon} style={styles.starIcon} />
                    <Text style={styles.likes}>{item.likes}</Text>
                </View>
                <Text style={{ color: "black" }}>₹258</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flexGrow: 1, paddingbottom: 200 }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: height * 0.03, marginHorizontal: 20 }}>
                    {/* <Image source={require("../../assets/Newicon/location.png")} style={styles.images} /> */}
                    <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.images} />
                    <TouchableOpacity>
                        <Text style={styles.text}>Janakpuri District Center</Text>
                        <Text style={[styles.text, { fontSize: 14, color: "#c0c0c0", fontFamily: "Roboto-Regular", }]}>Janakpuri-Delhi- 110058-india</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity >
                            <Image source={require("../../assets/Newicon/add.png")} resizeMode="contain" style={{ width: 30, height: 30, }} />
                        </TouchableOpacity>
                    </View>
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
                {/* <View style={{ marginHorizontal: 20 }}>
                    {/* <TextinputComponent /> */}
                <View style={styles.container1}>
                    <Image source={images[currentIndex]} style={styles.image} resizeMode="contain" />
                </View>
                {/* </View> */}
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
                    {/* <View style={{ marginHorizontal: 20 }}> */}
                    {/* <TextinputComponent /> */}
                    {/* <View style={styles.container1}>
                            <Image source={images[currentIndex]} style={styles.image} />
                        </View>
                    </View> */}
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
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>
                            WashingMachine Repair & service
                        </Text>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList
                                data={subcategorywashingmachine}
                                renderItem={renderItemfridage}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 10, backgroundColor: "white", paddingBottom: 50, borderWidth: 1, borderColor: "#FFF", padding: 8, borderRadius: 10 }}>
                        <Text style={styles.text}>
                            Most booked  services
                        </Text>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <FlatList
                                data={Allmix}
                                renderItem={renderItemallmix}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>
                    {/* 
                    <View style={styles.conn}>
                        <Text>Refer and get free services</Text>
                    </View> */}
                </View>

            </ScrollView>


        </SafeAreaView>

    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic"

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
        // width: width * 0.87,
        borderRadius: 10
    },
    btn: {
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
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 5,
        // marginTop:10
    },
    starIcon: {
        width: 14,
        height: 14,
        marginRight: 5,
    },
    likes: {
        fontSize: 12,
        color: 'gray',
    },
    conn: {
        fontFamily: "Roboto-Regular"
    }
});
