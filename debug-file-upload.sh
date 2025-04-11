#!/bin/bash
# This script debugs the file upload process on the VPS

# VPS SSH details
VPS_SSH="root@147.93.41.71"
VPS_APP_PATH="/home/lms"

echo "Starting file upload debugging on VPS..."

# SSH into VPS to debug the file upload process
ssh ${VPS_SSH} << 'EOF'
  echo "=== STEP 1: Checking file paths and permissions ==="
  
  # Check the uploads directory
  UPLOADS_DIR="/home/lms/uploads"
  echo "Checking uploads directory: $UPLOADS_DIR"
  if [ -d "$UPLOADS_DIR" ]; then
    echo "Uploads directory exists."
    ls -la "$UPLOADS_DIR"
  else
    echo "Uploads directory does not exist. Creating it..."
    mkdir -p "$UPLOADS_DIR"
    chmod -R 777 "$UPLOADS_DIR"  # Very permissive for testing
    echo "Created uploads directory with full permissions."
  fi
  
  # Check the audio directory
  AUDIO_DIR="/home/lms/client/public/audio"
  echo "Checking audio directory: $AUDIO_DIR"
  if [ -d "$AUDIO_DIR" ]; then
    echo "Audio directory exists."
    ls -la "$AUDIO_DIR"
    echo "Audio files in directory:"
    find "$AUDIO_DIR" -type f -name "*.wav" -o -name "*.mp3" -o -name "*.ogg" | sort
  else
    echo "Audio directory does not exist. Creating it..."
    mkdir -p "$AUDIO_DIR"
    chmod -R 777 "$AUDIO_DIR"  # Very permissive for testing
    echo "Created audio directory with full permissions."
  fi
  
  # Check the build directory where static files are served from
  BUILD_AUDIO_DIR="/home/lms/client/build/audio"
  echo "Checking build audio directory: $BUILD_AUDIO_DIR"
  if [ -d "$BUILD_AUDIO_DIR" ]; then
    echo "Build audio directory exists."
    ls -la "$BUILD_AUDIO_DIR"
    echo "Audio files in build directory:"
    find "$BUILD_AUDIO_DIR" -type f -name "*.wav" -o -name "*.mp3" -o -name "*.ogg" | sort
  else
    echo "Build audio directory does not exist. This could be an issue if files are served from the build directory."
    echo "Creating it for testing..."
    mkdir -p "$BUILD_AUDIO_DIR"
    chmod -R 777 "$BUILD_AUDIO_DIR"
    echo "Created build audio directory with full permissions."
  fi
  
  echo "=== STEP 2: Testing file copy process ==="
  
  # Create a test file
  echo "Creating a test audio file..."
  TEST_FILE="$UPLOADS_DIR/test-audio-file.wav"
  dd if=/dev/urandom of="$TEST_FILE" bs=1M count=1
  echo "Created test file: $TEST_FILE"
  
  # Try to copy the test file to the audio directory
  echo "Copying test file to audio directory..."
  cp "$TEST_FILE" "$AUDIO_DIR/test-audio-file.wav"
  if [ $? -eq 0 ]; then
    echo "Successfully copied test file to audio directory."
    ls -la "$AUDIO_DIR/test-audio-file.wav"
  else
    echo "Failed to copy test file to audio directory."
  fi
  
  # Try to copy the test file to the build audio directory
  echo "Copying test file to build audio directory..."
  cp "$TEST_FILE" "$BUILD_AUDIO_DIR/test-audio-file.wav"
  if [ $? -eq 0 ]; then
    echo "Successfully copied test file to build audio directory."
    ls -la "$BUILD_AUDIO_DIR/test-audio-file.wav"
  else
    echo "Failed to copy test file to build audio directory."
  fi
  
  echo "=== STEP 3: Checking web server configuration ==="
  
  # Check if the audio files are being served correctly
  echo "Checking NGINX configuration for static file serving..."
  grep -r "location.*audio" /etc/nginx/
  
  # Check if there are any CORS issues
  echo "Checking NGINX configuration for CORS headers..."
  grep -r "Access-Control-Allow-Origin" /etc/nginx/
  
  echo "=== STEP 4: Checking application logs ==="
  
  # Check PM2 logs for any errors related to file uploads
  echo "Checking PM2 logs for file upload errors..."
  pm2 logs --lines 100 | grep -i "upload\|file\|audio\|error\|fail" || echo "No relevant errors found in PM2 logs."
  
  echo "=== STEP 5: Testing file access via HTTP ==="
  
  # Test if the test file is accessible via HTTP
  echo "Testing HTTP access to the test audio file..."
  DOMAIN=$(grep -r "server_name" /etc/nginx/sites-available/ | head -1 | awk '{print $2}' | tr -d ';')
  if [ -n "$DOMAIN" ]; then
    echo "Domain: $DOMAIN"
    echo "Testing with curl:"
    curl -I "https://$DOMAIN/audio/test-audio-file.wav" || echo "Failed to access test file via HTTPS."
  else
    echo "Could not determine domain name from NGINX configuration."
  fi
  
  echo "=== STEP 6: Checking for build process issues ==="
  
  # Check if there's a build process that might be overwriting files
  echo "Checking for build scripts that might affect audio files..."
  grep -r "audio" /home/lms/client/package.json
  
  echo "=== STEP 7: Fixing permissions and ownership ==="
  
  # Set very permissive permissions for testing
  echo "Setting permissive permissions on all relevant directories..."
  chmod -R 777 "$UPLOADS_DIR"
  chmod -R 777 "$AUDIO_DIR"
  chmod -R 777 "$BUILD_AUDIO_DIR"
  
  # Set ownership to the web server user
  echo "Setting ownership to www-data..."
  chown -R www-data:www-data "$UPLOADS_DIR"
  chown -R www-data:www-data "$AUDIO_DIR"
  chown -R www-data:www-data "$BUILD_AUDIO_DIR"
  
  echo "=== STEP 8: Checking for symbolic links ==="
  
  # Check if there are any symbolic links that might be causing issues
  echo "Checking for symbolic links..."
  find /home/lms/client -type l -ls
  
  echo "=== STEP 9: Checking disk space ==="
  
  # Check if there's enough disk space
  echo "Checking disk space..."
  df -h
  
  echo "=== Debugging completed! ==="
  echo "Please review the output above for any issues."
EOF

echo "File upload debugging completed!"
echo "Please review the output above to identify any issues with the file upload process."
