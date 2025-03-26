#!/bin/bash
# This script syncs your local LMS application to your VPS
# For Windows users: Run this script using Git Bash or WSL

# VPS SSH details
VPS_SSH="root@147.93.41.71"
VPS_APP_PATH="/home/lms"

echo "Starting sync to VPS process..."

# Ensure the script is run from the project root
if [ ! -f "package.json" ] || [ ! -d "client" ]; then
  echo "Error: This script must be run from the project root directory."
  exit 1
fi

# Sync files to VPS using rsync
echo "Syncing files to VPS..."
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude 'client/node_modules' \
  --exclude '.git' \
  --exclude 'client/build' \
  --exclude 'dist' \
  . ${VPS_SSH}:${VPS_APP_PATH}

echo "Files synced successfully!"

# SSH into VPS to install dependencies and restart services
echo "Installing dependencies and restarting services on VPS..."
ssh ${VPS_SSH} << 'EOF'
  cd /home/lms

  # Install backend dependencies
  echo "Installing backend dependencies..."
  npm install

  # Install frontend dependencies
  echo "Installing frontend dependencies..."
  cd client && npm install && cd ..

  # Build the application
  echo "Building the application..."
  npm run build
  cd client && npm run build && cd ..

  # Restart services
  echo "Restarting services..."
  if command -v pm2 &> /dev/null; then
    pm2 restart all
  elif [ -f "docker-compose.yml" ]; then
    docker-compose down && docker-compose up -d
  else
    echo "No process manager detected. Please restart your application manually."
    echo "Common restart commands:"
    echo "  - pm2: pm2 restart all"
    echo "  - docker-compose: docker-compose down && docker-compose up -d"
    echo "  - systemd: systemctl restart your-service-name"
  fi

  echo "VPS update completed!"
EOF

echo "Sync to VPS completed successfully!"
echo "Your local code has been synced to the VPS at ${VPS_APP_PATH}"
