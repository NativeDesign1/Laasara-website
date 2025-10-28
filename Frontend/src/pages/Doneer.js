import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DonationForm from "../../src/components/Doneer/DonationForm";
import SubscriptionForm from "../../src/components/Doneer/MemberShipForm";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';

const stripePromise = loadStripe(
  "pk_test_51MlfU8HM8dE1aPuehjCiSNdPMvzYUcL27JQIC8DTkf4PgMNcPLTBOx3re5eDAexkYFp7Wa9ZioU4H6mhEseIQvJy00Wd1AGhRV"
);

const Doneer = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className=" bg-gradient-to-b from-gray-50 to-white pt-48 pb-16">
        {/* Header Section */}
        <div className="container mx-auto px-4 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Steun Ons Werk
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kies hieronder hoe u wilt bijdragen aan onze missie
          </p>
        </div>

        {/* Cards Container */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Donation Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-red-50 rounded-full mb-4">
                  <FavoriteIcon 
                    className="text-red-500"
                    style={{ fontSize: 40 }}
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Eenmalige Donatie
                </h2>
                <p className="text-gray-600">
                  Steun ons met een eenmalige gift
                </p>
              </div>
              <DonationForm />
            </div>

            {/* Membership Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                  <PeopleIcon 
                    className="text-blue-500"
                    style={{ fontSize: 40 }}
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Word Lid
                </h2>
                <p className="text-gray-600">
                  Steun ons met een maandelijkse bijdrage
                </p>
              </div>
              <SubscriptionForm />
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                100% Impact
              </h3>
              <p className="text-gray-600">
                Uw donatie gaat direct naar onze projecten
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ANBI Status
              </h3>
              <p className="text-gray-600">
                Fiscaal aftrekbaar (861878405)
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Veilig Doneren
              </h3>
              <p className="text-gray-600">
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