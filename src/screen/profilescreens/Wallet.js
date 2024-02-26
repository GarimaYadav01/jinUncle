import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import Header from "../../compontent/Header";
const Wallet = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={"My Wallet"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>lkfgjk</Text>
                </View>
            </ScrollView>

        </SafeAreaView>

    );
};
export default Wallet;