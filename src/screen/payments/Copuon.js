import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../compontent/Header";
import TextinputComponent from "../../compontent/TextinputComponent";
import { useNavigation } from "@react-navigation/native";
import { Copuonapiget, applycopuon, removeCopoun } from "../../apiconfig/Apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import LoaderScreen from "../../compontent/LoaderScreen";
const { height, width } = Dimensions.get("screen")
const Copuon = (props) => {
    const navigation = useNavigation();
    const [iscopon, setIscopon] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log("iscopon----iscopon--->", iscopon)
    const coupons = [
        { id: 1, title: '50% Off', description: 'Get 50% off on all items', expiry: 'Expires on 31st March' },
        { id: 2, title: 'Free Shipping', description: 'Enjoy free shipping on orders above $50', expiry: 'Expires on 15th April' },

    ];
    const handlegetapi = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(Copuonapiget, requestOptions);
            console.log("Response:", response);
            const result = await response.json();
            console.log("copuonresult----->", result)
            if (result.status == 200) {
                setIscopon(result.data);
                setIsLoading(false);
                console.log("copuonresult---data-->", result.data)
            }
        } catch (error) {
            console.log("error ---->", error)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handlegetapi();
    }, [])



    const handlepostcopuon = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("coupon", iscopon.name);
            // formdata.append("coupon", "admin");
            console.log("iscopon.name--->", iscopon.name)
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(applycopuon, requestOptions);
            const result = await response.json();
            console.log("result--->", result)
            if (response?.status === 200) {
                showMessage({
                    message: "apply copoun successfully",
                    type: "success",
                    icon: "success"
                })
                navigation.goBack();
                setIsLoading(false);
            }

        } catch (error) {
            console.log("error---cop-->", error);
            setIsLoading(false);
        }
    }

    const removehandle = async () => {
        try {
            // setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(removeCopoun, requestOptions);
            const result = await response.json();
            console.log("result---result-->", result)
            // if (result.status == 200) {
            //     showMessage({
            //         message: "delete successfully",
            //         type: "success",
            //         icon: "success"
            //     })
            // }
        } catch (error) {
            console.log("error---success--->", error)
        }
    }


    const renderCoupon = ({ item }) => {
        const onDelete = () => {
            removehandle();
            console.log("Delete notification with id:", item.id);
        };

        const renderRightActions = (progress, dragX) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [100, 0, -100],
            });
            return (
                <TouchableOpacity onPress={onDelete} >
                    <Image source={require("../../assets/Icon/delete.png")} style={{ width: 40, height: 40, marginTop: 15, marginRight: 20 }} />
                </TouchableOpacity>
            );
        };

        return (
            <GestureHandlerRootView>
                <Swipeable renderRightActions={renderRightActions}>
                    <TouchableOpacity onPress={() => handlepostcopuon(item)}>
                        <View style={styles.card}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.description}>{item.amount}</Text>
                            <Text style={styles.expiry}>{item.expiry}</Text>
                        </View>
                    </TouchableOpacity>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };


    return (
        <SafeAreaView style={{ flex: 1, }}>
            <Header title={"coupon"} />
            <View style={{ marginHorizontal: 20, marginTop: height * 0.04 }}>
                <FlatList
                    data={iscopon}
                    renderItem={renderCoupon}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyListContainer}>
                            <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                            <Text style={styles.emptyListText}>No data found</Text>
                        </View>
                    )}
                />
            </View>
            {isLoading && <LoaderScreen isLoading={isLoading} />}
        </SafeAreaView>
    )
}
export default Copuon;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    expiry: {
        fontSize: 14,
        color: 'gray',
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.2,
    },
    emptyListText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: "bold"
    },
});