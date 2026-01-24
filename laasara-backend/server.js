const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const sgMail = require("@sendgrid/mail");

const app = express();

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000", // Development
  "https://laasara-backend-8a70df67d523.herokuapp.com/",
  "https://www.laassarafoundation.nl",
  "https://www.laassara.nl",
  "https://www.laassarafoundation.nl",
  "https://laassara.nl",
  // Production
];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

// Apply CORS middleware before routes
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST route to handle contact form submissions
app.post("/api/contact", async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const msg = {
    to: process.env.EMAIL_TO,
    from: {
      email: process.env.EMAIL_FROM,
      name: email,
    },
    replyTo: email,
    subject: subject,
    text: `Je hebt een nieuw bericht ontvangen van het contactformulier:\n\nE-mail: ${email}\n\nBericht:\n${message}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "E-mail succesvol verzonden" });
  } catch (error) {
    console.error("Fout bij het verzenden van e-mail:", error);
    res
      .status(500)
      .json({
        message: "Fout bij het verzenden van e-mail",
        error: error.message,
      });
  }
});

// Stripe payment intent route
app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency, comment } = req.body;
  console.log("comment = ", typeof comment);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency || "eur",
      payment_method_types: ["card", "ideal", "bancontact", "sepa_debit"],
      metadata: { mededeling: comment },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
});

// Determine the domain based on the environment
const isProduction = process.env.NODE_ENV === "production";
const DOMAIN = isProduction ? "https://laassara.nl" : "http://localhost:3000";

// Stripe subscription session route
app.post("/create-subscription-session", async (req, res) => {
  const { priceId } = req.body;

  console.log(`Received priceId: ${priceId}`);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card", "ideal", "bancontact", "sepa_debit"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${DOMAIN}/doneer?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/doneer`,
    });

    console.log("Subscription session created:", session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.log("Error creating session:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server on the appropriate port
const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Server running on port ${port}`));
