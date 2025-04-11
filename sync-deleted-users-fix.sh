#!/bin/bash

# This script transfers the modified files for the deleted users fix to the VPS
# Make sure to run this script from the root of your project directory

# Set your VPS details
VPS_USER="root"
VPS_HOST="147.93.41.71"

# Backend files
echo "Transferring backend files..."
scp src/controllers/admin.controller.ts $VPS_USER@$VPS_HOST:/home/lms/src/controllers/
scp src/routes/admin.routes.ts $VPS_USER@$VPS_HOST:/home/lms/src/routes/

# Frontend files
echo "Transferring frontend files..."
scp client/src/services/adminService.ts $VPS_USER@$VPS_HOST:/home/lms/client/src/services/
scp client/src/pages/AdminDashboard.tsx $VPS_USER@$VPS_HOST:/home/lms/client/src/pages/

# Restart the backend service
echo "Restarting backend service..."
ssh $VPS_USER@$VPS_HOST "cd /home/lms && pm2 restart all"

# Rebuild the frontend
echo "Rebuilding frontend..."
ssh $VPS_USER@$VPS_HOST "cd /home/lms/client && npm run build"

echo "Deployment complete!"
