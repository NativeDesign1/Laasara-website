import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonationForm from "../../src/components/Doneer/DonationForm";
import SubscriptionForm from "../../src/components/Doneer/MemberShipForm";

const stripePromise = loadStripe(
  "pk_test_51MlfU8HM8dE1aPuehjCiSNdPMvzYUcL27JQIC8DTkf4PgMNcPLTBOx3re5eDAexkYFp7Wa9ZioU4H6mhEseIQvJy00Wd1AGhRV"
);

const Doneer = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="relative w-full h-full py-16 px-4 clipped-container">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Steun Ons Werk
        </h1>

        <div className="relative container mx-auto py-16 px-4 h-auto">
          <div className="relative w-full h-full">
            {/* Diagonal background division */}
            <div className="absolute inset-0 bg-lightGreen clip-diagonal-right"></div>

            {/* Main Content */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
              {/* Donation Form */}
              <div className="sm:p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-900 text-center my-8">
                  Doneer
                </h1>
                <DonationForm />
              </div>

              {/* Subscription Form */}
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-gray-900 text-center my-8">
                  Wordt lid!
                </h1>
                <SubscriptionForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Doneer;
