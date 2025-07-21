require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'FriendGPT Payment Server Running' });
});

// Endpoint to create PaymentIntent
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, package_type, credits } = req.body;
        
        // Validate required fields
        if (!amount || !package_type || !credits) {
            return res.status(400).json({ 
                error: 'Missing required fields: amount, package_type, credits' 
            });
        }
        
        // Create PaymentIntent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: currency || 'usd',
            metadata: {
                package_type: package_type,
                credits: credits.toString(),
                app: 'FriendGPT'
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });
        
        res.json({
            client_secret: paymentIntent.client_secret,
            payment_intent_id: paymentIntent.id
        });
        
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ 
            error: 'Failed to create payment intent' 
        });
    }
});

// Endpoint to store payment records
app.post('/api/store-payment', async (req, res) => {
    try {
        const paymentData = req.body;
        
        // Store in your database (for now just log)
        console.log('Payment stored:', paymentData);
        
        // TODO: Add database storage
        // await db.payments.create(paymentData);
        
        res.json({ success: true });
        
    } catch (error) {
        console.error('Error storing payment:', error);
        res.status(500).json({ error: 'Failed to store payment' });
    }
});

// Webhook endpoint to handle Stripe events
app.post('/api/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(
            req.body, 
            sig, 
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment succeeded:', paymentIntent.id);
            
            // Fulfill the purchase - add credits to user account
            // await fulfillPurchase(paymentIntent);
            break;
            
        case 'payment_intent.payment_failed':
            console.log('Payment failed:', event.data.object.id);
            break;
            
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    
    res.json({received: true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 FriendGPT Payment Server running on port ${PORT}`);
    console.log(`💳 Stripe integration ready`);
    console.log(`📋 Test with: curl http://localhost:${PORT}`);
});