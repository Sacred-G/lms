#!/bin/bash

# This script will fix your LMS application deployment on your VPS
# Run this script locally, not on the VPS

# Exit on error
set -e

echo "Starting deployment fix for LMS application..."

# Get the VPS IP address
read -p "Enter your VPS IP address (default: 147.93.41.71): " VPS_IP
VPS_IP=${VPS_IP:-147.93.41.71}

# Get the VPS username
read -p "Enter your VPS username (default: root): " VPS_USER
VPS_USER=${VPS_USER:-root}

echo "Connecting to ${VPS_USER}@${VPS_IP}..."

# Stop any running processes
echo "Stopping any running processes..."
ssh ${VPS_USER}@${VPS_IP} "pm2 stop all && pm2 delete all"

# Check if the backend is built
echo "Checking if the backend is built..."
ssh ${VPS_USER}@${VPS_IP} "cd /var/www/lms && [ -d 'dist' ] || (echo 'Building backend...' && npm install && npm run build)"

# Check if the frontend is built
echo "Checking if the frontend is built..."
ssh ${VPS_USER}@${VPS_IP} "cd /var/www/lms/client && [ -d 'build' ] || (echo 'Building frontend...' && npm install && npm run build)"

# Create proper Nginx configuration
echo "Creating Nginx configuration..."
ssh ${VPS_USER}@${VPS_IP} "cat > /etc/nginx/sites-available/lms << 'EOL'
server {
    listen 80;
    server_name _;

    # Root directory for React build
    root /var/www/lms/client/build;
    index index.html;

    # Handle React routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy API requests to the backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL"

# Enable the site
echo "Enabling the site..."
ssh ${VPS_USER}@${VPS_IP} "ln -sf /etc/nginx/sites-available/lms /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default"

# Test Nginx configuration
echo "Testing Nginx configuration..."
ssh ${VPS_USER}@${VPS_IP} "nginx -t"

# Restart Nginx
echo "Restarting Nginx..."
ssh ${VPS_USER}@${VPS_IP} "systemctl restart nginx"

# Start the backend with PM2
echo "Starting the backend with PM2..."
ssh ${VPS_USER}@${VPS_IP} "cd /var/www/lms && pm2 start dist/index.js --name 'lms-backend' && pm2 save"

# Check if the backend is running
echo "Checking if the backend is running..."
ssh ${VPS_USER}@${VPS_IP} "pm2 status"

echo "Deployment fix completed!"
echo "Your application should now be accessible at http://${VPS_IP}"
echo "If you're still having issues, check the logs with:"
echo "  ssh ${VPS_USER}@${VPS_IP} 'pm2 logs lms-backend'"
