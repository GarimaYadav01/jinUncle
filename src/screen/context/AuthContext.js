import axios, { formToJSON } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { categoridetails, categoriesapi, getcurrentlocation, getprofile, serviceget, sub_category, sub_categorydetails } from '../../apiconfig/Apiconfig';
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

    // const fetchDataCategory = async () => {
    //     try {
    //         setIsLoading(true);
    //         const token = await AsyncStorage.getItem('token');
    //         const formdata = new FormData();
    //         formdata.append("id", "7");
    //         const requestOptions = {
    //             method: "POST",
    //             headers: token,
    //             body: formdata,
    //             redirect: "follow"
    //         };
    //         const response = await fetch(categoridetails, requestOptions);
    //         const result = await response.json();
    //         console.log("result-fgfg----------->", result);
    //         if (result.status == 200) {
    //             setIsLoading(false);
    //             setCategoryDetail(result.data);

    //             console.log("reponse------>", result.data)
    //         }

    //     } catch (error) {
    //         console.error(error);
    //         setIsLoading(false);
    //     }
    // };



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
            if (result.status == 200) {
                setCategoryDetail(result.data);
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
            const response = await fetch(sub_categorydetails, requestOptions);
            const result = await response.json();
            console.log("subcategorydetails----->", result);
            if (response.status === 200) {
                setIsLoading(false);
                setIsSubCategoriesdetails(result.data);
                console.log("fhisflfkjf----->", result.data)
            }
        } catch (error) {
            console.log("errorsubcategorrydetails------>", error);
        }
    }

    const handlegetservice = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
            const categoryId = iscategories.length > 0 ? iscategories.id : null;
            // Get the subcategory ID
            const subCategoryId = issubCategories.length > 0 ? issubCategories.id : null;

            // const formdata = new FormData();
            // formdata.append("cat_id", categoryId);
            // console.log("categoryid ----->", categoryId);
            // formdata.append("sub_cat_id", subCategoryId);
            // console.log("sub_cat_id------>", subCategoryId);

            const formdata = new FormData();
            formdata.append("cat_id", "1");
            formdata.append("sub_cat_id", "2");

            // // Append all category IDs
            // iscategories.forEach(category => {
            //     formdata.append("cat_id[]", category.id);
            //     console.log("hdjchd--->", category.id)
            // });

            // // Append all subcategory IDs
            // issubCategories.forEach(subcategory => {
            //     formdata.append("sub_cat_id[]", subcategory.id);
            // });


            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: formdata,
                redirect: "follow"
            };
            const response = await fetch(serviceget, requestOptions)
            const result = await response.json();
            console.log("kkjslkaskljsjkk----->", result)
            if (result.status == 200) {
                setservericget(result.data);
                console.log("djkaddl---->", result.data)
            }
        } catch (error) {
            console.log("errorservice---------->", error)
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
                issubcategorydetails,
                handlegetservice,
                servericeget,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
