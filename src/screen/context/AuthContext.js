import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { categoriesapi } from '../../apiconfig/Apiconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState([]);
    const login = (userData) => {
        setUser(userData);
    };
    const logout = () => {
        setUser(null);
    };

    const handlegetcategory = async () => {
        const token = await AsyncStorage.getItem('token');
        const formdata = new FormData();
        formdata.append("page", "0");
        try {
            const response = await axios({
                method: "post",
                url: categoriesapi,
                headers: token,
                data: formdata
            });
            console.log("reponse--->", response)

        } catch (error) {
            console.log("error---->", error)
        }
    }
    const handleGetlocation = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            // Construct headers object
            const headers = {
                'Content-Type': 'application/json',
                'token': token // Add token to headers
            };
            const requestOptions = {
                method: 'POST',
                headers: headers,
                redirect: 'follow'
            };
            const response = await fetch("https://aduetechnologies.com/jinuncle/api/user/get_current_location", requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);
            if (result.status == 200) {
                setLocation(result.data.current_location);
                console.log("Location:", result.data.current_location);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                handlegetcategory,
                handleGetlocation,
                location,
                setLocation

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
