#!/bin/bash

# Exit on error
set -e

# Check if domain name is provided
if [ -z "$1" ]; then
  echo "Error: Domain name is required."
  echo "Usage: ./setup-https.sh yourdomain.com"
  exit 1
fi

DOMAIN=$1
EMAIL=${2:-"admin@$DOMAIN"}

echo "Setting up HTTPS for $DOMAIN using Let's Encrypt..."

# Install Certbot
echo "Installing Certbot..."
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Obtain SSL certificate (without auto-configuring Nginx)
echo "Obtaining SSL certificate for $DOMAIN..."
certbot certonly --standalone -d $DOMAIN --non-interactive --agree-tos -m $EMAIL

# Update Nginx configuration
echo "Updating Nginx configuration..."
cat > /etc/nginx/sites-available/lms << EOL
# HTTP server - redirects to HTTPS
server {
    listen 80;
    server_name $DOMAIN;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://\$host\$request_uri;
}

# HTTPS server
server {
    listen 443 ssl;
    server_name $DOMAIN;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Root directory for React build
    root /var/www/lms/client/build;
    index index.html;

    # Add headers to allow iframe embedding (if needed)
    add_header X-Frame-Options "ALLOWALL";
    add_header Content-Security-Policy "frame-ancestors *;";

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
EOL

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

# Set up auto-renewal
echo "Setting up automatic certificate renewal..."
echo "0 3 * * * certbot renew --quiet" | crontab -

echo "HTTPS setup completed successfully!"
echo "Your application is now accessible at https://$DOMAIN"
echo "Certificates will be automatically renewed."
