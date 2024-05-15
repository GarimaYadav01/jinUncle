import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Header from '../../compontent/Header';

const Notification = () => {
    const data = [
        {
            id: "1",
            notification: "notification label",
            image: require("../../assets/bottomnavigatiomnimage/bellactive.png"),
            timing: "10:00 pm",
            date: "12/2/2024"
        },
        {
            id: "2",
            notification: "notification label",
            image: require("../../assets/bottomnavigatiomnimage/bellactive.png"),
            timing: "10:00 pm",
            date: "12/2/2024"
        },
        {
            id: "3",
            notification: "notification label",
            image: require("../../assets/bottomnavigatiomnimage/bellactive.png"),
            timing: "10:00 pm",
            date: "12/2/2024"
        },
        {
            id: "4",
            notification: "notification label",
            image: require("../../assets/bottomnavigatiomnimage/bellactive.png"),
            timing: "10:00 pm",
            date: "12/2/2024"
        },
    ];

    const NotificationItem = ({ item }) => {
        const onDelete = () => {
            // Handle delete action
            console.log("Delete notification with id:", item.id);
        };

        const renderRightActions = (progress, dragX) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100],
                outputRange: [100, 0, -100],
            });
            return (
                <TouchableOpacity onPress={onDelete} >
                    {/* <Animated.View style={{ transform: [{ translateX: trans }] }}>
                        <View style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </View>
                    </Animated.View> */}
                    <Image source={require("../../assets/Icon/delete.png")} style={{ width: 40, height: 40, marginTop: 15, marginRight: 20 }} />

                </TouchableOpacity>
            );
        };

        return (
            <GestureHandlerRootView>
                <Swipeable renderRightActions={renderRightActions}>
                    <View style={styles.notificationContainer}>
                        <Image source={item.image} style={styles.notificationImage} />
                        <View style={styles.notificationDetails}>
                            <Text style={styles.notificationText}>{item.notification}</Text>
                            <Text style={{ color: "gray" }}>{item.timing} - {item.date}</Text>
                        </View>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <Header title="Notification" />
                <FlatList
                    data={data}
                    renderItem={({ item }) => <NotificationItem item={item} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    notificationDetails: {
        flex: 1,
    },
    notificationText: {
        fontWeight: 'bold',
        color: "black"
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
    },
    deleteButtonText: {
        color: 'black',
    },
});

export default Notification;
