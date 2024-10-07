import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = React.useState('');
  const [isProcessing, setProcessing] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/doneer',  // Replace with your return URL
      },
    });

    if (error) {
      setMessage(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else {
      setMessage('Payment successful!');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white  rounded-md">
      

      {/* Display Payment Element */}
      <div className="mb-6">
        <PaymentElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white ${isProcessing ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} transition duration-300`}
      >
        {isProcessing ? 'Processing...' : `Doneer €${amount}`}
      </button>

      {message && (
        <p className="mt-4 text-center text-red-500 font-semibold">{message}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
