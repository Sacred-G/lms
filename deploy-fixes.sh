#!/bin/bash
# This script deploys both fixes to the VPS:
# 1. NGINX upload size limit fix
# 2. Audio files listing fix

# VPS SSH details
VPS_SSH="root@147.93.41.71"
VPS_APP_PATH="/home/lms"
DOMAIN="vps.sbouldin.com"

echo "Starting deployment of fixes to VPS..."

# 1. First, copy the updated files to the VPS
echo "Copying updated files to VPS..."
scp src/controllers/upload.controller.ts ${VPS_SSH}:${VPS_APP_PATH}/src/controllers/
scp src/routes/upload.routes.ts ${VPS_SSH}:${VPS_APP_PATH}/src/routes/
scp client/src/services/uploadService.ts ${VPS_SSH}:${VPS_APP_PATH}/client/src/services/

# 2. SSH into VPS to apply the NGINX fix and rebuild the application
echo "Connecting to VPS to apply fixes..."
ssh ${VPS_SSH} << EOF
  cd ${VPS_APP_PATH}
  
  echo "Applying NGINX upload size limit fix..."
  
  # Find all Nginx configuration files
  NGINX_CONF_FILES=\$(find /etc/nginx -type f -name "*.conf" 2>/dev/null)
  NGINX_SITE_FILES=\$(find /etc/nginx/sites-available -type f 2>/dev/null)
  NGINX_ENABLED_FILES=\$(find /etc/nginx/sites-enabled -type f 2>/dev/null)
  
  # Combine all unique files
  ALL_NGINX_FILES=\$(echo "\$NGINX_CONF_FILES \$NGINX_SITE_FILES \$NGINX_ENABLED_FILES" | tr ' ' '\n' | sort | uniq)
  
  # Create backups of all files
  for FILE in \$ALL_NGINX_FILES; do
    if [ -f "\$FILE" ]; then
      cp "\$FILE" "\${FILE}.bak"
      echo "Backed up \$FILE"
    fi
  done
  
  # Add client_max_body_size to http block in main nginx.conf
  MAIN_CONF="/etc/nginx/nginx.conf"
  if [ -f "\$MAIN_CONF" ]; then
    echo "Checking main Nginx configuration at \$MAIN_CONF..."
    
    # Check if client_max_body_size is already set in the http block
    if grep -q "client_max_body_size" "\$MAIN_CONF"; then
      echo "client_max_body_size is already set in main configuration."
      echo "Current setting:"
      grep "client_max_body_size" "\$MAIN_CONF"
      
      # Update the client_max_body_size to 100M
      echo "Updating client_max_body_size to 100M in main configuration..."
      sed -i 's/client_max_body_size [0-9]*[kKmMgG]\?;/client_max_body_size 100M;/g' "\$MAIN_CONF"
    else
      echo "client_max_body_size is not set in main configuration."
      echo "Adding client_max_body_size 100M to http block..."
      
      # Add client_max_body_size to the http block
      sed -i '/http {/a \    client_max_body_size 100M;' "\$MAIN_CONF"
    fi
  fi
  
  # Process all server blocks in all configuration files
  for FILE in \$ALL_NGINX_FILES; do
    if [ -f "\$FILE" ]; then
      echo "Processing \$FILE..."
      
      # Check if this file contains server blocks
      if grep -q "server {" "\$FILE"; then
        echo "Found server blocks in \$FILE"
        
        # Check if client_max_body_size is already set in any server block
        if grep -q "client_max_body_size" "\$FILE"; then
          echo "client_max_body_size is already set in \$FILE."
          echo "Current settings:"
          grep "client_max_body_size" "\$FILE"
          
          # Update all client_max_body_size directives to 100M
          echo "Updating all client_max_body_size directives to 100M..."
          sed -i 's/client_max_body_size [0-9]*[kKmMgG]\?;/client_max_body_size 100M;/g' "\$FILE"
        else
          echo "client_max_body_size is not set in \$FILE."
          echo "Adding client_max_body_size 100M to all server blocks..."
          
          # Add client_max_body_size to all server blocks
          # This is a bit tricky with sed, so we'll use a temporary file
          cp "\$FILE" "\$FILE.tmp"
          awk '/server {/ {print; print "    client_max_body_size 100M;"; next} {print}' "\$FILE.tmp" > "\$FILE"
          rm "\$FILE.tmp"
        fi
      fi
    fi
  done
  
  # Test Nginx configuration
  echo "Testing Nginx configuration..."
  nginx -t
  
  # Reload Nginx if configuration test passes
  if [ \$? -eq 0 ]; then
    echo "Nginx configuration test passed. Reloading Nginx..."
    systemctl reload nginx
    echo "Nginx reloaded successfully."
  else
    echo "Nginx configuration test failed. Restoring backups..."
    
    # Restore backups if the test fails
    for FILE in \$ALL_NGINX_FILES; do
      if [ -f "\${FILE}.bak" ]; then
        cp "\${FILE}.bak" "\$FILE"
        echo "Restored \$FILE from backup"
      fi
    done
    
    # Test again after restoration
    echo "Testing Nginx configuration after restoration..."
    nginx -t
    
    if [ \$? -eq 0 ]; then
      echo "Nginx configuration test passed after restoration. Reloading Nginx..."
      systemctl reload nginx
      echo "Nginx reloaded successfully."
    else
      echo "Nginx configuration test still failing. Manual intervention required."
      exit 1
    fi
  fi
  
  echo "Rebuilding the application with the new code changes..."
  
  # Install any new dependencies if needed
  npm install
  
  # Build the backend
  npm run build
  
  # Build the frontend
  cd client
  npm install
  npm run build
  cd ..
  
  # Restart the backend service
  echo "Restarting the backend service..."
  pm2 restart all
  
  echo "All fixes have been applied successfully!"
EOF

echo "Deployment of fixes completed!"
echo "Your VPS should now:"
echo "1. Allow uploading larger audio files (up to 100MB) over HTTPS"
echo "2. Show all available audio files in the dropdown menu"
echo "Try uploading audio files through the admin panel again."
