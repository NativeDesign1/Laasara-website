import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Select from "react-select";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe(
  "pk_live_51MlfU8HM8dE1aPueIeK7Hhchs0uj8WUbs0BjxPxPSbSSGztV6PqtSX89BNWf5XhV6Oy3Gvc4QyXEDi430uHrRdAQ0007fTaCSK",
);

const SubscriptionForm = () => {
  const { t } = useTranslation();
  const [selectedPrice, setSelectedPrice] = useState(
    "price_1Q6WfBHM8dE1aPueXK1VLe30",
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const perMonth = t('common.perMonth');
  const options = [
    { value: "price_1Sl9Y2HM8dE1aPueG1LJijyP", label: `€2,50 ${perMonth}` },
    { value: "price_1Q6WfBHM8dE1aPueXK1VLe30", label: `€5 ${perMonth}` },
    { value: "price_1Sl9YBHM8dE1aPueyU821N4J", label: `€7,50 ${perMonth}` },
    { value: "price_1Q6WfIHM8dE1aPueEcFQS4Cd", label: `€10 ${perMonth}` },
    { value: "price_1Sl9YJHM8dE1aPueqYB3yAXB", label: `€12,50 ${perMonth}` },
    { value: "price_1Q6WfQHM8dE1aPuexsoirJf4", label: `€15 ${perMonth}` },
    { value: "price_1Sl9YSHM8dE1aPueyuEqiVrB", label: `€17,50 ${perMonth}` },
    { value: "price_1Q6Wf2HM8dE1aPuex2mB7ogZ", label: `€20 ${perMonth}` },
    { value: "price_1Sl9YgHM8dE1aPuebF51x7GM", label: `€22,50 ${perMonth}` },
    { value: "price_1QZGc8HM8dE1aPue70tex1zg", label: `€25 ${perMonth}` },
    { value: "price_1Sl9YnHM8dE1aPue3wmUNalv", label: `€27,50 ${perMonth}` },
    { value: "price_1QZGcIHM8dE1aPueHLMPZ30E", label: `€30 ${perMonth}` },
    { value: "price_1Sl9YuHM8dE1aPueLaEO3TOt", label: `€32,50 ${perMonth}` },
    { value: "price_1QZGcQHM8dE1aPueaIJCJW8R", label: `€35 ${perMonth}` },
    { value: "price_1Sl9Z1HM8dE1aPue7OtrkiaD", label: `€37,50 ${perMonth}` },
    { value: "price_1QZGcYHM8dE1aPueixgX0Pj6", label: `€40 ${perMonth}` },
    { value: "price_1Sl9Z8HM8dE1aPuejqlN4864", label: `€42,50 ${perMonth}` },
    { value: "price_1QZGciHM8dE1aPueAujGVg7K", label: `€45 ${perMonth}` },
    { value: "price_1Sl9ZHHM8dE1aPueeTSokXQQ", label: `€47,50 ${perMonth}` },
    { value: "price_1Q6WevHM8dE1aPuehEXe2xBz", label: `€50 ${perMonth}` },
    { value: "price_1St2rpHM8dE1aPueXYHFebB2", label: `€75 ${perMonth}` },
    { value: "price_1St2s3HM8dE1aPuepR6TaJ3b", label: `€100 ${perMonth}` },
  ];

  const handleSubscription = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch(
        "https://laasara-backend-8a70df67d523.herokuapp.com/create-subscription-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priceId: selectedPrice }),
        },
      );

      const data = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (error) {
        console.error("Error redirecting to Stripe:", error);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error creating subscription session:", error);
      setIsProcessing(false);
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0.5rem",
      borderRadius: "0.5rem",
      border: "1px solid",
      borderColor: state.isFocused ? "#059669" : "#E5E7EB",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(5, 150, 105, 0.1)" : "none",
      "&:hover": {
        borderColor: "#059669",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#059669"
        : state.isFocused
          ? "#ECFDF5"
          : "white",
      color: state.isSelected ? "white" : "#1F2937",
      padding: "0.75rem 1rem",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#047857",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
      overflow: "hidden",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    }),
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <AutorenewIcon className="animate-spin-slow" />
          <span>{t('donate.membership.monthlyCancel')}</span>
        </div>
        <p className="text-gray-600 leading-relaxed">
          {t('donate.membership.monthlyInfo')}
        </p>
      </div>

      <form onSubmit={handleSubscription} className="space-y-6">
        <div className="space-y-4">
          <label
            htmlFor="subscriptionPlan"
            className="block text-lg font-medium text-gray-700"
          >
            {t('donate.membership.chooseAmount')}
          </label>
          <Select
            id="subscriptionPlan"
            value={options.find((option) => option.value === selectedPrice)}
            onChange={(option) => setSelectedPrice(option.value)}
            options={options}
            styles={customSelectStyles}
            isSearchable={false}
            className="text-lg"
          />
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3.5 px-6 rounded-lg text-white font-semibold
            transition-colors duration-200
            ${
              isProcessing
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }
            flex items-center justify-center space-x-2`}
        >
          {isProcessing ? (
            <>
              <AutorenewIcon className="animate-spin" />
              <span>{t('donate.membership.processing')}</span>
            </>
          ) : (
            <>
              <PersonAddIcon />
              <span>{t('donate.membership.becomeMember')}</span>
            </>
          )}
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        <p>✓ {t('donate.membership.automated')}</p>
        <p>✓ {t('donate.membership.cancelable')}</p>
        <p>✓ {t('donate.membership.secure')}</p>
      </div>
    </div>
  );
};

export default SubscriptionForm;
