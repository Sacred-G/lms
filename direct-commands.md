# Direct Commands for VPS Deployment

If you're already connected to your VPS via SSH, you can run these commands directly to fix your deployment:

```bash
# Stop all running processes
pm2 stop all
pm2 delete all

# Make sure the backend is built
cd /var/www/lms
npm install
npm run build

# Make sure the frontend is built
cd /var/www/lms/client
npm install
npm run build
cd ..

# Configure Nginx
cat > /etc/nginx/sites-available/lms << 'EOL'
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

# Enable the site and remove default
ln -sf /etc/nginx/sites-available/lms /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx

# Start the backend with PM2
cd /var/www/lms
pm2 start dist/index.js --name "lms-backend"
pm2 save
pm2 startup

# Check if everything is running
pm2 status
curl -I http://localhost:3001/api/courses
```

After running these commands, your application should be accessible at http://147.93.41.71
