#!/bin/bash
# This script fixes the HTTPS Nginx upload size limit on the VPS
# For Windows users: Run this script using Git Bash or WSL

# VPS SSH details
VPS_SSH="root@147.93.41.71"
DOMAIN="vps.sbouldin.com"

echo "Starting fix for HTTPS Nginx upload size limit on VPS..."

# SSH into VPS to check and fix the Nginx configuration
echo "Checking and fixing Nginx configuration on VPS..."
ssh ${VPS_SSH} << EOF
  # Backup the current configuration
  echo "Creating backup of current Nginx configuration..."
  if [ -f "/etc/nginx/sites-available/lms" ]; then
    cp /etc/nginx/sites-available/lms /etc/nginx/sites-available/lms.bak
  else
    echo "Warning: /etc/nginx/sites-available/lms not found. Checking other locations..."
    # Try to find the Nginx configuration file
    NGINX_CONF_PATH=\$(nginx -t 2>&1 | grep "configuration file" | awk '{print \$4}' | tr -d ":")
    if [ -z "\$NGINX_CONF_PATH" ]; then
      # Try common locations
      if [ -f "/etc/nginx/nginx.conf" ]; then
        NGINX_CONF_PATH="/etc/nginx/nginx.conf"
      elif [ -f "/usr/local/nginx/conf/nginx.conf" ]; then
        NGINX_CONF_PATH="/usr/local/nginx/conf/nginx.conf"
      else
        echo "Could not find Nginx configuration file. Please check your Nginx installation."
        exit 1
      fi
    fi
    echo "Found Nginx configuration file at: \$NGINX_CONF_PATH"
    cp \$NGINX_CONF_PATH \$NGINX_CONF_PATH.bak
  fi

  # Find the HTTPS server block configuration
  HTTPS_CONF=\$(find /etc/nginx/ -type f -exec grep -l "listen 443 ssl" {} \; 2>/dev/null | head -n 1)
  
  if [ -z "\$HTTPS_CONF" ]; then
    echo "Could not find HTTPS server block configuration. Checking other locations..."
    HTTPS_CONF=\$(find /etc/nginx/ -type f -exec grep -l "server_name ${DOMAIN}" {} \; 2>/dev/null | head -n 1)
  fi
  
  if [ -n "\$HTTPS_CONF" ]; then
    echo "Found HTTPS configuration at: \$HTTPS_CONF"
    
    # Check if client_max_body_size is already set in the HTTPS server block
    if grep -q "client_max_body_size" "\$HTTPS_CONF"; then
      echo "client_max_body_size is already set in HTTPS configuration."
      echo "Current setting:"
      grep "client_max_body_size" "\$HTTPS_CONF"
      
      # Update the client_max_body_size to 50M
      echo "Updating client_max_body_size to 50M..."
      sed -i 's/client_max_body_size [0-9]*[kKmMgG]\?;/client_max_body_size 50M;/g' "\$HTTPS_CONF"
    else
      echo "client_max_body_size is not set in HTTPS configuration."
      echo "Adding client_max_body_size 50M to HTTPS server block..."
      
      # Add client_max_body_size to the server block that contains 'listen 443 ssl'
      sed -i '/listen 443 ssl/,/server_name/ s/server_name [^;]*;/&\n    client_max_body_size 50M;/' "\$HTTPS_CONF"
      
      # Check if the directive was added
      if ! grep -q "client_max_body_size" "\$HTTPS_CONF"; then
        echo "Failed to add client_max_body_size with first method. Trying alternative..."
        # Try a different approach
        sed -i '/server {/,/listen 443 ssl/ s/listen 443 ssl;/&\n    client_max_body_size 50M;/' "\$HTTPS_CONF"
      fi
    fi
    
    # Check if the directive was added
    if grep -q "client_max_body_size" "\$HTTPS_CONF"; then
      echo "client_max_body_size directive added/updated successfully."
    else
      echo "Failed to add client_max_body_size directive. Please add it manually to the HTTPS server block."
      echo "Add the following line inside the server block that has 'listen 443 ssl':"
      echo "    client_max_body_size 50M;"
      exit 1
    fi
  else
    echo "Could not find HTTPS server block configuration. Checking main nginx.conf..."
    
    # Try to add to the http block in the main configuration
    NGINX_CONF="/etc/nginx/nginx.conf"
    if [ -f "\$NGINX_CONF" ]; then
      echo "Adding client_max_body_size to http block in \$NGINX_CONF..."
      
      # Check if client_max_body_size is already set in the http block
      if grep -q "client_max_body_size" "\$NGINX_CONF"; then
        echo "client_max_body_size is already set in main configuration."
        echo "Current setting:"
        grep "client_max_body_size" "\$NGINX_CONF"
        
        # Update the client_max_body_size to 50M
        echo "Updating client_max_body_size to 50M..."
        sed -i 's/client_max_body_size [0-9]*[kKmMgG]\?;/client_max_body_size 50M;/g' "\$NGINX_CONF"
      else
        echo "client_max_body_size is not set in main configuration."
        echo "Adding client_max_body_size 50M to http block..."
        
        # Add client_max_body_size to the http block
        sed -i '/http {/a \    client_max_body_size 50M;' "\$NGINX_CONF"
      fi
      
      # Check if the directive was added
      if grep -q "client_max_body_size" "\$NGINX_CONF"; then
        echo "client_max_body_size directive added/updated successfully in main configuration."
      else
        echo "Failed to add client_max_body_size directive to main configuration."
        echo "Please add the following line inside the http block in \$NGINX_CONF:"
        echo "    client_max_body_size 50M;"
        exit 1
      fi
    else
      echo "Could not find main Nginx configuration file. Please check your Nginx installation."
      exit 1
    fi
  fi

  # Test Nginx configuration
  echo "Testing Nginx configuration..."
  nginx -t
  
  # Reload Nginx if configuration test passes
  if [ \$? -eq 0 ]; then
    echo "Nginx configuration test passed. Reloading Nginx..."
    systemctl reload nginx
    echo "Nginx reloaded successfully."
  else
    echo "Nginx configuration test failed. Please check your Nginx configuration."
    exit 1
  fi

  echo "HTTPS upload size limit fix completed on VPS!"
EOF

echo "Fix for HTTPS upload size limit completed!"
echo "Your VPS should now allow uploading larger audio files (up to 50MB) over HTTPS."
echo "Try uploading audio files through the admin panel again."
