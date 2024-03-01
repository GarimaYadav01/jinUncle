import React, { useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ModalCompontent from '../../compontent/ModalCompontent';
const { height, width } = Dimensions.get("screen")


const CardListComponent = ({ navigation }) => {

    const handlerender = ({ item }) => (
        <TouchableOpacity >
            <View style={styles.card}>
                <Image source={item.images} style={styles.image} />
                <View style={styles.content}>
                    <Text style={{ color: "#004E8C" }}>30-Day Warranty</Text>
                    <Text style={styles.service}>{item.service}</Text>
                    <View style={styles.ratingContainer}>
                        <Image source={item.image} style={styles.starIcon} />
                        <Text style={styles.likes}>{item.likes}</Text>
                    </View>
                    <Text style={{ color: "#004E8C", marginTop: 10 }}>₹100 off 2nd item onwords</Text>
                    <Text style={styles.label}>{item.label}</Text>
                    <TouchableOpacity onPress={() => handleCardPress(item)}>
                        <Text style={{ color: "#004E8C", marginTop: 10 ,fontWeight:"800",fontSize:14}}>{item.view}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </TouchableOpacity>
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
});

export default CardListComponent;
