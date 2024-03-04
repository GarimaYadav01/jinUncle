import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ModalCompontent from '../../compontent/ModalCompontent';

const { height, width } = Dimensions.get("screen")


const CardListComponent = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantityStates, setQuantityStates] = useState({});
    const [payment,setPayment] = useState({});
    useEffect(() => {
        // Initialize quantity states for each item
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
    };

    const handlerender = ({ item }) => (

        <View style={styles.card}>
            <View>
                <Image source={item.images} style={styles.image} />
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

            <View style={styles.content}>
                <Text style={{ color: "#004E8C" }}>30-Day Warranty</Text>
                <Text style={styles.service}>{item.service}</Text>
                <View style={styles.ratingContainer}>
                    <Image source={item.image} style={styles.starIcon} />
                    <Text style={styles.likes}>{item.likes}</Text>
                </View>
                <Text style={{ color: "black", fontSize: 17 }}>{item.starts}</Text>
                <Text style={{ color: "#004E8C", marginTop: 10, fontWeight: "500" }}>₹100 off 2nd item onwords</Text>
                <Text style={styles.label}>{item.label}</Text>
                <TouchableOpacity onPress={() => handleCardPress(item)}>
                    <Text style={{ color: "#004E8C", marginTop: 10, fontWeight: "800", fontSize: 14 }}>{item.view}</Text>
                </TouchableOpacity>

            </View>
        </View>

    );



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



    const handleCardPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
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

            <View style={styles.paymentcard}>
                <Text style={styles.text}>₹549</Text>
                <TouchableOpacity style={styles.smallbutton}>
                    <Text style={styles.textbut}>View card</Text>
                </TouchableOpacity>
            </View>
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
        marginHorizontal: 20
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
        height: height * 0.03,
        width: width * 0.2,
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
        height: height * 0.03,
        width: width * 0.2,
        borderRadius: 5,
        borderWidth: 1,
        alignContent: "center",
        columnGap: 20
    },
});

export default CardListComponent;
