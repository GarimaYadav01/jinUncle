import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const Paypal = () => {
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>PaymentScreen</Text>
      <Button title="Make Payment" onPress={handlePayment} />
    </View>
  );
};

export default Paypal;
