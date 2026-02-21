import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from 'react-i18next';
import DonationForm from "../../src/components/Doneer/DonationForm";
import SubscriptionForm from "../../src/components/Doneer/MemberShipForm";
import { Heart, Users, Shield, BadgeCheck, Banknote, CheckCircle, X } from 'lucide-react';

const stripePromise = loadStripe(
  "pk_test_51MlfU8HM8dE1aPuehjCiSNdPMvzYUcL27JQIC8DTkf4PgMNcPLTBOx3re5eDAexkYFp7Wa9ZioU4H6mhEseIQvJy00Wd1AGhRV"
);

const Doneer = () => {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentType, setPaymentType] = useState('');

  useEffect(() => {
    // Check URL params for payment confirmation
    const urlParams = new URLSearchParams(window.location.search);
    const redirectStatus = urlParams.get('redirect_status');
    const paymentIntent = urlParams.get('payment_intent');
    const sessionId = urlParams.get('session_id');

    if (redirectStatus === 'succeeded' && paymentIntent) {
      setShowSuccess(true);
      setPaymentType('donation');
      // Clean URL without reloading
      window.history.replaceState({}, '', window.location.pathname);
    } else if (sessionId) {
      setShowSuccess(true);
      setPaymentType('subscription');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <div className="bg-white pt-28 md:pt-32 pb-16">
        
        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative animate-fade-in">
              <button 
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-emerald-600" size={48} />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {t('donate.success.title')}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {paymentType === 'subscription' 
                  ? t('donate.success.subscriptionMessage')
                  : t('donate.success.donationMessage')
                }
              </p>
              
              <p className="text-sm text-gray-500 mb-6">
                {t('donate.success.emailNotice')}
              </p>
              
              <button
                onClick={() => setShowSuccess(false)}
                className="w-full py-3 px-6 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {t('donate.success.close')}
              </button>
            </div>
          </div>
        )}

  return (
    <Elements stripe={stripePromise}>
      <div className="bg-white pt-28 md:pt-32 pb-16">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-white py-12 md:py-16 border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm font-medium tracking-wider text-emerald-600 uppercase mb-3">
              {t('donate.subtitle')}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('donate.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              {t('donate.description')}
            </p>
          </div>
        </div>

        {/* Cards Container */}
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            
            {/* Membership Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-xl mb-4">
                  <Users className="text-emerald-600" size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {t('donate.membership.title')}
                </h2>
                <p className="text-gray-500">
                  {t('donate.membership.description')}
                </p>
              </div>
              <SubscriptionForm />
            </div>

            {/* Donation Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 rounded-xl mb-4">
                  <Heart className="text-emerald-600" size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {t('donate.oneTime.title')}
                </h2>
                <p className="text-gray-500">
                  {t('donate.oneTime.description')}
                </p>
              </div>
              <DonationForm />
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="max-w-5xl mx-auto mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-gray-50 p-5 md:p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg mb-3">
                <Banknote className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {t('donate.trust.impact')}
              </h3>
              <p className="text-sm text-gray-500">
                {t('donate.trust.impactDescription')}
              </p>
            </div>
            <div className="bg-gray-50 p-5 md:p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg mb-3">
                <BadgeCheck className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {t('donate.trust.anbi')}
              </h3>
              <p className="text-sm text-gray-500">
                {t('donate.trust.anbiDescription')}
              </p>
            </div>
            <div className="bg-gray-50 p-5 md:p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg mb-3">
                <Shield className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {t('donate.trust.secure')}
              </h3>
              <p className="text-sm text-gray-500">
                {t('donate.trust.secureDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Doneer;