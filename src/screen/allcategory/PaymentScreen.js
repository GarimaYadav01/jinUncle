import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Install and import the necessary package
import Header from '../../compontent/Header';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get("screen");

const PaymentScreen = () => {
  const [paymentOption, setPaymentOption] = useState('creditCard');
  const navigation = useNavigation();
  // const [additionalInfo, setAdditionalInfo] = useState(''); 

  // Function to handle radio button selection
  const handlePaymentOptionChange = (option) => {
    navigation.navigate("ContiuneShopping")
    setPaymentOption(option);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Payment option"} />
      <View style={styles.container}>
        <Text style={styles.title}>Select Payment Option</Text>

        {/* Radio button for Credit Card */}
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handlePaymentOptionChange('creditCard')}
        >
          <RadioButton
            value="creditCard"
            status={paymentOption === 'creditCard' ? 'checked' : 'unchecked'}
            onPress={() => handlePaymentOptionChange('creditCard')}
          />
          <Text style={styles.text}>Credit Card</Text>
        </TouchableOpacity>

        {/* Radio button for PayPal */}
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handlePaymentOptionChange('paypal')}
        >
          <RadioButton
            value="paypal"
            status={paymentOption === 'paypal' ? 'checked' : 'unchecked'}
            onPress={() => handlePaymentOptionChange('paypal')}
          />
          <Text>PayPal</Text>
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
          <Text>Cash</Text>
        </TouchableOpacity>

        {/* Additional field for payment details */}
        {/* <Text style={styles.title}>payment details</Text> */}
        {/* <TextInput
          style={styles.input}
          placeholder=""
        // value={additionalInfo}
        // onChangeText={setAdditionalInfo}
        /> */}
        {/* <TextInput
          style={styles.input}
          placeholder="Additional Information (Coupon code, etc.)"
        // value={additionalInfo}
        // onChangeText={setAdditionalInfo}
        />
        <TextInput
          style={styles.input}
          placeholder="Additional Information (Coupon code, etc.)"
        // value={additionalInfo}
        // onChangeText={setAdditionalInfo}
        /> */}
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  text: {
    color: "gray",
    fontSize: 14,
    fontStyle: "normal"
  }
});

export default PaymentScreen;
