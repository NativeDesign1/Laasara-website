const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51MlfU8HM8dE1aPueKqb9FDEJSd9K7LoAmgiJZbzdjhDBjVXx4KCP2gW0YMKUHp1nOrp8J2PhChO4WJqjd7Ay4Guh0013FawN32');  // Replace with your secret key
const app = express();

app.use(express.json());
app.use(cors());

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

app.post('/create-subscription-session', async (req, res) => {
    const { priceId } = req.body;  // Get price ID from frontend
  
    console.log(`Received priceId: ${priceId}`);  // Log for debugging
  
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card', 'ideal', 'bancontact','sepa_debit'],  // Add multiple payment methods
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
