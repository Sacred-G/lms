#!/bin/bash

# Script to update LMS application on VPS
# Usage: bash update-lms-vps.sh

echo "Starting LMS application update process..."

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

# Install dependencies
echo "Installing server dependencies..."
npm install

echo "Installing client dependencies..."
cd client && npm install && cd ..

# Build the application
echo "Building the application..."
if [ -f "build.sh" ]; then
  bash build.sh
else
  # Build server
  npm run build
  
  # Build client
  cd client && npm run build && cd ..
fi

# Apply any database migrations if needed
if [ -f "seed-database.sh" ]; then
  echo "Running database seed script..."
  bash seed-database.sh
fi

# Restart services
echo "Restarting services..."
if command -v pm2 &> /dev/null; then
  pm2 restart all
elif [ -f "docker-compose.yml" ]; then
  docker-compose down && docker-compose up -d
else
  echo "Please restart your application manually."
fi

echo "LMS application update completed!"
