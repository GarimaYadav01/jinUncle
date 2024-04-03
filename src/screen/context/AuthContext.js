import axios, { formToJSON } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { categoridetails, categoriesapi, getcurrentlocation, getprofile, sub_category, sub_categorydetails } from '../../apiconfig/Apiconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [iscategories, setIsCategories] = useState([]);
    const [categoryDetail, setCategoryDetail] = useState(null);
    const [issubCategories, setIsSubCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState([]);
    const [isgetprofile, setIsGetprofile] = useState([]);
    const [issubcategorydetails, setIsSubCategoriesdetails] = useState([]);
    const login = (userData) => {
        setUser(userData);
    };
    const logout = () => {
        setUser(null);
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
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
            const response = await fetch(categoriesapi, requestOptions);
            console.log("Response:", response);
            const result = await response.text();
            console.log("Result:", result);
            if (response.status === 200) {
                const parsedResult = JSON.parse(result); // Parse response as JSON
                setIsCategories(parsedResult.data);
                console.log("Categories:", parsedResult.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleGetlocation = async () => {
        try {
            setIsLoading(true);
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
            const response = await fetch(getcurrentlocation, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);
            if (result.status == 200) {
                setLocation(result.data.current_location);
                console.log("Location:", result.data.current_location);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const fetchDataCategory = async () => {
        try {
            setIsLoading(true);
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
            const response = await fetch(categoridetails, requestOptions);
            const result = await response.json();
            console.log(result);
            setCategoryDetail(result.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };
    const fetchSubCategories = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
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
            const response = await fetch(sub_category, requestOptions);
            const result = await response.json();
            console.log(result);
            if (result.status == 200) {
                setIsSubCategories(result.data);
                setIsLoading(false);
            } else {
                console.error("Failed to fetch sub-categories:", result.message);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };
    const getProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                // body: formdata,
                redirect: "follow"
            };
            const response = await fetch(getprofile, requestOptions);
            const result = await response.json();
            if (response.status == 200) {
                setIsGetprofile(result.data);
                console.log("Result from ---------->", result.data);
            }
            console.log("Result from getProfile---------->", result);
        } catch (error) {
            console.log("Error fetching profile-------->", error);
        }
    };

    const getsubCategoryhandle = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("id", "7");
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch("https://aduetechnologies.com/jinuncle/api/sub_category/detail", requestOptions);
            const result = await response.text();
            console.log("subcategorydetails----->", result);
            if (result.status == 200) {
                setIsSubCategoriesdetails(result.data);
            }
            // Parse the result if needed
            setIsLoading(false);
        } catch (error) {
            console.log("errorsubcategorrydetails------>", error);
        }
    }

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
                issubCategories,
                isLoading,
                getProfile,
                isgetprofile,
                getsubCategoryhandle,
                issubcategorydetails
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
