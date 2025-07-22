#!/bin/bash

echo "🚀 Deploying clean-main branch to Vercel..."

# Make sure we're on clean-main branch
git checkout clean-main

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔧 Starting Vercel deployment..."
echo "When prompted:"
echo "1. Set up and deploy: Y"
echo "2. Which scope: Select your account"
echo "3. Link to existing project: N (create new)"
echo "4. Project name: friendgpt-clean (or any name)"
echo "5. In which directory: ./"
echo "6. Want to override settings: N"
echo ""

# Deploy to production from clean-main branch
vercel --prod

echo "✅ Deployment complete!"
echo "Your site should now be live with working images!"