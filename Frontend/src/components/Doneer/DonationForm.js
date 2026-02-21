import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import CheckoutForm from './CheckoutForm';
import { Euro, ErrorOutline } from '@mui/icons-material';

const stripePromise = loadStripe('pk_live_51MlfU8HM8dE1aPueIeK7Hhchs0uj8WUbs0BjxPxPSbSSGztV6PqtSX89BNWf5XhV6Oy3Gvc4QyXEDi430uHrRdAQ0007fTaCSK');

const DonationForm = () => {
    const { t } = useTranslation();
    const [clientSecret, setClientSecret] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [isPaymentIntentCreated, setIsPaymentIntentCreated] = useState(false);
    const [comment, setComment] = useState('');
    const [email, setEmail] = useState('');
    const [wantReceipt, setWantReceipt] = useState(true); 

    const createPaymentIntent = async () => {
        if (amount < 1) {
            setError(t('donate.oneTime.minAmount'));
            return;
        }

        setError('');

        try {
            const response = await axios.post('https://laasara-backend-8a70df67d523.herokuapp.com/create-payment-intent', {
                amount: amount,
                currency: 'eur',
                comment: comment,
                email: wantReceipt && email ? email : null
            });
            setClientSecret(response.data.clientSecret);
            setIsPaymentIntentCreated(true);
        } catch (error) {
            console.error('Error creating payment intent', error);
            setError(t('common.error'));
        }
    };

    return (
        <div className="space-y-8">
            {/* Amount Input */}
            <div className="space-y-4">
                <label htmlFor="amount" className="block text-lg font-medium text-gray-700">
                    {t('donate.oneTime.amount')}
                </label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Euro className="text-gray-400 group-hover:text-emerald-600 transition-colors duration-200" />
                    </div>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl
                            focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500
                            transition-all duration-200 outline-none
                            group-hover:border-emerald-300"
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
                        className="py-2.5 px-4 text-sm font-medium rounded-lg border border-gray-200
                            hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        €{quickAmount}
                    </button>
                ))}
            </div>

            {/* Email Input */}
            <div className="space-y-4">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                    {t('donate.oneTime.email')}
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('donate.oneTime.emailPlaceholder')}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-200 rounded-lg
                        focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500
                        transition-all duration-200 outline-none
                        hover:border-emerald-300"
                />
                
                {/* Receipt Checkbox */}
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={wantReceipt}
                        onChange={(e) => setWantReceipt(e.target.checked)}
                        className="w-5 h-5 text-emerald-600 border-gray-300 rounded
                            focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-gray-700">{t('donate.oneTime.wantReceipt')}</span>
                </label>
            </div>

            <div className="space-y-4">
                <label htmlFor="comment" className="block text-lg font-medium text-gray-700">
                    {t('donate.oneTime.comment')}
                </label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t('donate.oneTime.commentPlaceholder')}
                    rows={3}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-200 rounded-lg
                        focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500
                        transition-all duration-200 outline-none
                        hover:border-emerald-300"
                />
            </div>

            {/* Donate Button */}
            <button
                onClick={createPaymentIntent}
                disabled={!amount || isPaymentIntentCreated}
                className={`w-full py-3.5 px-6 rounded-lg text-white font-semibold
                    transition-colors duration-200
                    ${!amount ? 'bg-gray-300 cursor-not-allowed' :
                    isPaymentIntentCreated ? 'bg-emerald-500 cursor-not-allowed' :
                    'bg-emerald-600 hover:bg-emerald-700'}`}
            >
                {isPaymentIntentCreated ? `✓ ${t('donate.oneTime.amountChosen')}` : t('donate.oneTime.continue')}
            </button>

            {/* Payment Form */}
            {clientSecret && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">
                        {t('donate.oneTime.paymentDetails')}
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