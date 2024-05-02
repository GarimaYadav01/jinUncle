import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Header from '../../compontent/Header';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createorder, paymentOptionget } from '../../apiconfig/Apiconfig';
const { height } = Dimensions.get("screen");

const PaymentScreen = () => {
  const [paymentOption, setPaymentOption] = useState('creditCard');
  const [isLoading, setIsLoading] = useState(false);
  const [ispayment, setIspayment] = useState([])
  console.log("ispayment---->", ispayment)

  const navigation = useNavigation();

  const handlePayment = async () => {
    try {
      const options = {
        description: 'Payment for goods',
        image: require("../../assets/logo/jinnlogo.png"),
        currency: 'INR', // Currency code (e.g., INR, USD)
        key: 'rzp_test_uhu2i0SIc40SxY', // Your Razorpay key
        amount: '10000', // Payment amount in paise (e.g., for ₹100.00, provide 10000)
        name: 'Jinn Uncle',
        prefill: {
          email: 'example@example.com', // User's email
          contact: '1234567890', // User's phone number
          name: 'John Doe', // User's name
        },
        theme: { color: '#004E8C' } // Color theme
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          // Handle success
          console.log('Payment success:', data);
          // alert('Payment success');
          navigation.navigate("ContiuneShopping");

        })
        .catch((error) => {
          // Handle failure
          console.error('Payment failed:', error);
          alert('Payment failed');
        });
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment');
    }
  };
  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const navigateToNextScreen = () => {
    const selectedOption = ispayment.find(option => option.id === paymentOption);
    if (selectedOption && selectedOption.name === 'PayTM') {
      handlePayment();
    } else if (selectedOption && selectedOption.name === 'COD') {
      // Navigate to Cash screen
      navigation.navigate("ContiuneShopping");
    }
  };

  const getpaymentOption = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      myHeaders.append("Cookie", "ci_session=b11173bda63e18cdc2565b9111ff8c30cf7660fd");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      const response = await fetch(paymentOptionget, requestOptions);
      console.log("Response:", response);
      const result = await response.json();
      console.log("result--getpaymentOption->", result)
      if (result.status == 200) {
        setIspayment(result.data.payment_methods)
        console.log("result--getpaymentOption-setIspayment>", result.data.payment_methods)
      }
    } catch (error) {
      console.log("eerrrorrrrr-------->", error)
    }
  }

  useEffect(() => {
    getpaymentOption();
  }, [])


  const handleCreaterorder = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const myHeaders = new Headers();
      myHeaders.append("token", token);
      const formdata = new FormData();
      formdata.append("payment_method", "2");
      formdata.append("address_id", "4");
      formdata.append("slot_date", "2024-04-25");
      formdata.append("slot_time", "10:00 AM");
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
      const response = await fetch(createorder, requestOptions);
      const result = await response.json();
      console.log("---------result-->", result);

    } catch (error) {
      console.log("errror---->", error);
    }
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Payment option"} />
      <View style={styles.container}>
        <Text style={styles.title}>Select Payment Option</Text>
        {ispayment.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.radioButton}
            onPress={() => handlePaymentOptionChange(option.id)}
          >
            <RadioButton
              value={option.id}
              status={paymentOption === option.id ? 'checked' : 'unchecked'}
              onPress={() => handlePaymentOptionChange(option.id)}
            />
            <Text style={styles.text}>{option.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.button}
          // onPress={navigateToNextScreen}
          onPress={handleCreaterorder}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: height * 0.02,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "black"
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#004E8C',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  text: {
    color: "black",
    fontSize: 14,
    fontStyle: "normal"
  }
});

export default PaymentScreen;
