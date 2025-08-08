#!/bin/bash

echo "🚀 Deploying CRM to GitHub..."

# Build the project
echo "📦 Building project..."
npm run build

# Add all changes
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update CRM - $(date)"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push

echo "✅ Deployment complete!"
echo "🌐 Your CRM is available at: https://github.com/AdelTUN/CRM-Yulia.git"
echo "📱 Mobile-friendly and ready to use!" 