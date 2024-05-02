import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import ModalCompontent from '../../compontent/ModalCompontent';
import PaymentModal from '../../compontent/PaymentModal';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/AuthContext';
import { imagebaseurl } from '../../apiconfig/Apiconfig';
const { height, width } = Dimensions.get("screen")
const CardListComponent = ({ scrollToTop }) => {
    const { servericeget } = useContext(AuthContext)
    console.log("servericegethfhjff----->", servericeget)

    const handlerender = ({ item }) => {
        let imageData;
        try {
            imageData = JSON.parse(item.banner)[0];
        } catch (error) {
            return null;
        }
        const imagePath = imagebaseurl + imageData.image_path;
        return (
            <View style={styles.card}>
                <View>
                    <Image source={{ uri: imagePath }} style={styles.image} />
                    <View>
                        <TouchableOpacity style={styles.smallbutton} onPress={() => handleCardPress(item.id)}>
                            <Text style={styles.textbut}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={{ color: "#004E8C" }}>{item.warenty} </Text>
                    <Text style={styles.service}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Image source={require("../../assets/logo/star.png")} style={styles.starIcon} />
                        <Text style={styles.likes}>{item.rating}</Text>
                    </View>
                    {/* <Text style={{ color: "black", fontSize: 17 }}>{item.starts}</Text> */}
                    <Text style={{ color: "#004E8C", marginTop: 10, fontWeight: "500" }}>{item.off_per}  off item onwords</Text>
                    <Text>₹{item.price}</Text>
                    <Text style={styles.label}>{item.short_description}</Text>
                    {/* <Text style={[styles.label, { color: "gray" }]}>{item.full_description}</Text> */}
                    <TouchableOpacity onPress={() => handleCardPress(item.id)}>
                        <Text style={{ color: "#004E8C", marginTop: 10, fontWeight: "800", fontSize: 14 }}>View details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    console.log("selectedItem---selectedItem-->", selectedItem)
    const navigation = useNavigation();

    const handleCardPress = (item) => {
        console.log("Selected item id:", item);
        setSelectedItem(item);
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    const flatListRef = useRef(null);
    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={servericeget}
                renderItem={handlerender}
                keyExtractor={(item) => item.id}
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
