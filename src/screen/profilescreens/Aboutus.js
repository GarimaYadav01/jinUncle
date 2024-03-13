import React from "react";
import { View, Image, StyleSheet, SafeAreaView, StatusBar, Dimensions, Text, ScrollView } from 'react-native';
import Header from "../../compontent/Header";
const Aboutus = () => {
    return (
        <SafeAreaView>
            <Header title={"About us"} />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Welcome to jinn uncle</Text>
                    <Text style={styles.sectionText}>
                        We connect millions of buyers and sellers around the world, empowering people & creating economic opportunity for all.
                    </Text>


                    <Text style={styles.sectionText}>
                        Within our markets, millions of people around the world connect, both online and offline, to make, sell and buy unique goods. We also offer a wide range of Seller Services and tools that help creative entrepreneurs start, manage and scale their businesses. Our mission is to reimagine commerce in ways that build a more fulfilling and lasting world, and we’re committed to using the power of business to strengthen communities and empower people.
                    </Text>

                    {/* Add more sections as needed */}

                </View>
            </ScrollView>


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
});
