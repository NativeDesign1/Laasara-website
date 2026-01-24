import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Select from "react-select";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const stripePromise = loadStripe(
  "pk_live_51MlfU8HM8dE1aPueIeK7Hhchs0uj8WUbs0BjxPxPSbSSGztV6PqtSX89BNWf5XhV6Oy3Gvc4QyXEDi430uHrRdAQ0007fTaCSK",
);

const SubscriptionForm = () => {
  const [selectedPrice, setSelectedPrice] = useState(
    "price_1Q6WfBHM8dE1aPueXK1VLe30",
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const options = [
    { value: "price_1Sl9Y2HM8dE1aPueG1LJijyP", label: "€2,50 per maand" },
    { value: "price_1Q6WfBHM8dE1aPueXK1VLe30", label: "€5 per maand" },
    { value: "price_1Sl9YBHM8dE1aPueyU821N4J", label: "€7,50 per maand" },
    { value: "price_1Q6WfIHM8dE1aPueEcFQS4Cd", label: "€10 per maand" },
    { value: "price_1Sl9YJHM8dE1aPueqYB3yAXB", label: "€12,50 per maand" },
    { value: "price_1Q6WfQHM8dE1aPuexsoirJf4", label: "€15 per maand" },
    { value: "price_1Sl9YSHM8dE1aPueyuEqiVrB", label: "€17,50 per maand" },
    { value: "price_1Q6Wf2HM8dE1aPuex2mB7ogZ", label: "€20 per maand" },
    { value: "price_1Sl9YgHM8dE1aPuebF51x7GM", label: "€22,50 per maand" },
    { value: "price_1QZGc8HM8dE1aPue70tex1zg", label: "€25 per maand" },
    { value: "price_1Sl9YnHM8dE1aPue3wmUNalv", label: "€27,50 per maand" },
    { value: "price_1QZGcIHM8dE1aPueHLMPZ30E", label: "€30 per maand" },
    { value: "price_1Sl9YuHM8dE1aPueLaEO3TOt", label: "€32,50 per maand" },
    { value: "price_1QZGcQHM8dE1aPueaIJCJW8R", label: "€35 per maand" },
    { value: "price_1Sl9Z1HM8dE1aPue7OtrkiaD", label: "€37,50 per maand" },
    { value: "price_1QZGcYHM8dE1aPueixgX0Pj6", label: "€40 per maand" },
    { value: "price_1Sl9Z8HM8dE1aPuejqlN4864", label: "€42,50 per maand" },
    { value: "price_1QZGciHM8dE1aPueAujGVg7K", label: "€45 per maand" },
    { value: "price_1Sl9ZHHM8dE1aPueeTSokXQQ", label: "€47,50 per maand" },
    { value: "price_1Q6WevHM8dE1aPuehEXe2xBz", label: "€50 per maand" },
    { value: "price_1St2rpHM8dE1aPueXYHFebB2", label: "€75 per maand" },
    { value: "price_1St2s3HM8dE1aPuepR6TaJ3b", label: "€100 per maand" },
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
      borderRadius: "1rem",
      border: "2px solid",
      borderColor: state.isFocused ? "#3B82F6" : "#E5E7EB",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "none",
      "&:hover": {
        borderColor: "#3B82F6",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3B82F6"
        : state.isFocused
          ? "#EFF6FF"
          : "white",
      color: state.isSelected ? "white" : "#1F2937",
      padding: "0.75rem 1rem",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "#2563EB",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "1rem",
      overflow: "hidden",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    }),
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <AutorenewIcon className="animate-spin-slow" />
          <span>Maandelijks opzegbaar</span>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Maak het verschil met een maandelijkse bijdrage en steun ons werk om
          positieve verandering te creëren.
        </p>
      </div>

      <form onSubmit={handleSubscription} className="space-y-6">
        <div className="space-y-4">
          <label
            htmlFor="subscriptionPlan"
            className="block text-lg font-medium text-gray-700"
          >
            Kies uw maandelijkse bijdrage
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
          className={`w-full py-4 px-6 rounded-xl text-white text-lg font-semibold
            transition-all duration-300 transform hover:scale-[1.02]
            ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            }
            shadow-md hover:shadow-lg flex items-center justify-center space-x-2`}
        >
          {isProcessing ? (
            <>
              <AutorenewIcon className="animate-spin" />
              <span>Wordt verwerkt...</span>
            </>
          ) : (
            <>
              <PersonAddIcon />
              <span>Word nu lid</span>
            </>
          )}
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        <p>✓ Volledig geautomatiseerd</p>
        <p>✓ Maandelijks opzegbaar</p>
        <p>✓ Veilig betalen via Stripe</p>
      </div>
    </div>
  );
};

export default SubscriptionForm;
