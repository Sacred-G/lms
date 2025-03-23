# Deployment Instructions

This guide will help you deploy your LMS application to your VPS.

## Prerequisites

- A VPS with SSH access (you mentioned root@147.93.41.71)
- Your application code is pushed to GitHub at https://github.com/Sacred-G/lms.git

## Deployment Steps

1. **Transfer the deployment script to your VPS**

   Use SCP to transfer the deployment script to your VPS:

   ```bash
   scp deploy.sh root@147.93.41.71:/root/
   ```

2. **SSH into your VPS**

   ```bash
   ssh root@147.93.41.71
   ```

3. **Make the deployment script executable**

   ```bash
   chmod +x /root/deploy.sh
   ```

4. **Run the deployment script**

   ```bash
   cd /root
   ./deploy.sh
   ```

   This script will:
   - Update system packages
   - Install required dependencies (Git, Nginx, Node.js)
   - Install PM2 for process management
   - Clone your repository
   - Set up environment variables
   - Install dependencies and build both frontend and backend
   - Configure Nginx to serve your application
   - Set up PM2 to keep your backend running

5. **Seed the database (Optional)**

   If you want to initialize your database with sample data, transfer the seed-database.sh script to your VPS:

   ```bash
   scp seed-database.sh root@147.93.41.71:/root/
   ```

   Make it executable and run it:

   ```bash
   chmod +x /root/seed-database.sh
   ./seed-database.sh
   ```

6. **Verify the deployment**

   After the script completes, your application should be accessible at:

   ```
   http://147.93.41.71
   ```

## Troubleshooting

If you encounter any issues during deployment:

1. **Check the Nginx logs**

   ```bash
   cat /var/log/nginx/error.log
   ```

2. **Check the PM2 logs**

   ```bash
   pm2 logs lms-backend
   ```

3. **Check if the backend is running**

   ```bash
   pm2 status
   ```

4. **Restart the backend if needed**

   ```bash
   pm2 restart lms-backend
   ```

5. **Restart Nginx if needed**

   ```bash
   systemctl restart nginx
   ```

## Monitoring and Managing Your Application

We've created a monitoring script to help you manage your application on the VPS. This script provides an interactive menu with various options to monitor and manage your application.

1. **Transfer the monitoring script to your VPS**

   ```bash
   scp monitor.sh root@147.93.41.71:/root/
   ```

2. **Make the script executable**

   ```bash
   chmod +x /root/monitor.sh
   ```

3. **Run the monitoring script**

   ```bash
   ./monitor.sh
   ```

   This script provides the following options:
   - Check system status (PM2 processes, Nginx, system load, memory, disk)
   - View backend logs
   - View Nginx access and error logs
   - Restart backend service or Nginx
   - Check disk and memory usage
   - Test MongoDB connection
   - Pull latest changes and rebuild the application

## Updating Your Application

When you make changes to your application and want to update the deployed version, you can either:

### Option 1: Use the monitoring script

1. **SSH into your VPS**

   ```bash
   ssh root@147.93.41.71
   ```

2. **Run the monitoring script**

   ```bash
   cd /root
   ./monitor.sh
   ```

3. **Select option 10 (Pull latest changes and rebuild)**

   This will automatically:
   - Pull the latest changes from Git
   - Rebuild the backend and frontend
   - Restart the backend service

### Option 2: Manual update

1. **SSH into your VPS**

   ```bash
   ssh root@147.93.41.71
   ```

2. **Navigate to your application directory**

   ```bash
   cd /var/www/lms
   ```

3. **Pull the latest changes**

   ```bash
   git pull
   ```

4. **Rebuild the backend**

   ```bash
   npm install
   npm run build
   ```

5. **Rebuild the frontend**

   ```bash
   cd client
   npm install
   npm run build
   ```

6. **Restart the backend**

   ```bash
   cd /var/www/lms
   pm2 restart lms-backend
   ```

## Security Considerations

- The deployment script uses your MongoDB credentials directly. For a production environment, consider using environment variables or a secrets management solution.
- Review the permissions on your application files to ensure they're secure.

## Setting Up HTTPS (Recommended for Production)

For a production environment, it's highly recommended to set up HTTPS to secure your application. We've provided a script to help you set up HTTPS using Let's Encrypt:

1. **Transfer the HTTPS setup script to your VPS**

   ```bash
   scp setup-https.sh root@147.93.41.71:/root/
   ```

2. **Make the script executable**

   ```bash
   chmod +x /root/setup-https.sh
   ```

3. **Run the script with your domain name**

   ```bash
   ./setup-https.sh yourdomain.com
   ```

   If you want to specify a custom email for Let's Encrypt notifications:

   ```bash
   ./setup-https.sh yourdomain.com your-email@example.com
   ```

   This script will:
   - Install Certbot (Let's Encrypt client)
   - Obtain an SSL certificate for your domain
   - Configure Nginx to use HTTPS
   - Set up automatic certificate renewal

   After running this script, your application will be accessible via HTTPS at `https://yourdomain.com`.

   **Note:** For this to work, your domain name must be pointing to your VPS's IP address, and port 80 and 443 must be open in your firewall.
