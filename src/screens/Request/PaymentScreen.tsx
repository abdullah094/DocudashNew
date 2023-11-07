import {
  BillingDetails,
  CardField,
  PaymentSheetError,
  useConfirmPayment,
  useStripe,
} from '@stripe/stripe-react-native';
import tw from 'twrnc';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '@stores/Slices';
const PaymentScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectAccessToken);

  const fetchPaymentSheetParams = async () => {
    var formdata = new FormData();
    formdata.append('amount', '123');
    const response = await fetch(`https://docudash.net/api/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });
    const data = await response.json();
    const { paymentIntent, ephemeralKey, customer } = data.Details;
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <Button
      // variant="primary"
      disabled={!loading}
      title="Checkout"
      onPress={openPaymentSheet}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
});
export default PaymentScreen;
