import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const whitebutton = ({ label, onPress, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onPress}
        >
            <Text style={[styles.text, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff', // Default button color
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    text: {
        color: '#fff', // Default text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default whitebutton;
