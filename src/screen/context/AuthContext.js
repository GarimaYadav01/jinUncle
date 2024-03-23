import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { categoriesapi } from '../../apiconfig/Apiconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [iscategories, setIsCategories] = useState([]);
    const [categoryDetail, setCategoryDetail] = useState(null);
    const [issubCategories, setIsSubCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState([]);
    const login = (userData) => {
        setUser(userData);
    };
    const logout = () => {
        setUser(null);
    };

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");

            const formdata = new FormData();
            formdata.append("page", "0");

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            const response = await fetch("https://aduetechnologies.com/jinuncle/api/category/list", requestOptions);
            console.log("Response:", response);

            const result = await response.text();
            console.log("Result:", result);

            if (response.status === 200) {
                const parsedResult = JSON.parse(result); // Parse response as JSON
                setIsCategories(parsedResult.data);
                console.log("Categories:", parsedResult.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetlocation = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'token': token
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

    const fetchDataCategory = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            // const headers = {
            //     'Content-Type': 'application/json',
            //     'token': token
            // };
            const formdata = new FormData();
            formdata.append("id", "7");
            const requestOptions = {
                method: "POST",
                headers: token,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch("https://aduetechnologies.com/jinuncle/api/category/detail", requestOptions);
            const result = await response.json();
            console.log(result);
            setCategoryDetail(result.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchSubCategories = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            // const headers = {
            //     // 'Content-Type': 'application/json',
            //     'token': token
            // };
            const myHeaders = new Headers();
            myHeaders.append("token", "WlhsS01XTXlWbmxZTW14clNXcHZhVTFVVVdsTVEwcDNXVmhPZW1ReU9YbGFRMGsyU1d0R2EySlhiSFZKVTFFd1RrUlJlVTVFUlhsT1EwWkJTMmxaYkVscGQybGhSemt4WTI1TmFVOXFVVFJNUTBwcldWaFNiRmd6VW5CaVYxVnBUMmxKZVUxRVNUQk1WRUY2VEZSSmVVbEVSVEpQYWtreVQycE5lRWxwZDJsamJUbHpXbE5KTmtscVNXbE1RMHByV2xoYWNGa3lWbVpoVjFGcFQyMDFNV0pIZURrPQ==");
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");

            const formdata = new FormData();
            formdata.append("page", "0");
            formdata.append("category_id", "1");
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch("https://aduetechnologies.com/jinuncle/api/sub_category/list", requestOptions);
            const result = await response.json();
            console.log(result);
            if (result.status == 200) {
                setIsSubCategories(result.data);
            } else {
                console.error("Failed to fetch sub-categories:", result.message);
            }
        } catch (error) {
            console.error(error);
        }
    };











    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                fetchData,
                handleGetlocation,
                location,
                setLocation,
                iscategories,
                setIsCategories,
                fetchDataCategory,
                categoryDetail,
                fetchSubCategories,
                issubCategories
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
