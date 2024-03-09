import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const Intergationpayment = () => {
  const { confirmPayment } = useStripe();

  const handlePayment = async () => {
    try {
      // Replace 'YOUR_PUBLISHABLE_KEY' with your actual publishable key from Stripe Dashboard
      const { paymentMethod } = await confirmPayment({
        type: 'Card',
        billingDetails: {
          email: 'user@example.com',
        },
      });
      console.log('Payment successful:', paymentMethod);
      // Handle successful payment, e.g., navigate to a success screen
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment failure, e.g., display error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Screen</Text>
      <Button title="Make Payment" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Intergationpayment;
