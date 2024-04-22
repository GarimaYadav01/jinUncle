import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl } from "react-native";
import TextinputComponent from "../../compontent/TextinputComponent";
import { useNavigation } from "@react-navigation/native";
import Applyproma from "../../compontent/Applyproma";
import ApplyModal from "../../compontent/ApplyModal";
import Seeall from "../../compontent/Seeall";
import Swiper from 'react-native-swiper'
import AuthContext from "../context/AuthContext";
import LoaderScreen from "../../compontent/LoaderScreen";
import { imagebaseurl } from "../../apiconfig/Apiconfig";
const { width, height } = Dimensions.get("screen")
const HomeScreen = (props) => {
    const navigation = useNavigation();
    const { fetchData, handleGetlocation, location, iscategories, fetchDataCategory, categoryDetail, fetchSubCategories, issubCategories, isLoading, getProfile, getsubCategoryhandle, issubcategorydetails, handlegetservice, servericeget, handlebannerhome, banner, handledetailsservice, servericdetailsget, handlemostpopularservice, mostpolluar, setIsmostpolluar } = useContext(AuthContext);
    console.log("mostpolluar------>", mostpolluar);
    console.log("servericeget----servericeget-----dhdhd--->", servericdetailsget)
    console.log("banner---->", banner)
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        const handleFocus = () => {
            handleGetlocation();
            fetchData();
            // fetchDataCategory();
            fetchSubCategories();
            getProfile();
            getsubCategoryhandle();
            handlegetservice();
            handlebannerhome();
            handledetailsservice();
            handlemostpopularservice();
        };
        handleFocus();
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);
        return unsubscribeFocus;
    }, []);



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Your refresh logic here
        setTimeout(() => setRefreshing(false), 2000); // Simulating a delay to complete the refresh
    }, []);

    const [index, setIndex] = useState(0);
    const flatListRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentgifIndex, setCurrentgifIndex] = useState(0);
    const images = [
        require('../../assets/newbanners/fridgeBannner2.png'),
        require('../../assets/banner/ACBAnner.png'),
        require('../../assets/banner/ACBAnner1.png'),
    ];
    const handleMenuItemPress = (screen, id, name) => {
        navigation.navigate(screen, { itemId: id, itemName: name });
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const nextIndex = (index + 1) % mostpolluar?.length;
    //         flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
    //         setIndex(nextIndex);
    //     }, 3000);
    //     return () => clearInterval(interval);
    // }, [index]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const scrollViewRef = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % bannerImages.length;
            setCurrentIndex(nextIndex);
            scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex, bannerImages]);

    const renderItem = ({ item }) => {
        let imageData;
        try {
            imageData = JSON.parse(item.image)[0];
        } catch (error) {
            return null;
        }
        const imagePath = imagebaseurl + imageData.image_path;
        console.log("imageimageimage---->", imagePath)
        return (
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate("Accategory", { categoryName: item.name, category_id: item.id })}>
                    <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                    <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    const renderItem2 = ({ item }) => {
        let imageData;
        try {
            imageData = JSON.parse(item.image)[0];
        } catch (error) {
            return null;
        }
        const imagePath = imagebaseurl + imageData.image_path;
        // console.log("imageimageimage---->", imagePath)
        return (
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Fridagecategory", { subcategory: item.name })}>
                    <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                    <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    const renderItemfridage = ({ item }) => {
        let imageData;
        try {
            imageData = JSON.parse(item.image)[0];
        } catch (error) {
            return null;
        }
        const imagePath = imagebaseurl + imageData.image_path;
        return (
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Fridagecategory", { subcategory: item.name, subid: item.id })}>
                    <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                    <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderItemallmix = ({ item }) => {
        console.log("item----->", item)
        let imageData;
        try {
            imageData = JSON.parse(item.banner)[0];
        } catch (error) {
            return null;
        }

        const imagePath = imagebaseurl + imageData.image_path;
        return (
            <View style={{ marginBottom: 20, marginTop: 10 }}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("MostpollarDetails", { mostpolluarid: item.id })}>
                    <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                    <Text style={[styles.name,]}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Image source={require("../../assets/logo/star.png")} style={styles.starIcon} />
                        <Text style={styles.likes}>{item.rating}</Text>
                    </View>
                    <Text style={{ color: "black" }}>₹{item.price}</Text>
                </TouchableOpacity>
            </View>
        );
    };


    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    const bannerImages = banner?.map(item => {
        try {
            const imageArray = JSON.parse(item.image);
            const imagePath = imageArray[0].image_path;
            return imagebaseurl + imagePath;
        } catch (error) {
            return null;
        }
    }).filter(imagePath => imagePath !== null);
    return (
        <SafeAreaView style={{ flex: 1, paddingBottom: 20, backgroundColor: "#FFF" }}>
            <ScrollView style={{ flexGrow: 1, }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: height * 0.03, marginHorizontal: 20 }}>
                    {/* <Image source={require("../../assets/Newicon/location.png")} style={styles.images} /> */}
                    <Image source={require("../../assets/logo/jinnlogo.png")} style={styles.images} />
                    <TouchableOpacity>
                        <Text style={styles.text}>{location}</Text>
                        <Text style={[styles.text, { fontSize: 14, color: "#c0c0c0", fontFamily: "Roboto-Regular", }]}>{location}</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity>
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
                    <ScrollView
                        horizontal
                        ref={scrollViewRef}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={event => {
                            const contentOffsetX = event.nativeEvent.contentOffset.x;
                            setCurrentIndex(Math.floor(contentOffsetX / width));
                        }}
                    >
                        {bannerImages.map((imagePath, index) => (
                            <Image
                                key={index}
                                source={{ uri: imagePath }}
                                style={[styles.image, { width }]}
                                resizeMode="contain"
                            />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.con}>
                    <Text style={styles.text}>Category</Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FlatList
                            data={iscategories}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={() => (
                                <View style={styles.emptyListContainer}>
                                    <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                    <Text style={styles.emptyListText}>No data found</Text>
                                </View>
                            )}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>
                            AC Repair & service
                        </Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList
                                data={issubCategories}
                                renderItem={renderItem2}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <View style={styles.emptyListContainer}>
                                        <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                        <Text style={styles.emptyListText}>No data found</Text>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>
                            Refrigerator Repair & service
                        </Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList
                                data={issubCategories}
                                renderItem={renderItemfridage}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <View style={styles.emptyListContainer}>
                                        <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                        <Text style={styles.emptyListText}>No data found</Text>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.text}>
                            WashingMachine Repair & service
                        </Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <FlatList
                                data={issubCategories}
                                renderItem={renderItemfridage}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <View style={styles.emptyListContainer}>
                                        <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                        <Text style={styles.emptyListText}>No data found</Text>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    {/* <View style={styles.container1}>
                        <Image source={images[currentIndex]} style={styles.image} />
                    </View> */}
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
                                // ref={flatListRef}
                                data={mostpolluar}
                                renderItem={renderItemallmix}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                ListEmptyComponent={() => (
                                    <View style={styles.emptyListContainer}>
                                        <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                        <Text style={styles.emptyListText}>No data found</Text>
                                    </View>
                                )}
                            // onMomentumScrollEnd={(event) => {
                            //     // Calculate the index of the current item based on the scroll position
                            //     const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
                            //     const newIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
                            //     setIndex(newIndex);
                            // }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            {isLoading && <LoaderScreen isLoading={isLoading} />}
            <Seeall isVisible={modalVisible} onClose={closeModal} categories={issubCategories} />
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
        color: "#000",
        fontFamily: "Roboto-Bold"
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
        width: width,
        height: height * 0.17,
        // height: height * 0.2,
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
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    emptyListText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: "bold"
    },

});
