#!/bin/bash

# This script ensures that the supervisor branch is in sync with the origin/main branch
# before pushing to GitHub

# Exit on error
set -e

echo "Syncing branches before pushing to GitHub..."

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Fetch the latest changes from remote
echo "Fetching latest changes from remote..."
git fetch origin

# Check if supervisor branch exists
if git show-ref --verify --quiet refs/heads/supervisor; then
    echo "Supervisor branch exists locally."
else
    echo "Supervisor branch doesn't exist locally. Creating it..."
    git checkout -b supervisor
    git checkout $CURRENT_BRANCH
fi

# Make sure all changes are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "You have uncommitted changes. Please commit them first."
    echo "git add ."
    echo "git commit -m \"Your commit message\""
    exit 1
fi

# Save current branch
echo "Saving current branch: $CURRENT_BRANCH"

# Checkout main branch and pull latest changes
echo "Checking out main branch and pulling latest changes..."
git checkout main
git pull origin main

# Checkout supervisor branch and merge main into it
echo "Checking out supervisor branch and merging main into it..."
git checkout supervisor
git merge main

# Push supervisor branch to origin
echo "Pushing supervisor branch to origin..."
git push origin supervisor

# Return to original branch
echo "Returning to original branch: $CURRENT_BRANCH"
git checkout $CURRENT_BRANCH

echo "Branches have been synced successfully!"
echo ""
echo "Now you can push your changes to GitHub:"
echo "git add ."
echo "git commit -m \"Add audio files\""
echo "git push origin $CURRENT_BRANCH"
echo ""
echo "After pushing, you can deploy to your VPS using the deployment script."
