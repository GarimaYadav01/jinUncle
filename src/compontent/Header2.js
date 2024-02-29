import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Share, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("screen")
const Header2 = ({ title }) => {
    const navigation = useNavigation();

    // Function to handle back button press
    const handleBackPress = () => {
        navigation.goBack(); // Navigate back
    };

    // Function to handle share button press
    const handleSharePress = async () => {
        try {
            const result = await Share.share({
                message: 'Your message to share goes here', // Message to share
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Shared successfully
                } else {
                    // Shared successfully
                }
            } else if (result.action === Share.dismissedAction) {
                // Share operation was dismissed
            }
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    // Function to handle search button press
    const handleSearchPress = () => {
        // Handle search functionality
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row",columnGap:10 }}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Image source={require("../assets/logo/back-button.png")} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={handleSharePress}>
                    <Image source={require("../assets/logo/share.png")} style={[styles.icon,]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSearchPress}>
                    <Image
                        source={require("../assets/banner/magnifying-glass.png")}
                        style={styles.icon}
                        resizeMode="contain"
                      
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        height:height*0.08,
        paddingTop: 10,
        paddingBottom: 5,
        backgroundColor: 'transparent', // Header background color
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc', // Border color
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 5,
    },
});

export default Header2;
