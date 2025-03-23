#!/bin/bash

# Exit on error
set -e

echo "Starting VPS deployment process..."

# Install dependencies and build backend
echo "Building backend..."
npm install
npm run build

# Install dependencies and build frontend
echo "Building frontend..."
cd client
npm install
npm run build
cd ..

# Configure Nginx
echo "Configuring Nginx..."
cat > nginx.conf << 'EOL'
server {
    listen 80;
    server_name _;

    # Root directory for React build
    root /var/www/lms/client/build;
    index index.html;

    # Handle React routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to the backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

echo "Deployment files prepared successfully!"
echo ""
echo "To complete deployment on your VPS:"
echo "1. Copy the nginx.conf file to /etc/nginx/sites-available/lms"
echo "2. Create a symbolic link: ln -sf /etc/nginx/sites-available/lms /etc/nginx/sites-enabled/"
echo "3. Test Nginx configuration: nginx -t"
echo "4. Restart Nginx: systemctl restart nginx"
echo "5. Start the backend with PM2: pm2 start dist/src/index.js --name \"lms-backend\""
echo "6. Save the PM2 configuration: pm2 save"
echo ""
echo "Your application should now be accessible at http://your-server-ip"
