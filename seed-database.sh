#!/bin/bash

# Exit on error
set -e

echo "Starting database seeding process..."

# Check if we're in the right directory
if [ ! -d "/var/www/lms" ]; then
  echo "Error: /var/www/lms directory not found. Make sure you've deployed the application first."
  exit 1
fi

# Navigate to the application directory
cd /var/www/lms

# Run the seed script
echo "Running database seed script..."
NODE_ENV=production npm run seed

echo "Database seeding completed successfully!"
echo "You can now access your application with the seeded data."
