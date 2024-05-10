import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Image, Dimension, Dimensions, ScrollView, FlatList, Animated } from 'react-native';
import { ICONS } from '../../assets/themes';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { object } from 'yup';
import { Addcart, imagebaseurl, servicedetails } from '../../apiconfig/Apiconfig';
import LoaderScreen from '../../compontent/LoaderScreen';
import Header from '../../compontent/Header';
import AuthContext from '../context/AuthContext';
const { height, width } = Dimensions.get("screen")
const ServiceDetails = ({ route, onClose, }) => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityStates, setQuantityStates] = useState({});
    const [quantityselectStates, setQuantityselectStates] = useState({});
    const [isvissbleModal, setIsVisibleModal] = useState(false);
    const [servericdetailsget, setServericdetailsget] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const { iscardlist } = useContext(AuthContext);
    const priceDetail = iscardlist?.data?.price_detail;
    console.log("iscardlist---->", iscardlist)
    const serviceid = route.params.serviceid;
    console.log("serviceid---->", serviceid)
    console.log("quantityselectStates------>", quantityselectStates)
    console.log("servericdetailsget----->", servericdetailsget)
    console.log("serviceid------>", serviceid)
    const handleaddtocart = async () => {
        try {
            // setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            // const variants = [];
            // dverinat.forEach(variant => {
            //     const { id } = variant;
            //     Object.keys(quantityselectStates).forEach(variantId => {
            //         // const { quantity } = quantityselectStates[variantId];
            //         const quantity = quantityselectStates[id]?.quantity || 0;
            //         console.log("Variant ID:", variantId);
            //         console.log("Quantity:", quantity);
            //         variants.push({ varient_id: id, quantity: quantity });
            //     });
            // });
            // const varientData = JSON.stringify(variants);
            // console.log("varientData--->", varientData)
            const formdata = new FormData();
            formdata.append("service_id", serviceid);
            formdata.append("varient_id", dverinat.id);
            formdata.append("quantity", quantityselectStates.quantity);
            console.log("service_id---->", serviceid)
            console.log("varient_id------->", dverinat.id)
            console.log("quantity---->", dverinat.quantity)
            // formdata.append("varient_data", "[{\"varient_id\":1,\"quantity\":1},{\"varient_id\":2,\"quantity\":2}]");
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(Addcart, requestOptions);
            const result = await response.json();
            console.log("result--res--Quantity:-->", result);
            if (result.data == 200) {
                setIsLoading(false);
                showMessage({
                    message: "add to view card successfull",
                    type: "success",
                    icon: "success"
                })

            }
            console.log("resul-tresul-t--->", result)
        } catch (error) {
            console.log("error--handleaddtocart--->", error)
            setIsLoading(false);
        }

    }

    console.log("item---item---item>", serviceid)
    const handledetailsservice = async () => {
        console.log("service_id---item--->", serviceid)
        try {
            // setIsLoading(true); 
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append('service_id', serviceid);
            // formdata.append('service_id', "1");
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };
            console.log("requestOptions----->", requestOptions)
            const response = await fetch(servicedetails, requestOptions);
            const result = await response.json();
            console.log("resultressssultn2--->", result);
            if (result?.status == 200) {
                setServericdetailsget(result);
                setIsLoading(false);
                console.log("resultresult.data-result-->", result);
            }
        } catch (error) {
            console.error("handledetailsserviceerrorrr------>", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleFocus = () => {
            handledetailsservice();
        };
        handleFocus();
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);
        return unsubscribeFocus;
    }, []);



    const handleViewCard = () => {
        // onClose();
        navigation.navigate("Summary");
    };

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    const translateY = new Animated.Value(height);
    const animatePopup = () => {
        Animated.spring(translateY, {
            toValue: isOpen ? height : height - 200,
            useNativeDriver: true,
        }).start();
    };
    const openModal = () => {
        // onClose();
        setIsVisibleModal(true);
    }

    // useEffect(() => {
    //     // Initialize quantity states for each item
    //     const initialQuantityStates = {};
    //     Allmix.forEach(({ id }) => {
    //         initialQuantityStates[id] = {
    //             showQuantityView: false,
    //             quantity: 1
    //         };
    //     });
    //     setQuantityStates(initialQuantityStates);
    // }, []);

    const images = [
        require('../../assets/banner/banner.png'),
        require('../../assets/banner/ACBAnner.png'),
        require('../../assets/banner/ACBAnner1.png'),
        // Add more image sources as needed
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);



    // useEffect(() => {
    //     const initialQuantityselectStates = {};
    //     dverinat.forEach(({ id }) => {
    //         initialQuantityselectStates[id] = {
    //             showQuantityView: false,
    //             quantity: 1 // Initialize quantity to 1 or any default value
    //         };
    //     });
    //     setQuantityselectStates(initialQuantityselectStates);
    // }, []);

    useEffect(() => {
        const initialQuantityselectStates = {};
        if (dverinat && dverinat.length > 0) {
            dverinat.forEach(({ id }) => {
                initialQuantityselectStates[id] = {
                    showQuantityView: false,
                    quantity: 1
                };
            });
        }
        setQuantityselectStates(initialQuantityselectStates);
    }, [dverinat]);



    const handleIncreaseselect = (id) => {
        setQuantityselectStates(prevStates => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                quantity: prevStates[id]?.quantity ? prevStates[id].quantity + 1 : 1 // Ensure quantity is at least 1 before incrementing
            }
        }));
        // Add any other logic related to adding to cart
    };

    const handleDecreaseselect = (id) => {
        setQuantityselectStates(prevStates => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                quantity: Math.max(1, prevStates[id]?.quantity - 1) // Ensure quantity doesn't go below 1
            }
        }));
        // Add any other logic related to adding to cart
    };
    const toggleVectorselect = (id) => {
        handleaddtocart();
        togglePopup();
        setQuantityselectStates(prevStates => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                showQuantityView: !prevStates[id]?.showQuantityView
            }
        }));
        // showMessage({
        //     message: "add to view card successful",
        //     type: "success",
        //     icon: "success"
        // });
    };
    const Allmix = [
        {
            id: "1",
            image: require("../../assets/newimages/washingmachine1.png"),
            name: " washing",
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


    const renderselectvariant = ({ item }) => (
        <View style={{ marginBottom: 20, marginTop: 10, alignContent: "center", justifyContent: "center" }}>
            <View style={styles.btn2}>
                {/* <Image source={item.image} style={{ width: 100, height: 100, borderRadius: 5 }} resizeMode="contain" /> */}
                <Text style={[styles.name, { width: width * 0.3 }]}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                    <Image source={item.icon} style={styles.starIcon} />
                    <Text style={{ color: "gray" }}>{item.likes}</Text>
                </View>
                <Text style={{ color: "black" }}>₹258</Text>
                <View>
                    {!quantityselectStates[item.id]?.showQuantityView ? (
                        <TouchableOpacity style={styles.smallbutton} onPress={() => toggleVectorselect(item.id)}>
                            <Text style={styles.textbut}>Add</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.container1}>
                            <TouchableOpacity onPress={() => handleDecreaseselect(item.id)}>
                                <Text style={styles.textbut}>-</Text>
                            </TouchableOpacity>
                            {/* <Text style={styles.textbut}>{quantityselectStates[item.id]?.quantity}</Text> */}
                            <Text>{item.quantity}</Text>
                            {console.log("uantityselectStates[item.id]?.quantity-->", quantityselectStates[item.id]?.quantity)}
                            <TouchableOpacity onPress={() => handleIncreaseselect(item.id)}>
                                <Text style={styles.textbut}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );


    const serviceName = servericdetailsget && servericdetailsget.data && servericdetailsget?.data[0] ? servericdetailsget?.data[0]?.name : "";
    const serviceRating = servericdetailsget && servericdetailsget.data && servericdetailsget?.data[0] ? servericdetailsget?.data[0]?.rating : "";
    const dverinat = servericdetailsget && servericdetailsget.data && servericdetailsget?.data[0] ? servericdetailsget?.data[0]?.varient : "";
    const imageBaseUrl = servericdetailsget?.imageurl; // Assuming this is the base URL for your images
    const imageData = servericdetailsget && servericdetailsget.data && servericdetailsget?.data[0]?.banner;
    const image = imageData ? JSON.parse(imageData).map(img => ({ ...img, image_path: imagebaseurl + img.image_path })) : [];
    console.log("imageimage---->", image)


    console.log("dverinat---->", dverinat)
    return (
        // <Modal visible={visible} transparent={true} animationType="slide">
        <View style={{ flex: 1 }}>
            <Header title={"Service Deatils"} />
            <View style={styles.modalContainer}>

                <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1, paddingBottom: 150, }}>
                        <View
                            style={styles.container2}>
                            {image.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image.image_path }}
                                    style={{ width: 150, height: 150 }}
                                />
                            ))}
                        </View>
                        {console.log("serveailsget-name------>", servericdetailsget.data)}
                        <Text style={styles.text}>{serviceName}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10, marginTop: 10 }}>
                            <Image source={require("../../assets/logo/star.png")} style={{ width: 20, height: 20 }} resizeMode="contain" />
                            <Text style={{ color: "gray", fontFamily: "Roboto-Regular" }}>{serviceRating}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20, marginTop: 10, columnGap: 10, justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image source={require("../../assets/Icon/check.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                    <Text style={{ color: "#004E8C", fontSize: 15, fontWeight: "bold" }}>JU Cover</Text>
                                </View>
                                <Text style={{ color: "gray", fontStyle: "normal", fontSize: 16 }}>Standard rate card</Text>
                                <Image source={ICONS.arrow} style={{ width: 30, height: 30, }} />
                            </View>
                            {/* <Text style={styles.text1}>Verified quotes & 30 days warranty</Text> */}
                        </TouchableOpacity>

                        <Text style={styles.text}>Select variant</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            {console.log("servericdetailsget.varient------>", servericdetailsget.varient)}
                            <FlatList
                                data={dverinat}
                                renderItem={renderselectvariant}
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
                        <View style={{ flexDirection: "row", alignItems: "center", columnGap: 10 }}>
                            <Image source={require("../../assets/Icon/check.png")} resizeMode="contain" style={{ width: 20, height: 20 }} />
                            <Text style={{ color: "#004E8C", fontSize: 22, fontWeight: "bold" }}>JU Cover</Text>
                        </View>
                        <View style={{ flexDirection: "row", columnGap: 10, paddingBottom: 150 }}>
                            <View style={styles.warrantybutton}>
                                <Image source={require("../../assets/bottomnavigatiomnimage/waranty.png")} style={{
                                    width: 60,
                                    height: 60
                                }} />
                                <Text style={[styles.text1, { fontWeight: "bold" }]}>JU warranty</Text>
                            </View>
                            <View style={styles.warrantybutton}>
                                <Image source={require("../../assets/bottomnavigatiomnimage/refund.png")} style={{
                                    width: 60,
                                    height: 60
                                }} />
                                <Text style={[styles.text1, { fontWeight: "bold" }]}>No questions asked claim</Text>
                            </View>
                            <View style={styles.warrantybutton}>
                                <Image source={require("../../assets/bottomnavigatiomnimage/verified.png")} style={{
                                    width: 60,
                                    height: 60
                                }} />
                                <Text style={[styles.text1, { fontWeight: "bold" }]}>UC verified quotes</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View
            // style={styles.container}
            >
                <Animated.View
                    style={[
                        styles.popup,
                        {
                            transform: [{ translateY }],
                        },
                    ]}
                    onLayout={animatePopup}
                >
                    <View style={styles.modalContent2}>
                        <View style={styles.paymentcard}>
                            <Text style={styles.text}>{priceDetail?.cart_sub_total}</Text>
                            <TouchableOpacity style={styles.smallbutton} onPress={handleViewCard}>
                                <Text style={styles.textbut}>View card</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View>
            {isLoading && <LoaderScreen isLoading={isLoading} />}
            {/* // </Modal> */}
        </View>
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
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // marginTop: 10,
        flexGrow: 1,
        // marginHorizontal: 20,
        paddingBottom: 100
        // height:height

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
    btn2: {
        // backgroundColor: "#FFF",
        columnGap: 10,
        marginHorizontal: 10,
        // height: height * 0.18,
        width: width * 0.4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: "gray"

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
    },
    container1: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#004E8C",
        borderColor: "#004E8C",
        marginTop: height * 0.01,
        height: height * 0.035,
        width: width * 0.25,
        borderRadius: 5,
        borderWidth: 1,
        alignContent: "center",
        columnGap: 20,
        alignItems: "center"
    },
    warrantybutton: {
        padding: 10,
        borderWidth: 1,
        backgroundColor: "#e6e6fa",
        width: width * 0.28,
        borderColor: "#e6e6fa",
        justifyContent: "center",
        // flex: 1,
        alignItems: "center",
        borderRadius: 10,
        marginVertical: height * 0.01
    },
    btnlearn: {
        flexDirection: "row",
        alignItems: "center",
        width: width * 0.9,
        borderRadius: 10,
        borderWidth: 1,
        // height: height * 0.06,
        padding: 5,
        backgroundColor: '#F5F5F5',
        borderColor: "#dededf",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginVertical: height * 0.01
    },
    deep: {
        fontSize: 17,
        color: "black",
        fontWeight: "500",
        fontFamily: "Roboto-Medium"

    },
    container3: {
        flex: 1,
        paddingHorizontal: 20,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    progressContainer: {
        width: 30,
        alignItems: 'center',
    },
    progressLine: {
        flex: 1,
        width: 2,
        backgroundColor: 'gray',
    },
    stepContent: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 15,
        color: 'gray',
        marginBottom: 10,
    },
    image: {
        height: height * 0.2,
        width: width * 0.9,
        borderRadius: 20,
        marginTop: height * 0.01,
    },
    paymentcard: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: "#FFFF",
        padding: 15,
        alignContent: "center"
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    popup: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    paymentcard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "black"
    },
    smallbutton: {
        height: height * 0.04,
        width: width * 0.27,
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
    container2: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: height * 0.03,
        borderRadius: 30
    },
});

export default ServiceDetails;