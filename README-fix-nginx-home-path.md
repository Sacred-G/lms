# Fix Nginx Home Path Script

This script helps you update your Nginx configuration to use `/home/lms/client/build` as the root directory instead of `/var/www/lms/client/build`. It also checks if your backend is running and starts it with PM2 if needed.

## What This Script Does

1. Updates your Nginx configuration to use `/home/lms/client/build` as the root directory
2. Checks if the directory exists and offers to copy files from the old location if needed
3. Checks if the backend is running on port 3001
4. If the backend is not running, it:
   - Checks if PM2 is installed and offers to install it if needed
   - Checks if the backend files exist in the new location and offers to copy them if needed
   - Starts the backend with PM2 and saves the PM2 configuration

## How to Use

1. Run this script from your local computer (not on the VPS)
2. Make the script executable:
   ```bash
   chmod +x fix-nginx-home-path.sh
   ```
3. Run the script:
   ```bash
   ./fix-nginx-home-path.sh
   ```
4. Follow the prompts to enter your VPS IP address and username
5. The script will guide you through the process of updating your Nginx configuration and starting the backend

## Requirements

- SSH access to your VPS
- Appropriate permissions to modify Nginx configuration and start services
- Node.js and npm installed on your VPS (for PM2)

## Troubleshooting

If you encounter any issues:

- Check the Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Check the PM2 logs: `pm2 logs lms-backend`
- Make sure your backend is properly configured to run in the new location
