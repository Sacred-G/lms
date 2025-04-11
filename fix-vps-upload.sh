#!/bin/bash
# This script directly fixes the upload issue on the VPS

# VPS SSH details
VPS_SSH="root@147.93.41.71"

echo "Starting direct fix for upload issues on VPS..."

# SSH into VPS to apply the fix
ssh ${VPS_SSH} << 'EOF'
  echo "=== STEP 1: Adding client_max_body_size to ALL Nginx configurations ==="
  
  # Find the main nginx.conf file
  MAIN_CONF="/etc/nginx/nginx.conf"
  echo "Modifying main Nginx configuration at $MAIN_CONF..."
  
  # Create a backup
  cp "$MAIN_CONF" "$MAIN_CONF.bak"
  
  # Check if client_max_body_size is already in the http block
  if grep -q "client_max_body_size" "$MAIN_CONF"; then
    # Update existing directive
    sed -i 's/client_max_body_size [0-9]*[kKmMgG]\?;/client_max_body_size 100M;/g' "$MAIN_CONF"
    echo "Updated existing client_max_body_size directive in $MAIN_CONF"
  else
    # Add the directive to the http block
    sed -i '/http {/a \    client_max_body_size 100M;' "$MAIN_CONF"
    echo "Added client_max_body_size directive to http block in $MAIN_CONF"
  fi
  
  # Find all site configuration files
  echo "Checking all site configuration files..."
  SITE_CONFS=$(find /etc/nginx/sites-available /etc/nginx/sites-enabled -type f 2>/dev/null)
  
  for CONF in $SITE_CONFS; do
    echo "Processing $CONF..."
    
    # Create a backup
    cp "$CONF" "$CONF.bak"
    
    # Check if this file contains server blocks
    if grep -q "server {" "$CONF"; then
      echo "Found server blocks in $CONF"
      
      # Check if client_max_body_size is already set
      if grep -q "client_max_body_size" "$CONF"; then
        # Update existing directive
        sed -i 's/client_max_body_size [0-9]*[kKmMgG]\?;/client_max_body_size 100M;/g' "$CONF"
        echo "Updated existing client_max_body_size directive in $CONF"
      else
        # Add the directive to each server block
        sed -i '/server {/a \    client_max_body_size 100M;' "$CONF"
        echo "Added client_max_body_size directive to server blocks in $CONF"
      fi
    fi
  done
  
  echo "=== STEP 2: Setting up proxy parameters for large file uploads ==="
  
  # Find all files with proxy_pass directives
  PROXY_CONFS=$(grep -l "proxy_pass" /etc/nginx/sites-available/* /etc/nginx/sites-enabled/* 2>/dev/null)
  
  for CONF in $PROXY_CONFS; do
    echo "Processing proxy configuration in $CONF..."
    
    # Add proxy parameters for large file uploads if they don't exist
    if ! grep -q "proxy_request_buffering" "$CONF"; then
      sed -i '/proxy_pass/a \    proxy_request_buffering off;' "$CONF"
      echo "Added proxy_request_buffering off to $CONF"
    fi
    
    if ! grep -q "proxy_max_temp_file_size" "$CONF"; then
      sed -i '/proxy_pass/a \    proxy_max_temp_file_size 0;' "$CONF"
      echo "Added proxy_max_temp_file_size 0 to $CONF"
    fi
  done
  
  echo "=== STEP 3: Checking and fixing directory permissions ==="
  
  # Check uploads directory
  UPLOADS_DIR="/home/lms/uploads"
  if [ ! -d "$UPLOADS_DIR" ]; then
    echo "Creating uploads directory..."
    mkdir -p "$UPLOADS_DIR"
  fi
  
  echo "Setting permissions on uploads directory..."
  chmod -R 755 "$UPLOADS_DIR"
  chown -R www-data:www-data "$UPLOADS_DIR"
  
  # Check audio directory
  AUDIO_DIR="/home/lms/client/public/audio"
  if [ ! -d "$AUDIO_DIR" ]; then
    echo "Creating audio directory..."
    mkdir -p "$AUDIO_DIR"
  fi
  
  echo "Setting permissions on audio directory..."
  chmod -R 755 "$AUDIO_DIR"
  chown -R www-data:www-data "$AUDIO_DIR"
  
  echo "=== STEP 4: Testing and reloading Nginx ==="
  
  # Test Nginx configuration
  echo "Testing Nginx configuration..."
  nginx -t
  
  if [ $? -eq 0 ]; then
    echo "Nginx configuration test passed. Reloading Nginx..."
    systemctl reload nginx
    echo "Nginx reloaded successfully."
  else
    echo "Nginx configuration test failed. Restoring backups..."
    
    # Restore main config backup
    cp "$MAIN_CONF.bak" "$MAIN_CONF"
    
    # Restore site config backups
    for CONF in $SITE_CONFS; do
      if [ -f "$CONF.bak" ]; then
        cp "$CONF.bak" "$CONF"
      fi
    done
    
    echo "Backups restored. Please check Nginx configuration manually."
    exit 1
  fi
  
  echo "=== STEP 5: Debugging information ==="
  
  echo "Current Nginx version:"
  nginx -v
  
  echo "Current client_max_body_size settings:"
  grep -r "client_max_body_size" /etc/nginx/
  
  echo "Current proxy settings:"
  grep -r "proxy_request_buffering\|proxy_max_temp_file_size" /etc/nginx/
  
  echo "Directory permissions:"
  ls -la "$UPLOADS_DIR"
  ls -la "$AUDIO_DIR"
  
  echo "=== Fix completed successfully! ==="
  echo "Please try uploading audio files again through the admin panel."
EOF

echo "Direct fix for VPS upload issues completed!"
echo "Please try uploading audio files again through the admin panel."
