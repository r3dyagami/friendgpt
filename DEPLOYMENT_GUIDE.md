# FriendGPT Monetization Deployment Guide

## 🚀 Quick Start to Monetize Your App

### 1. Set Up Stripe Account
1. Create account at [stripe.com](https://stripe.com)
2. Complete business verification
3. Get your API keys from the [Dashboard](https://dashboard.stripe.com/apikeys)

### 2. Update Frontend Keys
Replace the test key in `character-ai-demo.html` line 3741:
```javascript
// Replace this line:
stripe = Stripe('pk_test_51234567890abcdefghijklmnopqrstuvwxyz123456789');

// With your actual publishable key:
stripe = Stripe('pk_live_YOUR_ACTUAL_PUBLISHABLE_KEY');  // Live key for production
// or
stripe = Stripe('pk_test_YOUR_ACTUAL_TEST_KEY');         // Test key for testing
```

### 3. Choose Your Backend Solution

#### Option A: Node.js/Express (Recommended)
```bash
# 1. Create new project
mkdir friendgpt-backend
cd friendgpt-backend
npm init -y

# 2. Install dependencies
npm install express stripe dotenv cors

# 3. Copy backend code from backend-integration.js
# 4. Create .env file with your keys
```

#### Option B: Python/Flask
```bash
# 1. Create new project
mkdir friendgpt-backend
cd friendgpt-backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install flask stripe python-dotenv

# 4. Copy Python code from backend-integration.js
```

#### Option C: Serverless (Vercel/Netlify)
Use serverless functions for quick deployment without server management.

### 4. Environment Variables
Create `.env` file in your backend:
```env
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
DATABASE_URL=your_database_url_here
PORT=3000
```

### 5. Deploy Backend

#### Heroku Deployment
```bash
# 1. Install Heroku CLI
# 2. Login and create app
heroku login
heroku create friendgpt-backend

# 3. Set environment variables
heroku config:set STRIPE_SECRET_KEY=sk_test_...
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_...

# 4. Deploy
git add .
git commit -m "Initial deployment"
git push heroku main
```

#### Railway Deployment
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Add environment variables
4. Deploy automatically

#### Vercel Deployment
1. Go to [vercel.com](https://vercel.com)
2. Import your project
3. Add environment variables
4. Deploy

### 6. Configure Webhooks
1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. URL: `https://your-backend-url.com/api/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy webhook secret to your `.env` file

### 7. Test Payment Flow

#### Test Cards (Stripe Test Mode)
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Insufficient funds**: 4000 0000 0000 9995
- **3D Secure**: 4000 0000 0000 3220

#### Testing Steps
1. Select credit package
2. Enter test card: 4242 4242 4242 4242
3. Use any future date for expiry
4. Use any 3-digit CVC
5. Verify payment completes
6. Check webhook receives event

### 8. Go Live

#### Switch to Live Mode
1. Get live keys from Stripe Dashboard
2. Update environment variables:
   ```env
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
   STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY
   ```
3. Update frontend with live publishable key
4. Test with real cards (start with small amounts)

#### Final Checklist
- [ ] Live Stripe keys configured
- [ ] Webhook endpoint working
- [ ] SSL certificate installed
- [ ] Error handling tested
- [ ] Payment confirmation emails (optional)
- [ ] Refund policy added
- [ ] Terms of service updated

## 💰 Pricing Strategy

### Suggested Credit Packages
- **Starter Pack**: $1.00 → 100 credits (1¢/credit)
- **Power Pack**: $5.00 → 600 credits (0.83¢/credit) - 17% savings
- **Ultimate Pack**: $10.00 → 1,200 credits (0.83¢/credit) - 17% savings

### Revenue Optimization
1. **A/B Test Pricing**: Try different price points
2. **Add Premium Features**: Exclusive characters, faster responses
3. **Subscription Model**: Monthly unlimited for power users
4. **Seasonal Promotions**: Holiday bonuses, first-time user discounts

## 📊 Analytics & Monitoring

### Key Metrics to Track
- Conversion rate (visitors → purchasers)
- Average order value
- Customer lifetime value
- Churn rate
- Payment success rate

### Monitoring Tools
- Stripe Dashboard (payments, disputes)
- Google Analytics (user behavior)
- Sentry (error tracking)
- Custom dashboard for key metrics

## 🔒 Security Best Practices

1. **Never expose secret keys** in frontend code
2. **Validate all payments** server-side
3. **Use HTTPS** everywhere
4. **Implement rate limiting**
5. **Log all transactions**
6. **Handle webhook authentication**

## 🎯 Next Steps

1. **Deploy basic version** with test keys
2. **Test thoroughly** with test cards
3. **Gather user feedback**
4. **Optimize pricing** based on data
5. **Add premium features**
6. **Scale infrastructure** as needed

## 📞 Support

### Common Issues
- **Payment fails**: Check card details, network connection
- **Webhook not working**: Verify URL, check logs
- **Credits not added**: Check payment_intent.succeeded event

### Resources
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- Test your integration with [Stripe Testing](https://stripe.com/docs/testing)

---

**Ready to launch?** Start with test mode, validate your flow, then switch to live keys and start earning! 🚀