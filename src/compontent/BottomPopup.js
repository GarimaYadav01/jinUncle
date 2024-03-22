import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
const { height } = Dimensions.get("screen");

const BottomPopup = ({ toggleFunction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
        if (toggleFunction) {
            toggleFunction(!isOpen);
        }
    };
    const translateY = new Animated.Value(height);
    const animatePopup = () => {
        Animated.spring(translateY, {
            toValue: isOpen ? height : height - 200,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>

            {/* <TouchableOpacity onPress={togglePopup} style={styles.button}>
                <Text style={styles.buttonText}>Open Popup</Text>
            </TouchableOpacity> */}


            <Animated.View
                style={[
                    styles.popup,
                    {
                        transform: [{ translateY }],
                    },
                ]}
                onLayout={animatePopup}
            >
                <Text>Popup content goes here</Text>
                {/* Add more content as needed */}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    popup: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default BottomPopup;
