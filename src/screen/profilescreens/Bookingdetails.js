import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookingdetailsapi } from '../../apiconfig/Apiconfig';
import LoaderScreen from '../../compontent/LoaderScreen';
import { useNavigation } from '@react-navigation/native';

const Bookingdetails = () => {

    const navigation = useNavigation();

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
            formdata.append("booking_id", "51");
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
                setIsbookingdetails(result.data);
                setIsLoading(false)
            }


        } catch (error) {
            console.log("erroetbookingdetailsr------>", error)
            setIsLoading(false);
        }
    }


    // useEffect(() => {
    //     handlegetbookingdetails();
    // })
    useEffect(() => {
        const handleFocus = () => {
            handlegetbookingdetails();
        };
        handleFocus();
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);
        return unsubscribeFocus;
    }, []);




    return (
        <SafeAreaView style={{ flex: 1 }}>


            <View style={{ flex: 1 }}>
                <Text>Bookingdetails</Text>
                {isLoading && <LoaderScreen isLoading={isLoading} />}
            </View>
        </SafeAreaView>

    )
}

export default Bookingdetails

const styles = StyleSheet.create({})