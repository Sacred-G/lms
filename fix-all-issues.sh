#!/bin/bash
# This script fixes both the audio file path issue and MongoDB connection issue

# VPS SSH details
VPS_SSH="root@147.93.41.71"

echo "Starting comprehensive fix for VPS issues..."

# SSH into VPS to fix all issues
ssh ${VPS_SSH} << 'EOF'
  echo "=== PART 1: Fixing Audio File Paths ==="
  
  # The paths we've identified
  DIST_AUDIO_DIR="/home/lms/dist/client/public/audio"
  BUILD_AUDIO_DIR="/home/lms/client/build/audio"
  
  echo "Backend uploads to: $DIST_AUDIO_DIR"
  echo "NGINX likely serves from: $BUILD_AUDIO_DIR"
  
  # Check if both directories exist
  if [ -d "$DIST_AUDIO_DIR" ]; then
    echo "Dist audio directory exists."
    ls -la "$DIST_AUDIO_DIR"
  else
    echo "Dist audio directory does not exist. Creating it..."
    mkdir -p "$DIST_AUDIO_DIR"
    chmod -R 755 "$DIST_AUDIO_DIR"
    chown -R www-data:www-data "$DIST_AUDIO_DIR"
  fi
  
  if [ -d "$BUILD_AUDIO_DIR" ]; then
    echo "Build audio directory exists."
    ls -la "$BUILD_AUDIO_DIR"
  else
    echo "Build audio directory does not exist. Creating it..."
    mkdir -p "$BUILD_AUDIO_DIR"
    chmod -R 755 "$BUILD_AUDIO_DIR"
    chown -R www-data:www-data "$BUILD_AUDIO_DIR"
  fi
  
  # The best solution is to create a symbolic link so both paths point to the same files
  echo "Creating a symbolic link from build to dist directory..."
  
  # First, backup the build directory if it has files
  if [ "$(ls -A $BUILD_AUDIO_DIR)" ]; then
    echo "Backing up existing build audio directory..."
    mv "$BUILD_AUDIO_DIR" "${BUILD_AUDIO_DIR}_backup"
  else
    # Remove the empty directory
    rmdir "$BUILD_AUDIO_DIR"
  fi
  
  # Create the symbolic link
  ln -sf "$DIST_AUDIO_DIR" "$BUILD_AUDIO_DIR"
  echo "Symbolic link created: $BUILD_AUDIO_DIR -> $DIST_AUDIO_DIR"
  
  # Find the NGINX configuration file
  NGINX_CONF=$(find /etc/nginx/sites-available -type f -exec grep -l "server_name" {} \; | head -1)
  if [ -z "$NGINX_CONF" ]; then
    NGINX_CONF="/etc/nginx/sites-available/default"
  fi
  
  echo "Using NGINX configuration: $NGINX_CONF"
  cp "$NGINX_CONF" "$NGINX_CONF.bak"
  
  # Check if there's a location block for audio files
  if grep -q "location /audio/" "$NGINX_CONF"; then
    echo "Updating audio location block..."
    
    # Update the existing location block to point to the dist directory
    sed -i '/location \/audio\//,/}/c\\
    # Serve audio files with proper MIME types\\
    location /audio/ {\\
        alias /home/lms/dist/client/public/audio/;\\
        types { audio/wav wav; audio/mpeg mp3; audio/ogg ogg; }\\
        add_header Cache-Control \"public, max-age=3600\";\\
        add_header Access-Control-Allow-Origin \"*\";\\
    }\\
' "$NGINX_CONF"
  else
    echo "Adding audio location block..."
    
    # Find the end of the server block
    SERVER_END=$(grep -n "}" "$NGINX_CONF" | tail -1 | cut -d: -f1)
    
    # Insert the location block before the end of the server block
    sed -i "${SERVER_END}i\\
    # Serve audio files with proper MIME types\\
    location /audio/ {\\
        alias /home/lms/dist/client/public/audio/;\\
        types { audio/wav wav; audio/mpeg mp3; audio/ogg ogg; }\\
        add_header Cache-Control \"public, max-age=3600\";\\
        add_header Access-Control-Allow-Origin \"*\";\\
    }\\
" "$NGINX_CONF"
  fi
  
  # Test NGINX configuration
  echo "Testing NGINX configuration..."
  nginx -t
  
  if [ $? -eq 0 ]; then
    echo "NGINX configuration test passed. Reloading NGINX..."
    systemctl reload nginx
  else
    echo "NGINX configuration test failed. Restoring backup..."
    cp "$NGINX_CONF.bak" "$NGINX_CONF"
    nginx -t
    systemctl reload nginx
    echo "Backup restored."
  fi
  
  echo "=== PART 2: Fixing MongoDB Connection Issue ==="
  
  # Get public IP address using different methods
  echo "Public IP addresses (for MongoDB Atlas whitelist):"
  VPS_IP=$(curl -s https://ipinfo.io/ip)
  echo "VPS IP Address: $VPS_IP"
  
  # Check MongoDB connection string in .env file
  ENV_FILE="/home/lms/.env"
  if [ -f "$ENV_FILE" ]; then
    echo "MongoDB connection string from .env file:"
    grep "MONGODB_URI" "$ENV_FILE" || echo "MONGODB_URI not found in .env file"
  else
    echo ".env file not found at $ENV_FILE"
  fi
  
  # Check for MongoDB connection errors in logs
  echo "Recent MongoDB connection errors from logs:"
  grep -r "MongoDB connection error" /root/.pm2/logs/ | tail -3 || echo "No MongoDB connection errors found in logs."
  
  # Add the VPS IP to the MongoDB Atlas whitelist
  echo ""
  echo "=== MongoDB Atlas Whitelist Instructions ==="
  echo "1. Go to your MongoDB Atlas dashboard: https://cloud.mongodb.com"
  echo "2. Select your cluster"
  echo "3. Click on 'Network Access' in the left sidebar"
  echo "4. Click 'Add IP Address'"
  echo "5. Add the VPS IP address: $VPS_IP"
  echo "6. Click 'Confirm'"
  echo "7. Wait a few minutes for the changes to take effect"
  
  # Create a test audio file
  TEST_FILE="$DIST_AUDIO_DIR/test-audio-file.wav"
  echo "Creating test audio file: $TEST_FILE"
  dd if=/dev/urandom of="$TEST_FILE" bs=1M count=1
  chmod 644 "$TEST_FILE"
  chown www-data:www-data "$TEST_FILE"
  
  # Get the domain name
  DOMAIN=$(grep -r "server_name" /etc/nginx/sites-available/ | head -1 | awk '{print $2}' | tr -d ';')
  
  if [ -n "$DOMAIN" ]; then
    echo "Testing access to test audio file at https://$DOMAIN/audio/test-audio-file.wav"
    curl -I "https://$DOMAIN/audio/test-audio-file.wav"
  else
    echo "Could not determine domain name."
  fi
  
  echo "=== Comprehensive fix completed! ==="
  echo "Please follow the MongoDB Atlas whitelist instructions above."
  echo "After adding the IP to the whitelist, restart the backend with:"
  echo "pm2 restart all"
  echo ""
  echo "Then try uploading and playing audio files again."
EOF

echo "Comprehensive fix completed!"
echo "Please follow the MongoDB Atlas whitelist instructions displayed above."
echo "After adding the VPS IP to the whitelist, try uploading and playing audio files again."
