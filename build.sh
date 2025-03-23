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

# No need to copy quizzes as they will be compiled by TypeScript
echo "Quizzes will be compiled by TypeScript..."

echo "Build completed successfully!"
