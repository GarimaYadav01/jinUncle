import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookingdetailsapi, imagebaseurl } from '../../apiconfig/Apiconfig';
import LoaderScreen from '../../compontent/LoaderScreen';
import { useNavigation } from '@react-navigation/native';
import Header from '../../compontent/Header';

const Bookingdetails = ({ route }) => {
    const navigation = useNavigation();
    const bookingid = route?.params?.bookingid;
    console.log("bookingid--->", bookingid)

    const [isLoading, setIsLoading] = useState(false);
    const [isbookingdetails, setIsbookingdetails] = useState([]);
    const handlegetbookingdetails = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("booking_id", bookingid);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(Bookingdetailsapi, requestOptions);
            console.log("Response:", response);
            const result = await response.json();
            console.log("result-----result--->", result)
            if (result?.status == 200) {
                setIsbookingdetails(result.data.booking_detail);
                setIsLoading(false)
                console.log("result.data.booking_detail------>", result.data.booking_detail)
            }
        } catch (error) {
            console.log("erroetbookingdetailsr------>", error)
            setIsLoading(false);
        }
    }


    useEffect(() => {
        const handleFocus = () => {
            handlegetbookingdetails();
        };
        handleFocus();
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);
        return unsubscribeFocus;
    }, []);


    const renderItem = ({ item }) => {
        console.log("item---wwwww-->", item)
        let imageData;
        try {
            imageData = JSON.parse(item?.service_image)[0];
        } catch (error) {
            return null;
        }

        const imagePath = imagebaseurl + imageData?.image_path;
        return (
            <TouchableOpacity onPress={() => navigation.navigate("Bookingdetails", { bookingid: item.booking_id })}>
                <View style={styles.continer}>
                    <View>
                        <Image source={{ uri: imagePath }} style={{ width: 100, height: 100, borderRadius: 10 }} resizeMode="contain" />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[styles.name,]}>{item.service_name}</Text>
                        <Text style={{ color: "black" }}>₹{item.final_price}</Text>
                        <Text>{item.booking_date_time}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={"Booking Details"} />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        data={isbookingdetails}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}


                        ListEmptyComponent={() => (
                            <View style={styles.emptyListContainer}>
                                <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                                <Text style={styles.emptyListText}>No data found</Text>
                            </View>
                        )}
                    />
                </View>
                {isLoading && <LoaderScreen isLoading={isLoading} />}
            </View>
        </SafeAreaView>

    )
}

export default Bookingdetails

const styles = StyleSheet.create({})