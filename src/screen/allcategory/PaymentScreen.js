import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Header from '../../compontent/Header';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

const { height } = Dimensions.get("screen");

const PaymentScreen = () => {
  const [paymentOption, setPaymentOption] = useState('creditCard');
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

  // Function to navigate to the appropriate screen based on the selected payment option
  const navigateToNextScreen = () => {
    if (paymentOption === 'paypal') {
      // navigation.navigate("Paypal");
      handlePayment();
    } else if (paymentOption === 'cash') {
      navigation.navigate("ContiuneShopping");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Payment option"} />
      <View style={styles.container}>
        <Text style={styles.title}>Select Payment Option</Text>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handlePaymentOptionChange('paypal')}
        >
          <RadioButton
            value="paypal"
            status={paymentOption === 'paypal' ? 'checked' : 'unchecked'}
            onPress={() => handlePaymentOptionChange('paypal')}
          />
          <Text style={styles.text}>PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handlePaymentOptionChange('cash')}
        >
          <RadioButton
            value="cash"
            status={paymentOption === 'cash' ? 'checked' : 'unchecked'}
            onPress={() => handlePaymentOptionChange('cash')}
          />
          <Text style={styles.text}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToNextScreen}
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
