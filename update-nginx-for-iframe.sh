#!/bin/bash

# This script will update your Nginx configuration to allow iframe embedding

# Get the VPS IP address
read -p "Enter your VPS IP address: " VPS_IP

# Get the VPS username
read -p "Enter your VPS username (default: root): " VPS_USER
VPS_USER=${VPS_USER:-root}

echo "Updating Nginx configuration on ${VPS_USER}@${VPS_IP} to allow iframe embedding..."

# Create updated Nginx configuration
echo "Creating updated Nginx configuration..."
ssh ${VPS_USER}@${VPS_IP} "cat > /etc/nginx/sites-available/lms << 'EOL'
server {
    listen 80;
    server_name _;

    # Root directory for React build
    root /var/www/lms/client/build;
    index index.html;

    # Add headers to allow iframe embedding
    add_header X-Frame-Options \"ALLOWALL\";
    add_header Content-Security-Policy \"frame-ancestors *;\";

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

echo "Nginx configuration has been updated successfully!"
echo "Your application should now be embeddable in iframes on other domains."
