#!/bin/bash

# This script will check and fix the Nginx configuration on your VPS

# Get the VPS IP address
read -p "Enter your VPS IP address (default: 147.93.41.71): " VPS_IP
VPS_IP=${VPS_IP:-147.93.41.71}

# Get the VPS username
read -p "Enter your VPS username (default: root): " VPS_USER
VPS_USER=${VPS_USER:-root}

echo "Checking Nginx configuration on ${VPS_USER}@${VPS_IP}..."

# Check if Nginx is installed
echo "Checking if Nginx is installed..."
ssh ${VPS_USER}@${VPS_IP} "which nginx" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Nginx is not installed. Installing Nginx..."
    ssh ${VPS_USER}@${VPS_IP} "apt-get update && apt-get install -y nginx"
else
    echo "Nginx is installed."
fi

# Check if Nginx is running
echo "Checking if Nginx is running..."
ssh ${VPS_USER}@${VPS_IP} "systemctl is-active nginx" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Nginx is not running. Starting Nginx..."
    ssh ${VPS_USER}@${VPS_IP} "systemctl start nginx"
else
    echo "Nginx is running."
fi

# Create Nginx configuration
echo "Creating Nginx configuration..."
ssh ${VPS_USER}@${VPS_IP} "cat > /etc/nginx/sites-available/lms << 'EOL'
server {
    listen 80;
    server_name _;

    # Proxy frontend requests to React development server
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Proxy API requests to backend
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
ssh ${VPS_USER}@${VPS_IP} "ln -sf /etc/nginx/sites-available/lms /etc/nginx/sites-enabled/"

# Remove default site
echo "Removing default site..."
ssh ${VPS_USER}@${VPS_IP} "rm -f /etc/nginx/sites-enabled/default"

# Test Nginx configuration
echo "Testing Nginx configuration..."
ssh ${VPS_USER}@${VPS_IP} "nginx -t"
if [ $? -ne 0 ]; then
    echo "Nginx configuration test failed. Please check the configuration manually."
    exit 1
fi

# Restart Nginx
echo "Restarting Nginx..."
ssh ${VPS_USER}@${VPS_IP} "systemctl restart nginx"

# Check if Nginx is listening on port 80
echo "Checking if Nginx is listening on port 80..."
ssh ${VPS_USER}@${VPS_IP} "netstat -tulpn | grep :80"
if [ $? -ne 0 ]; then
    echo "Nginx is not listening on port 80. Please check the configuration manually."
    exit 1
fi

echo "Nginx configuration has been fixed successfully!"
echo "Your application should now be accessible at http://${VPS_IP}"
