import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoaderScreen = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoaderScreen;
