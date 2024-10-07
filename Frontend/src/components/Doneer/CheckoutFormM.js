// CheckoutForm.js
import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutFormM = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [isProcessing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/success', // Your success URL
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Payment succeeded!');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        {isProcessing ? 'Processing...' : 'Subscribe'}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutFormM;
