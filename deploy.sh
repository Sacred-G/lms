#!/bin/bash

# Exit on error
set -e

echo "Starting deployment of LMS application..."

# Update system packages
echo "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install required dependencies
echo "Installing dependencies..."
apt-get install -y git nginx curl

# Install Node.js 18.x
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 globally
echo "Installing PM2..."
npm install -g pm2

# Create app directory
echo "Creating application directory..."
mkdir -p /var/www/lms
cd /var/www/lms

# Clone the repository
echo "Cloning repository..."
git clone https://github.com/Sacred-G/lms.git .

# Create .env file
echo "Setting up environment variables..."
cat > .env << EOL
PORT=3001
MONGODB_URI=mongodb+srv://sbouldin:Bboul6256@lms.bign9.mongodb.net/?retryWrites=true&w=majority&appName=LMS
JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMTIyMDY0NSwiaWF0IjoxNzExMjIwNjQ1fQ.gJZMXVCMVL-ha8-2ftpCJKsP_nP9o6ZNGDvSBT3HYcM
NODE_ENV=production
EOL

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Build backend
echo "Building backend..."
npm run build

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd client
npm install

# Build frontend
echo "Building frontend..."
npm run build

# Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/lms << EOL
server {
    listen 80;
    server_name _;

    # Root directory for React build
    root /var/www/lms/client/build;
    index index.html;

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
EOL

# Enable the site
ln -sf /etc/nginx/sites-available/lms /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

# Set up PM2 to run the backend
echo "Setting up PM2 for backend..."
cd /var/www/lms
pm2 start dist/index.js --name "lms-backend"
pm2 save
pm2 startup

echo "Deployment completed successfully!"
echo "Your application should now be running at http://your-server-ip"
echo "To check the status of your backend, run: pm2 status"
