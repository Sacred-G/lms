#!/bin/bash
# This script fixes the path mismatch issue with audio files

# VPS SSH details
VPS_SSH="root@147.93.41.71"

echo "Starting audio path fix on VPS..."

# SSH into VPS to fix the audio path issue
ssh ${VPS_SSH} << 'EOF'
  echo "=== STEP 1: Identifying the correct paths ==="
  
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
  
  echo "=== STEP 2: Setting up a symbolic link ==="
  
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
  
  echo "=== STEP 3: Updating NGINX configuration ==="
  
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
  
  echo "=== STEP 4: Testing audio file access ==="
  
  # Create a test file in the dist directory
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
  
  echo "=== STEP 5: Fixing upload controller paths ==="
  
  # Check if the upload controller is using the correct paths
  UPLOAD_CONTROLLER="/home/lms/dist/src/controllers/upload.controller.js"
  
  if [ -f "$UPLOAD_CONTROLLER" ]; then
    echo "Checking upload controller paths..."
    
    # Create a backup
    cp "$UPLOAD_CONTROLLER" "$UPLOAD_CONTROLLER.bak"
    
    # Update the path in the upload controller if needed
    if grep -q "../../client/public/audio" "$UPLOAD_CONTROLLER"; then
      echo "Path in upload controller looks correct."
    else
      echo "Updating path in upload controller..."
      sed -i 's|path.join(__dirname, ".*audio")|path.join(__dirname, "../../client/public/audio")|g' "$UPLOAD_CONTROLLER"
    fi
  else
    echo "Upload controller not found at: $UPLOAD_CONTROLLER"
  fi
  
  echo "=== Audio path fix completed! ==="
  echo "Please try uploading and playing audio files again."
EOF

echo "Audio path fix completed!"
echo "Please try uploading and playing audio files again through the admin panel."
