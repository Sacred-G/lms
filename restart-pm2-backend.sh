#!/bin/bash

# This script will restart the backend service with PM2 on your VPS

# VPS IP address
VPS_IP="147.93.41.71"

# Get the VPS username
read -p "Enter your VPS username (default: root): " VPS_USER
VPS_USER=${VPS_USER:-root}

echo "Connecting to ${VPS_USER}@${VPS_IP} to restart the backend service..."

# Check if PM2 is installed
echo "Checking if PM2 is installed..."
PM2_INSTALLED=$(ssh ${VPS_USER}@${VPS_IP} "command -v pm2 > /dev/null && echo 'yes' || echo 'no'")

if [ "$PM2_INSTALLED" = "no" ]; then
    echo "PM2 is not installed. Installing PM2..."
    ssh ${VPS_USER}@${VPS_IP} "npm install -g pm2"
fi

# Check if the backend is already managed by PM2
echo "Checking if the backend is managed by PM2..."
PM2_BACKEND=$(ssh ${VPS_USER}@${VPS_IP} "pm2 list | grep lms-backend" || echo "")

if [ -n "$PM2_BACKEND" ]; then
    echo "The backend is managed by PM2. Restarting it..."
    ssh ${VPS_USER}@${VPS_IP} "pm2 restart lms-backend"
else
    echo "The backend is not managed by PM2. Starting it..."
    
    # Check if the backend directory exists
    echo "Checking if /home/lms/dist/src/index.js exists..."
    BACKEND_EXISTS=$(ssh ${VPS_USER}@${VPS_IP} "[ -f /home/lms/dist/src/index.js ] && echo 'yes' || echo 'no'")
    
    if [ "$BACKEND_EXISTS" = "yes" ]; then
        echo "Starting the backend with PM2..."
        ssh ${VPS_USER}@${VPS_IP} "cd /home/lms && pm2 start dist/src/index.js --name \"lms-backend\""
    else
        echo "Backend file not found at /home/lms/dist/src/index.js."
        
        # Check if the backend exists in the old location
        echo "Checking if /var/www/lms/dist/src/index.js exists..."
        OLD_BACKEND_EXISTS=$(ssh ${VPS_USER}@${VPS_IP} "[ -f /var/www/lms/dist/src/index.js ] && echo 'yes' || echo 'no'")
        
        if [ "$OLD_BACKEND_EXISTS" = "yes" ]; then
            echo "Backend found at /var/www/lms/dist/src/index.js."
            read -p "Do you want to copy the backend files from /var/www/lms to /home/lms? (y/n): " COPY_BACKEND
            
            if [ "$COPY_BACKEND" = "y" ]; then
                echo "Creating directory structure for /home/lms/dist..."
                ssh ${VPS_USER}@${VPS_IP} "mkdir -p /home/lms/dist"
                
                echo "Copying backend files from /var/www/lms/dist to /home/lms/dist..."
                ssh ${VPS_USER}@${VPS_IP} "cp -r /var/www/lms/dist/* /home/lms/dist/"
                
                echo "Backend files copied successfully."
                
                echo "Starting the backend with PM2..."
                ssh ${VPS_USER}@${VPS_IP} "cd /home/lms && pm2 start dist/src/index.js --name \"lms-backend\""
            else
                echo "Please make sure the backend files are in the correct location before continuing."
                exit 1
            fi
        else
            echo "Backend not found in either location. Please make sure the backend is properly deployed."
            exit 1
        fi
    fi
fi

# Save the PM2 configuration
echo "Saving the PM2 configuration..."
ssh ${VPS_USER}@${VPS_IP} "pm2 save"

# Check if the backend is running on port 3001
echo "Checking if the backend is running on port 3001..."
BACKEND_RUNNING=$(ssh ${VPS_USER}@${VPS_IP} "netstat -tulpn | grep :3001" || echo "")

if [ -z "$BACKEND_RUNNING" ]; then
    echo "WARNING: The backend does not appear to be running on port 3001."
    echo "Please check the PM2 logs for errors: ssh ${VPS_USER}@${VPS_IP} 'pm2 logs lms-backend'"
else
    echo "The backend is running on port 3001."
    echo "Your application should now be accessible at http://${VPS_IP}"
fi
