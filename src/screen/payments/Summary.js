import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import Seeall from "../../compontent/Seeall";
import { ICONS } from "../../assets/themes";
import CustomButton from "../../compontent/Custombutton";
import TimeSlot from "../../compontent/TimeSlot";

const { height, width } = Dimensions.get("screen");

const Summary = (props) => {
    const [index, setIndex] = useState(0);
    const flatListRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityStates, setQuantityStates] = useState({});
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
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, []);

    const data = [
        { id: 1, name: 'Less/ no cooling', price: '299' },
        { id: 2, name: 'Gas leak fix & refill', price: '2,500' }
    ];

    // Initialize quantity for each item
    if (Object.keys(quantityStates).length === 0) {
        let initialQuantityStates = {};
        data.forEach(item => {
            initialQuantityStates[item.id] = { quantity: 0 };
        });
        setQuantityStates(initialQuantityStates);
    }

    const handleIncrease = (id) => {
        setQuantityStates(prevStates => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                quantity: prevStates[id].quantity + 1
            }
        }));
    };

    const handleDecrease = (id) => {
        setQuantityStates(prevStates => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                quantity: Math.max(0, prevStates[id].quantity - 1)
            }
        }));
    };

    const toggleVector = (id) => {
        setQuantityStates(prevStates => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                showQuantityView: !prevStates[id].showQuantityView
            }
        }));
    };

    useEffect(() => {
        // Initialize quantity states for each item
        const initialQuantityStates = {};
        Allmix.forEach(({ id }) => {
            initialQuantityStates[id] = {
                showQuantityView: false,
                quantity: 1
            };
        });
        setQuantityStates(initialQuantityStates);
    }, []);
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
            name: "Washing Machine Reapir",
            screen: "Washingmachinecategory"
        },
        {
            id: "4",
            image: require("../../assets/banner/img-1.png"),
            name: "Service",
            screen: "Washingmachinecategory"
        },
        {
            id: "5",
            image: require("../../assets/banner/img-1.png"),
            name: "Repair & gas refill ",
            screen: "Washingmachinecategory"
        },
        {
            id: "6",
            image: require("../../assets/banner/img-1.png"),
            name: "Install & uninstall",
            screen: "Washingmachinecategory"
        },
        {
            id: "3",
            image: require("../../assets/banner/img-1.png"),
            name: "Split AC",
            screen: "Washingmachinecategory"
        },
        {
            id: "7",
            image: require("../../assets/banner/img-1.png"),
            name: "Window AC",
            screen: "Washingmachinecategory"
        },


    ];

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
    const [modalVisible2, setModalVisible2] = useState(false);
    const handleCardPress = () => {
        // setSelectedItem(item);
        setModalVisible2(true);
    };

    const closeModal2 = () => {
        setModalVisible2(false);
    };
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, alignItems: "center" }}>
            <Text>{item.name}</Text>
            <View style={styles.container1}>
                <TouchableOpacity onPress={() => handleDecrease(item.id)}>
                    <Text style={styles.textbut}>-</Text>
                </TouchableOpacity>
                <Text style={styles.textbut}>{quantityStates[item.id]?.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncrease(item.id)}>
                    <Text style={styles.textbut}>+</Text>
                </TouchableOpacity>
            </View>
            <Text>{item.price}</Text>
        </View>
    );

    const renderItemallmix = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10 }}>
            <View style={styles.btn}>
                <Image source={item.image} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                <Text style={[styles.name,]}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                    <Image source={item.icon} style={styles.starIcon} />
                    <Text style={styles.likes}>{item.likes}</Text>
                </View>
                <Text style={{ color: "black" }}>₹258</Text>
                <View>
                    {!quantityStates[item.id]?.showQuantityView ? (
                        <TouchableOpacity style={styles.smallbutton} onPress={() => toggleVector(item.id)}>
                            <Text style={styles.textbut}>Add</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.container1}>
                            <TouchableOpacity onPress={() => handleDecrease(item.id)}>
                                <Text style={styles.textbut}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.textbut}>{quantityStates[item.id]?.quantity}</Text>
                            <TouchableOpacity onPress={() => handleIncrease(item.id)}>
                                <Text style={styles.textbut}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Header title={"Summary"} />

            <ScrollView style={{ marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>


                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />


                <View style={{ marginTop: 10, backgroundColor: "white", borderWidth: 1, borderColor: "#FFF", padding: 5, borderRadius: 10 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={styles.text}>
                            Frequently added together
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

                    <View>
                        <Text style={styles.service}>
                            Service Preferences
                        </Text>
                        <View>
                            <Text style={[styles.text1, { color: "black" }]}>Avoid calling before reaching thr location</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.text1}>Coupons and offers</Text>

                        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                            <Text style={{ color: "#004E8C", fontSize: 17 }}>2 offers</Text>
                            <Image source={ICONS.arrow} style={{ height: 20, width: 20 }} />
                        </View>

                    </View>
                </View>

                <View style={styles.com}>
                    <Text style={styles.service}>Payment summary</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.text2}>Item total</Text>
                        <Text style={styles.text2}>₹1,297</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.text2}>Item discount</Text>
                        <Text style={styles.text2}>-₹100</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.text2}>Taxes and fee</Text>
                        <Text style={styles.text2}>₹100</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "black", fontSize: 18, fontWeight: "700" }}>Total</Text>
                    <Text style={{ color: "black", fontSize: 18, fontWeight: "700" }}>₹1276</Text>
                </View>
                <View style={{ marginTop: height * 0.03 }}>
                    <CustomButton size={"large"} label={"Continue "} backgroundColor={"#004E8C"} color={"white"} onPress={handleCardPress} />
                </View>
            </ScrollView>
            <TimeSlot isVisible={modalVisible2} onClose={closeModal2} />
            <Seeall isVisible={modalVisible} onClose={closeModal} categories={categories} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container1: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#004E8C",
        borderColor: "#004E8C",
        marginTop: height * 0.01,
        height: height * 0.03,
        width: width * 0.2,
        borderRadius: 5,
        borderWidth: 1,
        alignContent: "center",
        columnGap: 20
    },
    textbut: {
        fontSize: 14,
        color: "white",
        fontFamily: "Roboto-Medium"
    },
    btn: {
        // backgroundColor: "#FFF",
        columnGap: 10,
        marginHorizontal: 10,
        // height: height * 0.18,
        // width: width * 0.4,
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
    text: {
        fontSize: 22,
        color: "#000",
        fontWeight: "bold",
        fontFamily: "Roboto-BoldItalic"

        // textAlign: "center"
    },
    text1: {
        fontSize: 16,
        color: "gray",
        fontFamily: "Roboto-MediumItalic",
        marginVertical: height * 0.005,
        lineHeight: 22
    },
    service: {
        fontSize: 18,
        color: "black",
        marginTop: height * 0.01
    },
    com: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        marginTop: height * 0.01,
        paddingBottom: 10
    },
    text2: {
        fontSize: 16,
        color: "gray",
        lineHeight: 22
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
    },
});

export default Summary;
