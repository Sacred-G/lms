#!/bin/bash

# Exit on error
set -e

# Check if domain name is provided
if [ -z "$1" ]; then
  echo "Error: Domain name is required."
  echo "Usage: ./fix-https-upload-limit.sh yourdomain.com"
  exit 1
fi

DOMAIN=$1

echo "Updating HTTPS Nginx configuration for $DOMAIN to allow larger file uploads..."

# Backup the current configuration
echo "Creating backup of current Nginx configuration..."
cp /etc/nginx/sites-available/lms /etc/nginx/sites-available/lms.bak

# Update the HTTPS server block to include client_max_body_size
echo "Adding client_max_body_size directive to HTTPS configuration..."
sed -i '/server {/,/}/ {
    /listen 443 ssl;/ {
        n
        /client_max_body_size/! s/server_name '"$DOMAIN"';/server_name '"$DOMAIN"';\n    client_max_body_size 50M;/
    }
}' /etc/nginx/sites-available/lms

# Check if the directive was added
if grep -q "client_max_body_size" /etc/nginx/sites-available/lms; then
    echo "client_max_body_size directive added successfully."
else
    echo "Failed to add client_max_body_size directive. Adding manually..."
    # Try a different approach if the sed command didn't work
    awk '/server {/{count++} count==2 && /server_name/ {print; print "    client_max_body_size 50M;"; next} {print}' /etc/nginx/sites-available/lms.bak > /etc/nginx/sites-available/lms
    
    # Check again
    if grep -q "client_max_body_size" /etc/nginx/sites-available/lms; then
        echo "client_max_body_size directive added successfully with alternative method."
    else
        echo "Failed to add client_max_body_size directive. Please add it manually to the HTTPS server block in /etc/nginx/sites-available/lms"
        exit 1
    fi
fi

# Test Nginx configuration
echo "Testing Nginx configuration..."
nginx -t

# Restart Nginx
echo "Restarting Nginx..."
systemctl restart nginx

echo "HTTPS upload limit configuration completed successfully!"
echo "Your application should now allow uploading larger files (up to 50MB) over HTTPS."
echo "Try uploading audio files through the admin panel again."
