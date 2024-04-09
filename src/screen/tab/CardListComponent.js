import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import ModalCompontent from '../../compontent/ModalCompontent';
import PaymentModal from '../../compontent/PaymentModal';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import { imagebaseurl } from '../../apiconfig/Apiconfig';
const { height, width } = Dimensions.get("screen")
const CardListComponent = () => {
    const { servericeget } = useContext(AuthContext)
    console.log("servericegethfhjff----->", servericeget)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityStates, setQuantityStates] = useState({});
    const [payment, setPayment] = useState({});
    useEffect(() => {
        const initialQuantityStates = {};
        datacard.forEach(({ id }) => {
            initialQuantityStates[id] = {
                showQuantityView: false,
                quantity: 1
            };
        });
        setQuantityStates(initialQuantityStates);
    }, []);

    const handleIncrease = (id) => {
        setIsVisibleModal(true);
        setQuantityStates(prevStates => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                quantity: prevStates[id].quantity + 1
            }
        }));
    };
    const handleDecrease = (id) => {
        setIsVisibleModal(true);
        setQuantityStates(prevStates => ({
            ...prevStates,
            [id]: {
                ...prevStates[id],
                quantity: Math.max(1, prevStates[id].quantity - 1)
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
        setIsVisibleModal(true);
    };

    const closeModal2 = () => {
        setIsVisibleModal(false);
    }
    const getImagePath = (item) => {
        try {
            const imageData = JSON.parse(item.image)[0];
            return imagebaseurl + imageData.image_path;
        } catch (error) {
            return null;
        }
    };

    const handlerender = ({ item }) => {
        // const imagePath = getImagePath(item);

        // if (!imagePath) {
        //     return null;
        // }

        return (
            <View style={styles.card}>
                <View>
                    {/* <Image source={{ uri: imagePath }} style={styles.image} /> */}
                    <View>
                        <TouchableOpacity style={styles.smallbutton} onPress={() => handleCardPress(item)}>
                            <Text style={styles.textbut}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={{ color: "#004E8C" }}>{item.warenty}</Text>
                    <Text style={styles.service}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Image source={require("../../assets/logo/star.png")} style={styles.starIcon} />
                        <Text style={styles.likes}>{item.rating}</Text>
                    </View>
                    <Text style={{ color: "black", fontSize: 17 }}>{item.starts}</Text>
                    <Text style={{ color: "#004E8C", marginTop: 10, fontWeight: "500" }}>₹100 off 2nd item onwords</Text>
                    <Text>₹{item.price}</Text>
                    <Text style={styles.label}>{item.short_description}</Text>
                    <TouchableOpacity onPress={() => handleCardPress(item)}>
                        <Text style={{ color: "#004E8C", marginTop: 10, fontWeight: "800", fontSize: 14 }}>View details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    const datacard = [
        {
            id: "1",
            service: "Power Saver Ac Service",
            image: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: "₹549",
            label: "Deep cleaning of indoor & outdoor unit with Advanced foam & Power-jet Technology",
            images: require("../../assets/banner/img3.png"),
            view: "View details"
        },
        {
            id: "2",
            service: "Jet Ac Service",
            image: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: "₹549",
            label: "Deep cleaning of indoor & outdoor unit with Advanced foam & Power-jet Technology",
            images: require("../../assets/banner/img-1.png"),
            view: "View details"
        },
        {
            id: "3",
            service: "Anti-rust deep clean AC service",
            image: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: "₹549",
            label: "Deep cleaning of indoor & outdoor unit with Advanced foam & Power-jet Technology",
            images: require("../../assets/banner/img3.png"),
            view: "View details"
        },
        {
            id: "4",
            service: "power saver Ac service",
            image: require("../../assets/logo/star.png"),
            likes: "4.85(60k reviews)",
            starts: "₹549",
            label: "Deep cleaning of indoor & outdoor unit with Advanced foam & Power-jet Technology",
            images: require("../../assets/banner/img-1.png"),
            view: "View details"
        }
    ]
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isvissbleModal, setIsVisibleModal] = useState(false);
    const navigation = useNavigation();
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

    const handleCardPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleViewCard = () => {
        // onClose();
        navigation.navigate("Summary");
    };
    return (
        <View>
            <FlatList
                data={datacard}
                renderItem={handlerender}
                keyExtractor={(item) => item.service}
                showsVerticalScrollIndicator={false}
            />
            <ModalCompontent visible={modalVisible} onClose={closeModal} item={selectedItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
        // width:width*0.9
        marginHorizontal: 20,
        columnGap: 10
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    content: {
        flex: 1,

    },
    service: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: "Roboto-BoldItalic",
        color: "black"
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
    label: {
        fontSize: 14,
        color: 'black',
        marginTop: 10,
        fontWeight: "500",
        fontFamily: "Roboto-BoldItalic"
        // marginBottom: 5,
        // backgroundColor:"red"
    },
    smallbutton: {
        height: height * 0.04,
        width: width * 0.22,
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
        height: height * 0.04,
        width: width * 0.22,
        borderRadius: 5,
        borderWidth: 1,
        alignContent: "center",
        columnGap: 20,
        alignItems: "center"
    },
    paymentcard: {
        width: width,
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        padding: 10
    }
});

export default CardListComponent;
