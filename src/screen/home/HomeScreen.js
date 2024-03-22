import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextinputComponent from "../../compontent/TextinputComponent";
import { useNavigation } from "@react-navigation/native";
import Applyproma from "../../compontent/Applyproma";
import ApplyModal from "../../compontent/ApplyModal";
import Seeall from "../../compontent/Seeall";
import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get("screen")
const HomeScreen = (props) => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const flatListRef = useRef(null);
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentgifIndex, setCurrentgifIndex] = useState(0);
    const gif = [
        require("../../assets/gif/AC.gif"),
        require('../../assets/gif/Refrigerator.gif'),
        require('../../assets/gif/washingmachine1.gif'),
        // Add more image sources as needed
    ];
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
            // Calculate the next index to scroll to
            const nextIndex = (index + 1) % Allmix.length;
            // Scroll to the next index
            flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
            // Update the index state
            setIndex(nextIndex);
        }, 3000); // Adjust the interval duration as needed

        return () => clearInterval(interval);
    }, [index]); // Re-run effect when index changes

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentgifIndex((prevIndex) => (prevIndex + 1) % gif.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn} onPress={() => handleMenuItemPress(item.screen)}>
                <Image source={item.image} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem2 = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn} >
                <Image source={item.image} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );
    const renderItemfridage = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn}>
                <Image source={item.image} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>

        </View>
    );

    const renderItemallmix = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <TouchableOpacity style={styles.btn}>
                <Image source={item.image} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                <Text style={[styles.name,]}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                    <Image source={item.icon} style={styles.starIcon} />
                    <Text style={styles.likes}>{item.likes}</Text>
                </View>
                <Text style={{ color: "black" }}>₹258</Text>
            </TouchableOpacity>
        </View>
    );

    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const categories = [
        {
            id: "1",
            image: require("../../assets/banner/img2.png"),
            name: "Ac Repair & Serivce",
            screen: "Subcategory"

        },
        {
            id: "2",
            image: require("../../assets/banner/img3.png"),
            name: "Refrigerator",
            screen: "Subcategory"
        },
        {
            id: "3",
            image: require("../../assets/banner/img-1.png"),
            name: "Washing Machine Reapir",
            screen: "Subcategory"
        },
        {
            id: "4",
            image: require("../../assets/banner/img-1.png"),
            name: "Service",
            screen: "Subcategory"
        },
        {
            id: "5",
            image: require("../../assets/banner/img-1.png"),
            name: "Repair & gas refill ",
            screen: "Subcategory"
        },
        {
            id: "6",
            image: require("../../assets/banner/img-1.png"),
            name: "Install & uninstall",
            screen: "Subcategory"
        },
        {
            id: "3",
            image: require("../../assets/banner/img-1.png"),
            name: "Split AC",
            screen: "Subcategory"
        },
        {
            id: "7",
            image: require("../../assets/banner/img-1.png"),
            name: "Window AC",
            screen: "Subcategory"
        },

    ];
    return (
        <SafeAreaView style={{ flex: 1, paddingBottom: 20, backgroundColor: "#FFF" }}>
            <ScrollView style={{ flexGrow: 1, }} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: height * 0.03, marginHorizontal: 20 }}>
                    {/* <Image source={require("../../assets/Newicon/location.png")} style={styles.images} /> */}
                    <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.images} />
                    <TouchableOpacity>
                        <Text style={styles.text}>Janakpuri District Center</Text>
                        <Text style={[styles.text, { fontSize: 14, color: "#c0c0c0", fontFamily: "Roboto-Regular", }]}>Janakpuri-Delhi- 110058-india</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity >
                            <Image source={require("../../assets/gif/placeholder.png")} resizeMode="contain" style={{ width: 30, height: 30, }} />
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

                <View style={styles.container1}>
                    <Image source={gif[currentgifIndex]} style={styles.image} resizeMode="contain" />
                </View>


                {/* <View style={{ marginVertical: height * 0.02 }}>
                    <Swiper style={styles.wrapper} showsButtons={false} dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle}>
                        <View style={styles.slideContainer}>
                            <ImageBackground source={require("../../assets/newbanners/fridgeBannner2.png")} style={{ borderRadius: 50, width: width * 0.9, height: height * 0.2 }} resizeMode="contain" ></ImageBackground>
                        </View>
                        <View style={styles.slideContainer}>
                            <Image source={require("../../assets/banner/ACBAnner.png")} style={{ borderRadius: 20, width: width * 0.9, height: height * 0.2 }} resizeMode="contain" />
                        </View>
                        <View style={styles.slideContainer}>
                            <Image source={require("../../assets/banner/ACBAnner1.png")} style={{ borderRadius: 20, width: width * 0.9, height: height * 0.2 }} resizeMode="contain" />
                        </View>
                        <View style={styles.slideContainer}>
                            <Image source={require("../../assets/banner/ACBAnner.png")} style={{ borderRadius: 20, width: width * 0.9, height: height * 0.2 }} resizeMode="contain" />
                        </View>
                        <View style={styles.slideContainer}>
                            <Image source={require("../../assets/banner/ACBAnner1.png")} style={{ borderRadius: 20, width: width * 0.9, height: height * 0.2 }} resizeMode="contain" />
                        </View>
                    </Swiper>
                </View> */}
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
                    <View style={styles.container1}>
                        <Image source={images[currentIndex]} style={styles.image} />
                    </View>
                    <View style={{ marginTop: 10, backgroundColor: "white", borderWidth: 1, borderColor: "#FFF", padding: 5, borderRadius: 10 }}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={styles.text}>
                                Most booked  services
                            </Text>
                            <TouchableOpacity onPress={openModal}>
                                <Text style={[styles.text, { color: "#004E8C", fontSize: 17 }]}>See all</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <FlatList
                                ref={flatListRef}
                                data={Allmix}
                                renderItem={renderItemallmix}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                onMomentumScrollEnd={(event) => {
                                    // Calculate the index of the current item based on the scroll position
                                    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
                                    const newIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
                                    setIndex(newIndex);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Seeall isVisible={modalVisible} onClose={closeModal} categories={categories} />
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
    },
    con: {
        marginTop: 10,
        marginHorizontal: 20
    },
    container: {
        flexGrow: 1,
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
        width: width * 0.89,
        // height:height*0.1,
        borderRadius: 20
    },
    btn: {
        // backgroundColor: "#FFF",
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
        fontSize: 17,
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
        fontFamily: "Roboto-Regular",
        color: "gray"
    },
    wrapper: {
        height: height * 0.25,
        // borderRadius:20
    },
    dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D9D9D9',
        margin: 3,
    },
    activeDotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#004E8C',
        margin: 3,
    },
    slide1: {
        alignContent: "center",
        alignSelf: "center",
        borderRadius: 30
    },
    slideContainer: {
        // borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: "center",
        alignSelf: "center"
    },

    image1: {
        width: width * 0.9,
        height: height * 0.2,
    },


});
