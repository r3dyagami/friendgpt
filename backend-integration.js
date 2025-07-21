// Backend Integration Examples for FriendGPT Payments
// Choose your backend framework (Node.js/Express, Python/Flask, etc.)

// =============================================================================
// NODE.JS / EXPRESS EXAMPLE
// =============================================================================

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

// Endpoint to create PaymentIntent
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, package_type, credits } = req.body;
        
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
        
        // Store in your database
        // await db.payments.create(paymentData);
        
        console.log('Payment stored:', paymentData);
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
    console.log(`Server running on port ${PORT}`);
});

// =============================================================================
// PYTHON / FLASK EXAMPLE
// =============================================================================

/*
from flask import Flask, request, jsonify
import stripe
import os

app = Flask(__name__)
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

@app.route('/api/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.get_json()
        amount = data['amount']
        currency = data.get('currency', 'usd')
        package_type = data['package_type']
        credits = data['credits']
        
        # Create PaymentIntent with Stripe
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            metadata={
                'package_type': package_type,
                'credits': str(credits),
                'app': 'FriendGPT'
            },
            automatic_payment_methods={
                'enabled': True,
            },
        )
        
        return jsonify({
            'client_secret': payment_intent.client_secret,
            'payment_intent_id': payment_intent.id
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/store-payment', methods=['POST'])
def store_payment():
    try:
        payment_data = request.get_json()
        
        # Store in your database
        # db.payments.insert(payment_data)
        
        print('Payment stored:', payment_data)
        return jsonify({'success': True})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/webhook', methods=['POST'])
def webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.environ.get('STRIPE_WEBHOOK_SECRET')
        )
    except ValueError as e:
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        return 'Invalid signature', 400
    
    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        print('Payment succeeded:', payment_intent['id'])
        
        # Fulfill the purchase - add credits to user account
        # fulfill_purchase(payment_intent)
        
    elif event['type'] == 'payment_intent.payment_failed':
        print('Payment failed:', event['data']['object']['id'])
    
    return jsonify({'received': True})

if __name__ == '__main__':
    app.run(debug=True)
*/

// =============================================================================
// ENVIRONMENT VARIABLES (.env file)
// =============================================================================

/*
# Stripe Keys (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...  # Use sk_live_... for production
STRIPE_PUBLISHABLE_KEY=pk_test_...  # Use pk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_...  # Get from webhook endpoint

# Database
DATABASE_URL=postgresql://...

# Server
PORT=3000
NODE_ENV=development
*/

// =============================================================================
// DEPLOYMENT CHECKLIST
// =============================================================================

/*
1. Set up Stripe account:
   - Create account at https://stripe.com
   - Get API keys from dashboard
   - Set up webhook endpoint

2. Replace test keys with live keys:
   - Update STRIPE_SECRET_KEY in backend
   - Update publishable key in HTML (line 3741)

3. Deploy backend:
   - Heroku, Vercel, Railway, etc.
   - Set environment variables
   - Configure webhook URL in Stripe dashboard

4. Test payment flow:
   - Use Stripe test cards
   - Verify webhook receives events
   - Test error handling

5. Go live:
   - Switch to live keys
   - Test with real cards
   - Monitor payments in Stripe dashboard
*/