#!/bin/bash
# This script fixes the Nginx upload size limit on the VPS
# For Windows users: Run this script using Git Bash or WSL

# VPS SSH details
VPS_SSH="root@147.93.41.71"
VPS_APP_PATH="/home/lms"

echo "Starting fix for Nginx upload size limit on VPS..."

# SSH into VPS to check and fix the Nginx configuration
echo "Checking and fixing Nginx configuration on VPS..."
ssh ${VPS_SSH} << 'EOF'
  # Check if Nginx is installed
  if ! command -v nginx &> /dev/null; then
    echo "Nginx is not installed. Please install Nginx first."
    exit 1
  fi

  # Find the Nginx configuration file
  NGINX_CONF_PATH=$(nginx -t 2>&1 | grep "configuration file" | awk '{print $4}' | tr -d ":")
  if [ -z "$NGINX_CONF_PATH" ]; then
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

  echo "Found Nginx configuration file at: $NGINX_CONF_PATH"

  # Check if client_max_body_size is already set in the http block
  if grep -q "client_max_body_size" "$NGINX_CONF_PATH"; then
    echo "client_max_body_size is already set in Nginx configuration."
    echo "Current setting:"
    grep "client_max_body_size" "$NGINX_CONF_PATH"
    
    # Update the client_max_body_size to 50M
    echo "Updating client_max_body_size to 50M..."
    sed -i 's/client_max_body_size [0-9]*[kKmMgG]\?;/client_max_body_size 50M;/g' "$NGINX_CONF_PATH"
  else
    echo "client_max_body_size is not set in Nginx configuration."
    echo "Adding client_max_body_size 50M to http block..."
    
    # Add client_max_body_size to the http block
    sed -i '/http {/a \    client_max_body_size 50M;' "$NGINX_CONF_PATH"
  fi

  # Check if there are site-specific configurations
  SITE_CONF_DIR="/etc/nginx/sites-available"
  if [ -d "$SITE_CONF_DIR" ]; then
    echo "Checking site-specific configurations..."
    
    # Find the configuration file for the LMS site
    LMS_CONF=$(grep -l "server_name" $SITE_CONF_DIR/* 2>/dev/null | xargs grep -l "root.*lms" 2>/dev/null || echo "")
    
    if [ -n "$LMS_CONF" ]; then
      echo "Found LMS site configuration at: $LMS_CONF"
      
      # Check if client_max_body_size is already set in the server block
      if grep -q "client_max_body_size" "$LMS_CONF"; then
        echo "client_max_body_size is already set in site configuration."
        echo "Current setting:"
        grep "client_max_body_size" "$LMS_CONF"
        
        # Update the client_max_body_size to 50M
        echo "Updating client_max_body_size to 50M in site configuration..."
        sed -i 's/client_max_body_size [0-9]*[kKmMgG]\?;/client_max_body_size 50M;/g' "$LMS_CONF"
      else
        echo "client_max_body_size is not set in site configuration."
        echo "Adding client_max_body_size 50M to server block..."
        
        # Add client_max_body_size to the server block
        sed -i '/server {/a \    client_max_body_size 50M;' "$LMS_CONF"
      fi
    else
      echo "Could not find LMS site configuration. Skipping site-specific configuration."
    fi
  fi

  # Test Nginx configuration
  echo "Testing Nginx configuration..."
  nginx -t
  
  # Reload Nginx if configuration test passes
  if [ $? -eq 0 ]; then
    echo "Nginx configuration test passed. Reloading Nginx..."
    systemctl reload nginx
    echo "Nginx reloaded successfully."
  else
    echo "Nginx configuration test failed. Please check your Nginx configuration."
    exit 1
  fi

  echo "Nginx upload size limit fix completed on VPS!"
EOF

echo "Fix for Nginx upload size limit completed!"
echo "Your VPS should now allow uploading larger audio files (up to 50MB)."
