#!/bin/bash

echo "🚀 Quick Vercel Deployment Script"
echo "================================"
echo ""
echo "This script will deploy your clean-main branch to Vercel"
echo ""

# Check if user is logged in to Vercel
echo "Checking Vercel login status..."
if ! npx vercel whoami &>/dev/null; then
    echo "❌ You're not logged in to Vercel!"
    echo ""
    echo "Please run: npx vercel login"
    echo "Then run this script again"
    exit 1
fi

echo "✅ Logged in to Vercel"
echo ""

# Make sure we're on clean-main
git checkout clean-main

# Deploy with all settings pre-configured
echo "🚀 Deploying to Vercel..."
npx vercel --prod --name friendgpt-fixed --yes --force

echo ""
echo "✅ Deployment complete!"
echo "Your site should now be live with working images!"