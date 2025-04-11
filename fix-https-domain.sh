#!/bin/bash

# This script will update your Nginx configuration to use HTTPS with your domain

# VPS IP address
VPS_IP="147.93.41.71"

# Domain name
DOMAIN="vps.sbouldin.com"

# Get the VPS username
read -p "Enter your VPS username (default: root): " VPS_USER
VPS_USER=${VPS_USER:-root}

echo "Updating Nginx configuration on ${VPS_USER}@${VPS_IP} for domain ${DOMAIN}..."

# Check if Let's Encrypt certificates exist
echo "Checking if Let's Encrypt certificates exist for ${DOMAIN}..."
CERTS_EXIST=$(ssh ${VPS_USER}@${VPS_IP} "[ -d /etc/letsencrypt/live/${DOMAIN} ] && echo 'yes' || echo 'no'")

if [ "$CERTS_EXIST" = "no" ]; then
    echo "Let's Encrypt certificates not found for ${DOMAIN}."
    echo "Installing certbot and obtaining certificates..."
    
    # Install certbot if not already installed
    ssh ${VPS_USER}@${VPS_IP} "apt-get update && apt-get install -y certbot python3-certbot-nginx"
    
    # Temporarily update Nginx config to use the domain name without HTTPS
    echo "Setting up temporary Nginx configuration for domain verification..."
    ssh ${VPS_USER}@${VPS_IP} "cat > /etc/nginx/sites-available/lms << 'EOL'
server {
    listen 80;
    server_name ${DOMAIN};

    # Root directory for React frontend
    root /home/lms/client/build;
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
    
    # Test and reload Nginx
    ssh ${VPS_USER}@${VPS_IP} "nginx -t && systemctl reload nginx"
    
    # Obtain Let's Encrypt certificates
    echo "Obtaining Let's Encrypt certificates for ${DOMAIN}..."
    ssh ${VPS_USER}@${VPS_IP} "certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos --email admin@${DOMAIN}"
    
    if [ $? -ne 0 ]; then
        echo "Failed to obtain Let's Encrypt certificates. Please check the certbot logs on your VPS."
        exit 1
    fi
else
    echo "Let's Encrypt certificates already exist for ${DOMAIN}."
fi

# Create updated Nginx configuration with HTTPS
echo "Creating updated Nginx configuration with HTTPS..."
ssh ${VPS_USER}@${VPS_IP} "cat > /etc/nginx/sites-available/lms << 'EOL'
# HTTP server - redirects to HTTPS
server {
    listen 80;
    server_name ${DOMAIN};
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://\$host\$request_uri;
}

# HTTPS server
server {
    listen 443 ssl;
    server_name ${DOMAIN};

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Root directory for React build
    root /home/lms/client/build;
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

echo "HTTPS configuration has been updated successfully!"
echo "Your application should now be accessible at https://${DOMAIN}"

# Check if the backend is running
echo "Checking if the backend is running on port 3001..."
BACKEND_RUNNING=$(ssh ${VPS_USER}@${VPS_IP} "netstat -tulpn | grep :3001" || echo "")

if [ -z "$BACKEND_RUNNING" ]; then
    echo "WARNING: The backend does not appear to be running on port 3001."
    echo "Please run the restart-pm2-backend.sh script to start the backend."
else
    echo "The backend is running on port 3001."
fi
