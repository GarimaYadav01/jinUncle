import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import Seeall from "../../compontent/Seeall";
import { ICONS } from "../../assets/themes";
import CustomButton from "../../compontent/Custombutton";
import TimeSlot from "../../compontent/TimeSlot";
import AuthContext from "../context/AuthContext";
import { cardremove, imagebaseurl } from "../../apiconfig/Apiconfig";
import { useNavigation } from "@react-navigation/native";
import Couponmodal from "../../compontent/Couponmodal";
import CouponModal from "../../compontent/Couponmodal";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("screen");
const Summary = (props) => {
    const [index, setIndex] = useState(0);
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityStates, setQuantityStates] = useState({});
    const { mostpolluar, iscardlist } = useContext(AuthContext);
    const [modalVisiblecopun, setModalVisiblecopun] = useState(false);
    const [couponResponse, setCouponResponse] = useState([]);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const handleToggleCoupon = () => {
        setIsCouponApplied(!isCouponApplied);
        if (!isCouponApplied) {
            setModalVisiblecopun(true); // Show the modal only when applying the coupon
        } else {
            // If coupon is already applied and the "Remove" button is pressed, call the remove API
            removehandle();
        }
    };
    console.log("couponResponse:", couponResponse)
    const handleApplyCouponSuccess = (response) => {
        // Update the state with the response data
        setCouponResponse(response);
    };

    const removehandle = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("tokennnnn---->", token)
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=77cdeb6b53ba3146084a1022d42edece856c52d2");
            const formdata = new FormData();
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            console.log("requestOption------>s", requestOptions)

            const response = await fetch(cardremove, requestOptions);
            const result = await response.json();
            console.log("result-----result>", result)
        } catch (error) {
            console.log("error--->", error)
        }
    }

    console.log("mostpolluar----mostpolluar-->", mostpolluar);
    console.log("iscardlist----iscardli-----st---8888iscardlist->", iscardlist)


    const priceDetail = iscardlist?.data?.price_detail;
    const cartProducts = iscardlist?.data?.cart_products;
    console.log("priceDetail------>", priceDetail);
    console.log("cartProducts------>", cartProducts);

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
        mostpolluar.forEach(({ id }) => {
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

    const [modalVisible2, setModalVisible2] = useState(false);
    const handleCardPress = () => {
        setModalVisible2(true);
    };
    const closeModal2 = () => {
        setModalVisible2(false);
    };
    const renderitem = ({ item }) => {
        console.log("Item:", item);
        let imageData;
        try {
            imageData = JSON.parse(item.service_image)[0];
        } catch (error) {
            return null;
        }
        const imagePath = imagebaseurl + imageData.image_path;
        console.log("imageimageimage---->", imagePath)
        let data;
        try {
            data = JSON.parse(item.varient_data)[0];
        } catch (error) {
            return null;
        }
        const qty = data.quantity;
        return (
            <View style={styles.cardContainer}>
                <Image source={{ uri: imagePath }} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={[styles.text1, { marginLeft: width * 0.1 }]}>quantity:{qty}</Text>
                    {/* <Text style={styles.cardPrice}>{item.varient_data}</Text> */}
                </View>
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
                <View style={styles.btn}>
                    <Image source={{ uri: imagePath }} style={{ width: 150, height: 150, borderRadius: 10 }} resizeMode="contain" />
                    <Text style={[styles.name]}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Image source={require("../../assets/logo/star.png")} style={styles.starIcon} />
                        <Text style={styles.likes}>{item.rating}</Text>
                    </View>
                    <Text style={{ color: "black" }}>₹258</Text>
                    {/* <View>
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
                    </View> */}
                </View>
            </View>
        );
    };

    const renderPriceDetail = () => {
        const detailToRender = priceDetail || couponResponse;

        return Object?.entries(detailToRender)?.map(([key, value]) => (
            <View style={styles.priceDetailContainer} key={key}>
                <Text style={styles.text2}>{key}</Text>
                <Text style={styles.text2}>{value}</Text>
            </View>
        ));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Header title={"Summary"} />
            <ScrollView style={{ marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                <FlatList
                    data={cartProducts}
                    renderItem={renderitem}
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
                            data={mostpolluar}
                            renderItem={renderItemallmix}
                            keyExtractor={(item) => item.id}
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
                        <TouchableOpacity onPress={removehandle} style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                            <Text style={{ color: "#004E8C", fontSize: 17 }}>
                                {isCouponApplied ? 'Remove' : 'Apply'} {/* Toggle button text */}
                            </Text>
                            <Image source={ICONS.arrow} style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.priceDetailSection}>
                    <Text style={styles.priceDetailHeading}>Price Details</Text>
                    {renderPriceDetail()}
                </View>
                <View style={{ marginTop: height * 0.03 }}>
                    <CustomButton size={"large"} label={"Continue"} backgroundColor={"#004E8C"} color={"white"} onPress={handleCardPress} />
                </View>
            </ScrollView>
            <TimeSlot isVisible={modalVisible2} onClose={closeModal2} />
            <Seeall isVisible={modalVisible} onClose={closeModal} />
            <CouponModal visible={modalVisiblecopun} onClose={() => setModalVisiblecopun(false)} onApplyCouponSuccess={handleApplyCouponSuccess}
            />
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
        textAlign: "center",
        width: width * 0.36
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

    connter: {
        flexDirection: "row",
        // justifyContent: "space-between",
        paddingVertical: 10,
        alignItems: "center",
        // backgroundColor: "#fffaf0",
        borderWidth: 1,
        marginTop: height * 0.03,
        borderColor: "#fffaf0",
        width: width * 0.9,
        // height: height * 0.1
        paddingHorizontal: 20
    },
    nameee: {
        fontFamily: "Roboto-Medium",
        fontSize: 17,
        fontWeight: "500",
        fontStyle: "normal",
        color: "black"
    },
    cardContainer: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cardImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 20
    },
    priceDetailHeading: {
        fontSize: 20,
        color: "black",
        fontWeight: "700",
        marginHorizontal: 20
    },
    priceDetailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    priceDetailLabel: {
        color: "black",
        fontSize: 14,
        lineHeight: 22,
        marginTop: 10
    },
    priceDetailSection: {
        mafrginTop: 20
    },
    priceDetailValue: {
        color: "gray",
        lineHeight: 22,
        marginTop: 10
    }
});

export default Summary;
