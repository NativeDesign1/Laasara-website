import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import { Euro, ErrorOutline } from '@mui/icons-material';

const stripePromise = loadStripe('pk_live_51MlfU8HM8dE1aPueIeK7Hhchs0uj8WUbs0BjxPxPSbSSGztV6PqtSX89BNWf5XhV6Oy3Gvc4QyXEDi430uHrRdAQ0007fTaCSK');

const DonationForm = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [isPaymentIntentCreated, setIsPaymentIntentCreated] = useState(false);
    const [comment, setComment] = useState(''); 

    const createPaymentIntent = async () => {
        if (amount < 1) {
            setError('Voer een geldig bedrag in (minimaal €1)');
            return;
        }

        setError('');

        try {
            const response = await axios.post('https://laasara-backend-8a70df67d523.herokuapp.com/create-payment-intent', {
                amount: amount,
                currency: 'eur',
                comment: comment
            });
            setClientSecret(response.data.clientSecret);
            setIsPaymentIntentCreated(true);
        } catch (error) {
            console.error('Error creating payment intent', error);
            setError('Er is een fout opgetreden. Probeer het opnieuw.');
        }
    };

    return (
        <div className="space-y-8">
            {/* Amount Input */}
            <div className="space-y-4">
                <label htmlFor="amount" className="block text-lg font-medium text-gray-700">
                    Donatiebedrag
                </label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Euro className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                    </div>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl
                            focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                            transition-all duration-200 outline-none
                            group-hover:border-blue-300"
                        placeholder="0.00"
                    />
                </div>
                {error && (
                    <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <ErrorOutline fontSize="small" />
                        <span>{error}</span>
                    </div>
                )}
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-3">
                {[5, 10, 25, 50, 100, 250].map((quickAmount) => (
                    <button
                        key={quickAmount}
                        onClick={() => setAmount(quickAmount)}
                        className="py-2 px-4 text-sm font-medium rounded-lg border-2 border-gray-200
                            hover:border-blue-500 hover:bg-blue-50 transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        €{quickAmount}
                    </button>
                ))}
            </div>
            <div className="space-y-4">
                <label htmlFor="comment" className="block text-lg font-medium text-gray-700">
                    Opmerkingen (optioneel)
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Voeg een opmerking toe bij uw donatie..."
                    rows={3}
                    className="w-full px-4 py-3 text-gray-700 border-2 border-gray-200 rounded-xl
                        focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                        transition-all duration-200 outline-none
                        hover:border-blue-300"
                />
            </div>

            {/* Donate Button */}
            <button
                onClick={createPaymentIntent}
                disabled={!amount || isPaymentIntentCreated}
                className={`w-full py-4 px-6 rounded-xl text-white text-lg font-semibold
                    transition-all duration-300 transform hover:scale-[1.02]
                    ${!amount ? 'bg-gray-400 cursor-not-allowed' :
                    isPaymentIntentCreated ? 'bg-green-500 cursor-not-allowed' :
                    'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'}
                    shadow-md hover:shadow-lg`}
            >
                {isPaymentIntentCreated ? '✓ Bedrag Gekozen' : 'Doorgaan met Doneren'}
            </button>

            {/* Payment Form */}
            {clientSecret && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">
                        Betaalgegevens
                    </h3>
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm amount={amount} />
                    </Elements>
                </div>
            )}
        </div>
    );
};

export default DonationForm;