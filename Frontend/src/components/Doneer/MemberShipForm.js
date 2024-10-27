import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Select from 'react-select';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Import the membership icon

const stripePromise = loadStripe('pk_live_51MlfU8HM8dE1aPueIeK7Hhchs0uj8WUbs0BjxPxPSbSSGztV6PqtSX89BNWf5XhV6Oy3Gvc4QyXEDi430uHrRdAQ0007fTaCSK');

const SubscriptionForm = () => {
  const [selectedPrice, setSelectedPrice] = useState('price_1Q6WfBHM8dE1aPueXK1VLe30');
  const [isProcessing, setIsProcessing] = useState(false);

  const options = [
    { value: 'price_1Q6WfBHM8dE1aPueXK1VLe30', label: '€5' },
    { value: 'price_1Q6WfIHM8dE1aPueEcFQS4Cd', label: '€10' },
    { value: 'price_1Q6WfQHM8dE1aPuexsoirJf4', label: '€15' },
    { value: 'price_1Q6Wf2HM8dE1aPuex2mB7ogZ', label: '€20' },
    { value: 'price_1Q6WevHM8dE1aPuehEXe2xBz', label: '€50' },
  ];

  const handleSubscription = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:4242/create-subscription-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: selectedPrice }),
      });

      const data = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (error) {
        console.error('Error redirecting to Stripe:', error);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error creating subscription session:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4 bg-white  rounded-lg">
      <div className="flex justify-center items-center mb-6">
        <PersonAddIcon style={{ fontSize: 48 }} className="text-blue-600 text-4xl " /> {/* Add the icon */}
        
      </div>
      <p className='text-center'>Maak het verschil met een maandelijkse bijdrage en steun ons werk om positieve verandering te creëren. Samen kunnen we een impact maken!</p>
      <form onSubmit={handleSubscription}>
        <div className="mb-4">
          <label htmlFor="subscriptionPlan" className="block text-lg font-normal mb-2 text-left">
            Maandelijks bedrag
          </label>
          <Select
            id="subscriptionPlan"
            value={options.find((option) => option.value === selectedPrice)}
            onChange={(option) => setSelectedPrice(option.value)}
            options={options}
            className="w-full text-md border-sm-gray border-gray-300 rounded-lg shadow-none focus:outline-none"
            styles={{
              control: (provided) => ({
                ...provided,
                padding: '0.5rem',
                borderRadius: '8px',
              }),
              option: (provided, state) => ({
                ...provided,
                borderRadius: state.isSelected ? '8px' : '8px',
                backgroundColor: state.isSelected ? '#D3D3D3' : state.isFocused ? '#D3D3D3' : null,
                color: state.isSelected ? '#fff' : '#000',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#000',
                borderRadius: '8px',
              }),
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-lightGreen text-white py-2 px-4 rounded-md hover:scale-80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isProcessing ? 'Wordt verwerkt...' : 'Abonneer'}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
