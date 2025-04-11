#!/bin/bash
# This script fixes issues with audio files not being properly served on the VPS

# VPS SSH details
VPS_SSH="root@147.93.41.71"
VPS_APP_PATH="/home/lms"

echo "Starting audio file fix on VPS..."

# SSH into VPS to fix the audio file issues
ssh ${VPS_SSH} << 'EOF'
  echo "=== STEP 1: Ensuring audio directories exist with proper permissions ==="
  
  # Check and fix the audio directory in public
  PUBLIC_AUDIO_DIR="/home/lms/client/public/audio"
  echo "Setting up public audio directory: $PUBLIC_AUDIO_DIR"
  mkdir -p "$PUBLIC_AUDIO_DIR"
  chmod -R 755 "$PUBLIC_AUDIO_DIR"
  chown -R www-data:www-data "$PUBLIC_AUDIO_DIR"
  
  # Check and fix the audio directory in build
  BUILD_AUDIO_DIR="/home/lms/client/build/audio"
  echo "Setting up build audio directory: $BUILD_AUDIO_DIR"
  mkdir -p "$BUILD_AUDIO_DIR"
  chmod -R 755 "$BUILD_AUDIO_DIR"
  chown -R www-data:www-data "$BUILD_AUDIO_DIR"
  
  echo "=== STEP 2: Syncing audio files from public to build ==="
  
  # Copy all audio files from public to build
  echo "Copying audio files from public to build directory..."
  rsync -av "$PUBLIC_AUDIO_DIR/" "$BUILD_AUDIO_DIR/"
  
  echo "=== STEP 3: Updating NGINX configuration ==="
  
  # Create a backup of the NGINX configuration
  NGINX_CONF=$(find /etc/nginx/sites-available -type f -exec grep -l "server_name" {} \; | head -1)
  if [ -z "$NGINX_CONF" ]; then
    NGINX_CONF="/etc/nginx/sites-available/default"
  fi
  
  echo "Using NGINX configuration: $NGINX_CONF"
  cp "$NGINX_CONF" "$NGINX_CONF.bak"
  
  # Check if there's a location block for audio files
  if ! grep -q "location /audio/" "$NGINX_CONF"; then
    echo "Adding location block for audio files..."
    
    # Find the end of the server block
    SERVER_END=$(grep -n "}" "$NGINX_CONF" | tail -1 | cut -d: -f1)
    
    # Insert the location block before the end of the server block
    sed -i "${SERVER_END}i\\
    # Serve audio files with proper MIME types\\
    location /audio/ {\\
        alias /home/lms/client/build/audio/;\\
        types { audio/wav wav; audio/mpeg mp3; audio/ogg ogg; }\\
        add_header Cache-Control \"public, max-age=3600\";\\
        add_header Access-Control-Allow-Origin \"*\";\\
    }\\
" "$NGINX_CONF"
  else
    echo "Audio location block already exists. Updating it..."
    
    # Update the existing location block
    sed -i '/location \/audio\//,/}/c\\
    # Serve audio files with proper MIME types\\
    location /audio/ {\\
        alias /home/lms/client/build/audio/;\\
        types { audio/wav wav; audio/mpeg mp3; audio/ogg ogg; }\\
        add_header Cache-Control \"public, max-age=3600\";\\
        add_header Access-Control-Allow-Origin \"*\";\\
    }\\
' "$NGINX_CONF"
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
  
  echo "=== STEP 4: Creating a test audio file ==="
  
  # Create a test audio file
  TEST_FILE="$PUBLIC_AUDIO_DIR/test-audio-file.wav"
  echo "Creating test audio file: $TEST_FILE"
  dd if=/dev/urandom of="$TEST_FILE" bs=1M count=1
  
  # Copy to build directory
  cp "$TEST_FILE" "$BUILD_AUDIO_DIR/test-audio-file.wav"
  
  # Set permissions
  chmod 644 "$TEST_FILE"
  chmod 644 "$BUILD_AUDIO_DIR/test-audio-file.wav"
  
  echo "=== STEP 5: Setting up a build hook to copy audio files ==="
  
  # Create a script to copy audio files during build
  COPY_SCRIPT="/home/lms/copy-audio-files.sh"
  echo "Creating script to copy audio files during build: $COPY_SCRIPT"
  
  cat > "$COPY_SCRIPT" << 'SCRIPT'
#!/bin/bash
# This script copies audio files from public to build directory

PUBLIC_AUDIO_DIR="/home/lms/client/public/audio"
BUILD_AUDIO_DIR="/home/lms/client/build/audio"

# Create build audio directory if it doesn't exist
mkdir -p "$BUILD_AUDIO_DIR"

# Copy all audio files
rsync -av "$PUBLIC_AUDIO_DIR/" "$BUILD_AUDIO_DIR/"

# Set permissions
chmod -R 755 "$BUILD_AUDIO_DIR"
chown -R www-data:www-data "$BUILD_AUDIO_DIR"

echo "Audio files copied from public to build directory."
SCRIPT
  
  # Make the script executable
  chmod +x "$COPY_SCRIPT"
  
  # Add the script to the build process
  BUILD_SCRIPT="/home/lms/client/package.json"
  if [ -f "$BUILD_SCRIPT" ]; then
    echo "Checking if build script already has the hook..."
    
    if ! grep -q "copy-audio-files" "$BUILD_SCRIPT"; then
      echo "Adding hook to build script..."
      
      # Create a backup
      cp "$BUILD_SCRIPT" "$BUILD_SCRIPT.bak"
      
      # Add the hook to the build script
      sed -i 's/"build": "react-scripts build"/"build": "react-scripts build \&\& \/home\/lms\/copy-audio-files.sh"/g' "$BUILD_SCRIPT"
    else
      echo "Build script already has the hook."
    fi
  else
    echo "Build script not found: $BUILD_SCRIPT"
  fi
  
  echo "=== STEP 6: Testing audio file access ==="
  
  # Get the domain name
  DOMAIN=$(grep -r "server_name" /etc/nginx/sites-available/ | head -1 | awk '{print $2}' | tr -d ';')
  
  if [ -n "$DOMAIN" ]; then
    echo "Testing access to test audio file at https://$DOMAIN/audio/test-audio-file.wav"
    curl -I "https://$DOMAIN/audio/test-audio-file.wav"
  else
    echo "Could not determine domain name."
  fi
  
  echo "=== Audio file fix completed! ==="
  echo "Please try uploading and playing audio files again."
EOF

echo "Audio file fix completed!"
echo "Please try uploading and playing audio files again through the admin panel."
