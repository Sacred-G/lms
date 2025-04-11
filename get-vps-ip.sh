#!/bin/bash
# This script gets the VPS IP address for MongoDB Atlas whitelist

# VPS SSH details
VPS_SSH="root@147.93.41.71"

echo "Getting VPS IP address for MongoDB Atlas whitelist..."

# SSH into VPS to get IP address information
ssh ${VPS_SSH} << 'EOF'
  echo "=== VPS IP Address Information ==="
  
  # Get public IP address using different methods
  echo "Public IP addresses (for MongoDB Atlas whitelist):"
  echo "Method 1: $(curl -s https://ipinfo.io/ip)"
  echo "Method 2: $(curl -s https://api.ipify.org)"
  echo "Method 3: $(curl -s https://icanhazip.com)"
  
  echo ""
  echo "=== MongoDB Connection Information ==="
  
  # Check MongoDB connection string in .env file
  ENV_FILE="/home/lms/.env"
  if [ -f "$ENV_FILE" ]; then
    echo "MongoDB connection string from .env file:"
    grep "MONGODB_URI" "$ENV_FILE" || echo "MONGODB_URI not found in .env file"
  else
    echo ".env file not found at $ENV_FILE"
  fi
  
  # Check for MongoDB connection errors in logs
  echo ""
  echo "Recent MongoDB connection errors from logs:"
  grep -r "MongoDB connection error" /root/.pm2/logs/ | tail -5
  
  echo ""
  echo "=== Instructions ==="
  echo "1. Go to your MongoDB Atlas dashboard: https://cloud.mongodb.com"
  echo "2. Select your cluster"
  echo "3. Click on 'Network Access' in the left sidebar"
  echo "4. Click 'Add IP Address'"
  echo "5. Add the VPS IP address shown above"
  echo "6. Click 'Confirm'"
  echo "7. Wait a few minutes for the changes to take effect"
  
  echo ""
  echo "After adding the IP to the whitelist, restart the backend with:"
  echo "pm2 restart all"
EOF

echo "VPS IP address information retrieved!"
echo "Please follow the instructions above to whitelist your VPS IP address in MongoDB Atlas."
