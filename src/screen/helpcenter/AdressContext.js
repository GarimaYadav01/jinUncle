import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Address from './Address';
const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [addressId, setAddressId] = useState(null);

    useEffect(() => {
        const loadDefaultAddressId = async () => {
            try {
                const savedAddressId = await AsyncStorage.getItem('addressId');
                if (savedAddressId !== null) {
                    setAddressId(savedAddressId);
                } else {
                    // Fetch the default address ID from the API if not found in AsyncStorage
                    const defaultAddress = await Address();
                    if (defaultAddress && defaultAddress.id) {
                        setAddressId(defaultAddress.id);
                        await AsyncStorage.setItem('addressId', defaultAddress.id);
                    }
                }
            } catch (error) {
                console.log("Error loading addressId:", error);
            }
        };

        loadDefaultAddressId();
    }, []);

    const setAddressIdValue = async (value) => {
        try {
            setAddressId(value);
            await AsyncStorage.setItem('addressId', value);
        } catch (error) {
            console.log("Error saving addressId:", error);
        }
    };

    return (
        <AddressContext.Provider value={{ addressId, setAddressIdValue, Address }}>
            {children}
        </AddressContext.Provider>
    );
};

export default AddressContext;
