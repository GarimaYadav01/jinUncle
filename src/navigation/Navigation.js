import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bottomnavigation from './Bottomnavigation';
import Splash from '../screen/auth/Splash';
import LoginScreen from '../screen/auth/LoginScreen';
import ForgetPassword from '../screen/auth/ForgetPassword';
import Otp from '../screen/auth/Otp';
import SignupScreen from '../screen/auth/SignupScreen';
import Resetpassword from '../screen/auth/Resetpassword';
import Location from '../screen/location/Location';
import location2 from '../screen/location/location2';
import Location3 from '../screen/location/location3';
import Mybooking from '../screen/profilescreens/Mybooking';
import Aboutus from '../screen/profilescreens/Aboutus';
import Helpcenter from '../screen/profilescreens/Helpcenter';
import Account from '../screen/helpcenter/Account';
import phonenumber from '../screen/helpcenter/Phonenumber';
import Editprofile from '../screen/helpcenter/Editprofile';
import Saved from '../screen/helpcenter/Saved';
import Changeemail from '../screen/helpcenter/Changeemail';
import Address from '../screen/helpcenter/Address';
import Checksavedpayments from '../screen/helpcenter/Checksavedpayments';
import Managepaymentmethods from '../screen/helpcenter/Managepaymentmethods';
import Wallet from '../screen/profilescreens/Wallet';
import Settings from '../screen/profilescreens/Settings';
import Rateing from '../screen/profilescreens/Rateing';
import Accategory from '../screen/allcategory/Accategory';
import Fridagecategory from '../screen/allcategory/Fridagecategory';
import Washingmachinecategory from '../screen/allcategory/Washingmachinecategory';
import Schechdulebooking from '../screen/profilescreens/Schechdulebooking';
import Addcard from '../screen/helpcenter/Addcard';
import Getting from '../screen/getting/Getting';
import Book from '../screen/booking/Book';
import Booking from '../screen/booking/Booking';
import Cancellation from '../screen/booking/Cancellation';
import Minimum from '../screen/booking/Minimum';
import Professional from '../screen/booking/Professional';
import Unable from '../screen/paymentflow/Unable';
import Gotowallet from '../screen/paymentflow/Gotowallet';
import Jucredits from '../screen/paymentflow/Jucredits';
import Validitywallet from '../screen/paymentflow/Validitywallet';
import Referral from '../screen/paymentflow/Referral';
import Secondreferral from '../screen/paymentflow/Secondreferral';
import Paymentdetails from '../screen/paymentflow/Paymentdetails';
import Jusatefy from '../screen/helpcenter/Jusatefy';
import Warranty from '../screen/helpcenter/Warranty';
import Services from '../screen/helpcenter/Services';
import Pay from '../screen/helpcenter/Pay';
import MyWallet from '../screen/helpcenter/MyWallet';
import Servicedetails from '../screen/payments/Servicedetails';
import Summary from '../screen/payments/Summary';
import Subcategory from '../screen/allcategory/Subcategory';
import PaymentScreen from '../screen/allcategory/PaymentScreen';
import ContiuneShopping from '../screen/home/ContiuneShopping';
import AddressEdit from '../screen/tab/AddressEdit';
const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Bottomnavigation" component={Bottomnavigation} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="Resetpassword" component={Resetpassword} />
                <Stack.Screen name="Location" component={Location} />
                <Stack.Screen name="Location2" component={location2} />
                <Stack.Screen name="Location3" component={Location3} />
                <Stack.Screen name="Mybooking" component={Mybooking} />
                <Stack.Screen name="Aboutus" component={Aboutus} />
                <Stack.Screen name="Helpcenter" component={Helpcenter} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="phonenumber" component={phonenumber} />
                <Stack.Screen name="Editprofile" component={Editprofile} />
                <Stack.Screen name="Saved" component={Saved} />
                <Stack.Screen name="Changeemail" component={Changeemail} />
                <Stack.Screen name="Address" component={Address} />
                <Stack.Screen name="Checksavedpayments" component={Checksavedpayments} />
                <Stack.Screen name="Managepaymentmethods" component={Managepaymentmethods} />
                <Stack.Screen name="Wallet" component={Wallet} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Rateing" component={Rateing} />
                <Stack.Screen name="Accategory" component={Accategory} />
                <Stack.Screen name="Fridagecategory" component={Fridagecategory} />
                <Stack.Screen name="Washingmachinecategory" component={Washingmachinecategory} />
                <Stack.Screen name="Schechdulebooking" component={Schechdulebooking} />
                <Stack.Screen name="Addcard" component={Addcard} />
                <Stack.Screen name="Getting" component={Getting} />
                <Stack.Screen name="Book" component={Book} />
                <Stack.Screen name="Booking" component={Booking} />
                <Stack.Screen name="Cancellation" component={Cancellation} />
                <Stack.Screen name="Minimum" component={Minimum} />
                <Stack.Screen name="Professional" component={Professional} />
                <Stack.Screen name="Unable" component={Unable} />
                <Stack.Screen name="Gotowallet" component={Gotowallet} />
                <Stack.Screen name="Jucredits" component={Jucredits} />
                <Stack.Screen name="Validitywallet" component={Validitywallet} />
                <Stack.Screen name="Referral" component={Referral} />
                <Stack.Screen name="Secondreferral" component={Secondreferral} />
                <Stack.Screen name="Paymentdetails" component={Paymentdetails} />
                <Stack.Screen name="Jusatefy" component={Jusatefy} />
                <Stack.Screen name="Warranty" component={Warranty} />
                <Stack.Screen name="Services" component={Services} />
                <Stack.Screen name="Pay" component={Pay} />
                <Stack.Screen name="MyWallet" component={MyWallet} />
                <Stack.Screen name="Servicedetails" component={Servicedetails} />
                <Stack.Screen name="Summary" component={Summary} />
                <Stack.Screen name="Subcategory" component={Subcategory} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
             
                <Stack.Screen name="ContiuneShopping" component={ContiuneShopping} />
                <Stack.Screen name="AddressEdit" component={AddressEdit} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
