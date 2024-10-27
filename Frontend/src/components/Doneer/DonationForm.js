import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';  
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import the heart icon

// Load Stripe.js with your publishable key
const stripePromise = loadStripe('pk_live_51MlfU8HM8dE1aPueIeK7Hhchs0uj8WUbs0BjxPxPSbSSGztV6PqtSX89BNWf5XhV6Oy3Gvc4QyXEDi430uHrRdAQ0007fTaCSK');

const DonationForm = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [isPaymentIntentCreated, setIsPaymentIntentCreated] = useState(false);

    const createPaymentIntent = async () => {
        if (amount < 1) {
            setError('Please enter a valid amount greater than 0.');
            return;
        }

        setError('');

        try {
            const response = await axios.post('http://localhost:4242/create-payment-intent', {
                amount: amount * 100,
                currency: 'eur',
            });
            setClientSecret(response.data.clientSecret);
            setIsPaymentIntentCreated(true);
        } catch (error) {
            console.error('Error creating payment intent', error);
            setError('Failed to create payment intent. Please try again.');
        }
    };

    return (
      <div className="sm:w-[80%] mx-auto p-6 bg-white shadow-none rounded-md">
        {/* Icon instead of text */}
        <div className="flex justify-center mb-6">
          <FavoriteIcon style={{ fontSize: 48, color: '#D32F2F' }} />  {/* Material UI heart icon */}
        </div>
  
        <div className="mb-8">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-600">
            Bedrag (€)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => {setAmount(e.target.value);
              createPaymentIntent();}
            }
            className="mt-1 block w-full p-2 border my-4  border-gray-300 rounded-md shadow-sm  sm:text-sm"
            placeholder="Bedrag"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
  
        <button
          onClick={createPaymentIntent}
          className={`w-full bg-softBlue text-white py-2 px-4 hover:scale-105 rounded-md transition duration-300 ${isPaymentIntentCreated ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isPaymentIntentCreated}
        >
          {isPaymentIntentCreated ? 'Payment Intent Created' : 'Kies je bedrag'}
        </button>
  
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm amount={amount} />  
          </Elements>
        )}
      </div>
    );
  };

export default DonationForm;
