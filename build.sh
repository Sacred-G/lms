#!/bin/bash

# Exit on error
set -e

echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build TypeScript files
echo "Building TypeScript files..."
npm run build

# Create necessary directories
echo "Creating necessary directories..."
mkdir -p dist/quizzes

# Copy quizzes to dist directory
echo "Copying quizzes to dist directory..."
cp -r quizzes/* dist/quizzes/

echo "Build completed successfully!"
