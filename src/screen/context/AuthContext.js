import axios, { formToJSON } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { categoridetails, categoriesapi, get_most_popular_service, get_offer_banner, getcurrentlocation, getprofile, servicedetails, serviceget, sub_category, sub_categorydetails } from '../../apiconfig/Apiconfig';
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
    const [servericeget, setservericget] = useState([]);
    const [banner, setBanner] = useState([]);
    const [servericdetailsget, setServericdetailsget] = useState([])
    const [mostpolluar, setIsmostpolluar] = useState([]);
    console.log("iscategoriesiscategories----->", iscategories)
    console.log("issubCategoriesissubCate------>", issubCategories)
    console.log("servericeget----servericeget-----dhdhd--->", servericeget)
    console.log("",)
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
            if (response?.status === 200) {
                const parsedResult = JSON.parse(result);
                setIsCategories(parsedResult?.data);
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
            const result = await response.json();
            console.log(result);
            if (result.status == 200) {
                setLocation(result?.data?.current_location);
                console.log("Location:", result?.data.current_location);
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
            const formdata = new FormData();
            formdata.append("id", "7");
            const requestOptions = {
                method: "POST",
                headers: {
                    'token': token
                },
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(categoridetails, requestOptions);
            const result = await response.json();
            console.log("result-fgfg----------->", result);
            if (result?.status == 200) {
                setCategoryDetail(result?.data);
                setIsLoading(false);
                console.log("reponseresponse------>", result.data);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };



    const fetchSubCategories = async () => {
        try {
            const myHeaders = new Headers();
            const token = await AsyncStorage.getItem('token');
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=21ae07cdcb962f9db308f3b0c2ffc4e41b9eca97");
            const formdata = new FormData();
            formdata.append("page", "0");
            formdata.append("category_id", iscategories.id);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            const response = await fetch(sub_category, requestOptions);
            const result = await response.json();
            console.log("----------resiyl --->", result);
            if (result.status == 200) {
                setIsSubCategories(result.data);
                console.log("resudata---->", result.data)
            }
        } catch (error) {
            console.error(error);
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
            if (response?.status == 200) {
                setIsGetprofile(result?.data);
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
            const response = await fetch(sub_categorydetails, requestOptions);
            const result = await response.json();
            console.log("subcategorydetails----->", result);
            if (response?.status === 200) {
                setIsLoading(false);
                setIsSubCategoriesdetails(result?.data);
                console.log("fhisflfkjf----->", result.data)
            }
        } catch (error) {
            console.log("errorsubcategorrydetails------>", error);
        }
    }

    const handlegetservice = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", "WlhsS01XTXlWbmxZTW14clNXcHZhVTFVVldsTVEwcDNXVmhPZW1ReU9YbGFRMGsyU1d0R2EySlhiSFZKVTFFd1RrUlJlVTVFUlhsT1EwWkJTMmxaYkVscGQybGhSemt4WTI1TmFVOXFVVFJNUTBwcldWaFNiRmd6VW5CaVYxVnBUMmxKZVUxRVNUQk1WRUY2VEZSSmVVbEVSVEZQYWtreVQycFJlRWxwZDJsamJUbHpXbE5KTmtscVNXbE1RMHByV2xoYWNGa3lWbVpoVjFGcFQyMDFNV0pIZURrPQ==");
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append("cat_id", iscategories.id);
            formdata.append("sub_cat_id", issubCategories.id);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };

            const response = await fetch(serviceget, requestOptions);
            const result = await response.json();
            console.log("serviceget------->", result);

            if (result?.status == 200) {
                setservericget(result?.data);
                setIsLoading(false);
                console.log("resultresponse------>", result.data);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    const handlebannerhome = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const requestOptions = {
                method: "GET",
                headers: {
                    token: token
                },
                redirect: "follow"
            };
            const response = await fetch(get_offer_banner, requestOptions);
            const result = await response.json();
            console.log("Response from API------->", result);
            if (response?.status === 200) {
                setBanner(result?.data);
                setIsLoading(false);
                console.log("Response banner data------->", result?.data);

            }
        } catch (error) {
            console.error("API Error:", error);
            setIsLoading(false);
        }
    };



    const handledetailsservice = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem('token');
            const formdata = new FormData();
            formdata.append("service_id", "1");
            const requestOptions = {
                method: "POST",
                headers: token,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(servicedetails, requestOptions);
            const result = await response.json();
            console.log("resultresult--->", result)
            setIsLoading(false);
        } catch (error) {
            console.error("handledetailsserviceerrorrr------>", error);
            setIsLoading(false);
        }
    }



    const handlemostpopularservice = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const formdata = new FormData();
            formdata.append('service_id', servericeget.id);
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };
            const response = await fetch(get_most_popular_service, requestOptions);
            const result = await response.json();
            console.log("resultmost------>", result);
            if (response?.status === 200) {
                setIsmostpolluar(result?.data);
                console.log("resultstatus--------->", result.data);
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
                issubCategories,
                isLoading,
                getProfile,
                isgetprofile,
                getsubCategoryhandle,
                issubcategorydetails,
                handlegetservice,
                servericeget,
                handlebannerhome,
                banner,
                handledetailsservice,
                servericdetailsget,
                handlemostpopularservice,
                mostpolluar,
                setIsmostpolluar
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
