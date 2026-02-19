import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonationForm from "../../src/components/Doneer/DonationForm";
import SubscriptionForm from "../../src/components/Doneer/MemberShipForm";
import { Heart, Users, Shield, BadgeCheck, Banknote } from 'lucide-react';

const stripePromise = loadStripe(
  "pk_test_51MlfU8HM8dE1aPuehjCiSNdPMvzYUcL27JQIC8DTkf4PgMNcPLTBOx3re5eDAexkYFp7Wa9ZioU4H6mhEseIQvJy00Wd1AGhRV"
);

const Doneer = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="bg-white pt-28 md:pt-32 pb-16">
        {/* Header Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-white py-12 md:py-16 border-b border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm font-medium tracking-wider text-emerald-600 uppercase mb-3">
              Steun ons
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Steun Ons Werk
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Kies hieronder hoe u wilt bijdragen aan onze missie
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
                  Word Lid
                </h2>
                <p className="text-gray-500">
                  Steun ons met een maandelijkse bijdrage
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
                  Eenmalige Donatie
                </h2>
                <p className="text-gray-500">
                  Steun ons met een eenmalige gift
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
                100% Impact
              </h3>
              <p className="text-sm text-gray-500">
                Uw donatie gaat direct naar onze projecten
              </p>
            </div>
            <div className="bg-gray-50 p-5 md:p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg mb-3">
                <BadgeCheck className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                ANBI Status
              </h3>
              <p className="text-sm text-gray-500">
                Fiscaal aftrekbaar (861878405)
              </p>
            </div>
            <div className="bg-gray-50 p-5 md:p-6 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg mb-3">
                <Shield className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Veilig Doneren
              </h3>
              <p className="text-sm text-gray-500">
                Via beveiligde betaalmethoden
              </p>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Doneer;