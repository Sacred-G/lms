#!/bin/bash

# This script will update your Nginx configuration to use /home/lms/client/build as the root directory

# Get the VPS IP address
read -p "Enter your VPS IP address: " VPS_IP

# Get the VPS username
read -p "Enter your VPS username (default: root): " VPS_USER
VPS_USER=${VPS_USER:-root}

echo "Updating Nginx configuration on ${VPS_USER}@${VPS_IP} to use /home/lms/client/build..."

# Check if the new directory exists
echo "Checking if /home/lms/client/build exists..."
NEW_PATH_EXISTS=$(ssh ${VPS_USER}@${VPS_IP} "[ -d /home/lms/client/build ] && echo 'yes' || echo 'no'")

if [ "$NEW_PATH_EXISTS" = "no" ]; then
    echo "The directory /home/lms/client/build does not exist."
    
    # Check if the old directory exists
    echo "Checking if /var/www/lms/client/build exists..."
    OLD_PATH_EXISTS=$(ssh ${VPS_USER}@${VPS_IP} "[ -d /var/www/lms/client/build ] && echo 'yes' || echo 'no'")
    
    if [ "$OLD_PATH_EXISTS" = "yes" ]; then
        echo "The old directory /var/www/lms/client/build exists."
        read -p "Do you want to create the new directory and copy files from the old location? (y/n): " COPY_FILES
        
        if [ "$COPY_FILES" = "y" ]; then
            echo "Creating directory structure for /home/lms/client/build..."
            ssh ${VPS_USER}@${VPS_IP} "mkdir -p /home/lms/client/build"
            
            echo "Copying files from /var/www/lms/client/build to /home/lms/client/build..."
            ssh ${VPS_USER}@${VPS_IP} "cp -r /var/www/lms/client/build/* /home/lms/client/build/"
            
            echo "Files copied successfully."
        else
            echo "Creating empty directory structure for /home/lms/client/build..."
            ssh ${VPS_USER}@${VPS_IP} "mkdir -p /home/lms/client/build"
        fi
    else
        echo "Neither the old nor the new directory exists. Creating empty directory structure..."
        ssh ${VPS_USER}@${VPS_IP} "mkdir -p /home/lms/client/build"
    fi
else
    echo "The directory /home/lms/client/build already exists."
fi

# Create updated Nginx configuration
echo "Creating updated Nginx configuration..."
ssh ${VPS_USER}@${VPS_IP} "cat > /etc/nginx/sites-available/lms << 'EOL'
server {
    listen 80;
    server_name _;

    # Root directory for React frontend
    root /home/lms/client/build;
    index index.html;

    # Add headers to allow iframe embedding
    add_header X-Frame-Options \"ALLOWALL\";
    add_header Content-Security-Policy \"frame-ancestors *;\";

    # Handle React routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Proxy API requests to the backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL"

# Test Nginx configuration
echo "Testing Nginx configuration..."
ssh ${VPS_USER}@${VPS_IP} "nginx -t"
if [ $? -ne 0 ]; then
    echo "Nginx configuration test failed. Please check the configuration manually."
    exit 1
fi

# Restart Nginx
echo "Restarting Nginx..."
ssh ${VPS_USER}@${VPS_IP} "systemctl restart nginx"

echo "Nginx configuration has been updated successfully!"

# Check if the backend is running
echo "Checking if the backend is running on port 3001..."
BACKEND_RUNNING=$(ssh ${VPS_USER}@${VPS_IP} "netstat -tulpn | grep :3001" || echo "")

if [ -z "$BACKEND_RUNNING" ]; then
    echo "The backend is not running on port 3001."
    
    # Check if PM2 is installed
    PM2_INSTALLED=$(ssh ${VPS_USER}@${VPS_IP} "command -v pm2 > /dev/null && echo 'yes' || echo 'no'")
    
    if [ "$PM2_INSTALLED" = "no" ]; then
        echo "PM2 is not installed."
        read -p "Do you want to install PM2? (y/n): " INSTALL_PM2
        
        if [ "$INSTALL_PM2" = "y" ]; then
            echo "Installing PM2..."
            ssh ${VPS_USER}@${VPS_IP} "npm install -g pm2"
        else
            echo "PM2 is required to manage the backend service. Please install it manually."
            exit 1
        fi
    fi
    
    # Check if the backend directory exists
    echo "Checking if /home/lms/dist/src/index.js exists..."
    BACKEND_EXISTS=$(ssh ${VPS_USER}@${VPS_IP} "[ -f /home/lms/dist/src/index.js ] && echo 'yes' || echo 'no'")
    
    if [ "$BACKEND_EXISTS" = "no" ]; then
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
            else
                echo "Please make sure the backend files are in the correct location before continuing."
                exit 1
            fi
        else
            echo "Backend not found in either location. Please make sure the backend is properly deployed."
            exit 1
        fi
    fi
    
    # Start the backend with PM2
    echo "Starting the backend with PM2..."
    ssh ${VPS_USER}@${VPS_IP} "cd /home/lms && pm2 start dist/src/index.js --name \"lms-backend\""
    
    # Save the PM2 configuration
    echo "Saving the PM2 configuration..."
    ssh ${VPS_USER}@${VPS_IP} "pm2 save"
    
    # Check if the backend is now running
    echo "Checking if the backend is now running on port 3001..."
    BACKEND_RUNNING=$(ssh ${VPS_USER}@${VPS_IP} "netstat -tulpn | grep :3001" || echo "")
    
    if [ -z "$BACKEND_RUNNING" ]; then
        echo "Failed to start the backend. Please check the logs on your VPS."
        echo "You can view the logs with: pm2 logs lms-backend"
    else
        echo "Backend is now running on port 3001."
    fi
else
    echo "The backend is already running on port 3001."
fi

echo "Your application should now be accessible using the /home/lms/client/build directory."
