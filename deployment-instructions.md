# LMS Deployment Instructions

These instructions will help you deploy your LMS application on your Hostinger VPS.

## Option 1: Using the fix-deployment.sh Script

1. **Transfer the script to your VPS**

   Use an SCP client like WinSCP or the `scp` command in Git Bash to transfer the script:

   ```bash
   # Using Git Bash or WSL on Windows
   scp fix-deployment.sh root@147.93.41.71:/root/
   ```

2. **SSH into your VPS**

   ```bash
   ssh root@147.93.41.71
   ```

3. **Make the script executable and run it**

   ```bash
   chmod +x /root/fix-deployment.sh
   ./fix-deployment.sh
   ```

   This script will:
   - Stop any running processes
   - Ensure the backend and frontend are built
   - Configure Nginx properly
   - Start the backend with PM2

## Option 2: Manual Deployment Steps

If you prefer to run the commands manually, follow these steps:

1. **SSH into your VPS**

   ```bash
   ssh root@147.93.41.71
   ```

2. **Stop any running processes**

   ```bash
   pm2 stop all
   pm2 delete all
   ```

3. **Navigate to your application directory**

   ```bash
   cd /var/www/lms
   ```

4. **Build the backend**

   ```bash
   npm install
   npm run build
   ```

5. **Build the frontend**

   ```bash
   cd client
   npm install
   npm run build
   cd ..
   ```

6. **Configure Nginx**

   ```bash
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

   ln -sf /etc/nginx/sites-available/lms /etc/nginx/sites-enabled/
   rm -f /etc/nginx/sites-enabled/default
   nginx -t
   systemctl restart nginx
   ```

7. **Start the backend with PM2**

   ```bash
   cd /var/www/lms
   pm2 start dist/index.js --name "lms-backend"
   pm2 save
   ```

## Troubleshooting

If you encounter issues:

1. **Check if the backend is running**

   ```bash
   pm2 status
   ```

2. **Check the backend logs**

   ```bash
   pm2 logs lms-backend
   ```

3. **Check Nginx logs**

   ```bash
   cat /var/log/nginx/error.log
   cat /var/log/nginx/access.log
   ```

4. **Check if Nginx is running**

   ```bash
   systemctl status nginx
   ```

5. **Test the API directly**

   ```bash
   curl http://localhost:3001/api/courses
   ```

6. **Check if the frontend build exists**

   ```bash
   ls -la /var/www/lms/client/build
   ```

## Important Notes

1. The key issue you were experiencing was that you were trying to run the React development server (`npm start`) in production, which was causing conflicts with Nginx.

2. In production, you should:
   - Build the React frontend (`npm run build`)
   - Serve the static files using Nginx
   - Run the backend using PM2

3. Do NOT run `npm start` for the frontend in production. This is only for development.

Your application should be accessible at http://147.93.41.71 after completing these steps.
