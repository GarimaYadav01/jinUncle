import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, SafeAreaView, StatusBar, Dimensions, Text, ScrollView, FlatList } from 'react-native';
import Header from "../../compontent/Header";
import { aboutusfetch } from "../../apiconfig/Apiconfig";
import LoaderScreen from "../../compontent/LoaderScreen";
const { height, width } = Dimensions.get("screen");
const Aboutus = (props) => {
    const [abouts, setAbouts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log("aboutus----->", abouts)
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("token", "WlhsS01XTXlWbmxZTW14clNXcHZhVTFVVldsTVEwcDNXVmhPZW1ReU9YbGFRMGsyU1d0R2EySlhiSFZKVTFFd1RrUlJlVTVFUlhsT1EwWkJTMmxaYkVscGQybGhSemt4WTI1TmFVOXFVVFJNUTBwcldWaFNiRmd6VW5CaVYxVnBUMmxKZVUxRVNUQk1WRUY2VEZSSmVVbEVSVEZQYWtreVQycFJlRWxwZDJsamJUbHpXbE5KTmtscVNXbE1RMHByV2xoYWNGa3lWbVpoVjFGcFQyMDFNV0pIZURrPQ==");
            myHeaders.append("Cookie", "ci_session=9148ab8ec5ed9c1cfd4910bb1a8607b7da2859f1");
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            const response = await fetch(aboutusfetch, requestOptions);
            const result = await response.json(); // Parse response as JSON
            console.log("result----->", result);
            if (response.status === 200) {
                setAbouts(result.data);
                setIsLoading(false);
                console.log("setAboutssetAbouts------>", result.data);
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };
    useEffect(
        () => {
            fetchData();
        }, [props.navigation]
    )

    const renderItem = ({ item }) => (
        <View style={styles.content}>
            <Text style={styles.sectionTitle}>{item.name}</Text>
            <Text style={styles.sectionText}>{item.content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Header title={"About us"} />
            <ScrollView contentContainerStyle={styles.container}>
                <FlatList
                    data={abouts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyListContainer}>
                            <Image source={require("../../assets/Newicon/delete.png")} style={{ width: 70, height: 70 }} />
                            <Text style={styles.emptyListText}>No data found</Text>
                        </View>
                    )}
                />
            </ScrollView>

            {isLoading && <LoaderScreen isLoading={isLoading} />}
        </SafeAreaView>

    )
};
export default Aboutus;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    content: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black"
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 20,
        color: "gray"
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.3,
    },
    emptyListText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: "bold"
    },
});
