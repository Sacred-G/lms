#!/bin/bash

# Script to update an existing repository on VPS
# Usage: bash update-vps.sh

echo "Starting application update process..."

# Navigate to the existing repository
cd /home/lms

# Check if we're in a git repository
if [ ! -d ".git" ]; then
  echo "Error: Not a git repository. Make sure you're in the correct directory."
  exit 1
fi

# Store any local changes
echo "Checking for local changes..."
if [[ $(git status --porcelain) ]]; then
  echo "Local changes detected. Stashing them for later..."
  git stash
  CHANGES_STASHED=true
else
  echo "No local changes detected."
  CHANGES_STASHED=false
fi

# Update the repository
echo "Fetching latest changes from remote repository..."
git fetch origin

# Get the current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $CURRENT_BRANCH"

# Pull the latest changes
echo "Pulling latest changes..."
git pull origin $CURRENT_BRANCH

# If there were local changes, try to reapply them
if [ "$CHANGES_STASHED" = true ]; then
  echo "Reapplying local changes..."
  git stash pop
  
  # Check if there were conflicts
  if [[ $(git status --porcelain | grep "UU") ]]; then
    echo "Warning: There were conflicts when reapplying your local changes."
    echo "You'll need to resolve these conflicts manually."
  else
    echo "Local changes reapplied successfully."
  fi
fi

# Install any new dependencies
echo "Installing dependencies..."
if [ -f "package.json" ]; then
  npm install
fi

if [ -f "client/package.json" ]; then
  echo "Installing client dependencies..."
  cd client && npm install && cd ..
fi

# Build the application if needed
echo "Building the application..."
if [ -f "build.sh" ]; then
  bash build.sh
elif [ -f "package.json" ]; then
  npm run build
fi

echo "Update process completed!"
echo "You may need to restart your application for changes to take effect."
echo "Typical commands to restart might be:"
echo "  - pm2 restart all"
echo "  - systemctl restart your-service-name"
echo "  - docker-compose down && docker-compose up -d"
