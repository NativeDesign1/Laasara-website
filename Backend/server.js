const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_KEY);  // Vervang met je secret key
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const msg = {
    to: process.env.EMAIL_TO,           // Jouw e-mailadres
    from: {
      email: process.env.EMAIL_FROM,    // Gecontroleerd en geverifieerd e-mailadres
      name: email,                      // Optioneel: naam instellen op het e-mailadres van de gebruiker
    },
    replyTo: email,                     // Reply-to adres van de gebruiker
    subject: subject,
    text: `Je hebt een nieuw bericht ontvangen van het contactformulier:\n\nE-mail: ${email}\n\nBericht:\n${message}`,
  };

  try {
    // Verstuur de e-mail
    await sgMail.send(msg);
    res.status(200).json({ message: 'E-mail succesvol verzonden' });
  } catch (error) {
    console.error('Fout bij het verzenden van e-mail:', error);
    res.status(500).json({ message: 'Fout bij het verzenden van e-mail', error: error.message });
  }
});



// Stripe payment intent route
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,  // Ensure the amount is in cents (e.g., 5000 for €50)
      currency: currency || 'eur',
      payment_method_types: ['card', 'ideal', 'bancontact', 'sepa_debit'],  // Add multiple payment methods
    });

    res.send({
      clientSecret: paymentIntent.client_secret,  // Send the clientSecret to the frontend
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

// Stripe subscription session route
app.post('/create-subscription-session', async (req, res) => {
  const { priceId } = req.body;  // Get price ID from frontend

  console.log(`Received priceId: ${priceId}`);  // Log for debugging

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card', 'ideal', 'bancontact', 'sepa_debit'],  // Add multiple payment methods
      line_items: [
        {
          price: priceId,  // Ensure the price ID is correct from Stripe
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/doneer?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/doneer`,
    });

    console.log('Subscription session created:', session.id);  // Log session creation
    res.json({ id: session.id });
  } catch (error) {
    console.log('Error creating session:', error);  // Log the error
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));
