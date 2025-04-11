# Fix HTTPS Domain Script

This script helps you configure your VPS to serve your LMS application over HTTPS using your domain name (vps.sbouldin.com).

## What This Script Does

1. Checks if Let's Encrypt certificates exist for your domain
2. If not, installs certbot and obtains certificates
3. Updates your Nginx configuration to:
   - Use the new path (`/home/lms/client/build`)
   - Configure HTTPS with Let's Encrypt certificates
   - Set up proper redirects from HTTP to HTTPS
4. Checks if the backend is running

## How to Use

1. Run this script from your local computer (not on the VPS)
2. Make the script executable:
   ```bash
   chmod +x fix-https-domain.sh
   ```
3. Run the script:
   ```bash
   ./fix-https-domain.sh
   ```
4. Follow the prompts to enter your VPS username
5. The script will guide you through the process of setting up HTTPS

## Requirements

- SSH access to your VPS
- A domain name (vps.sbouldin.com) that points to your VPS IP address
- Appropriate permissions to modify Nginx configuration and install packages

## Troubleshooting

If you encounter any issues:

- Make sure your domain name (vps.sbouldin.com) is correctly pointing to your VPS IP address (147.93.41.71)
- Check the Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Check the certbot logs: `sudo tail -f /var/log/letsencrypt/letsencrypt.log`
- Make sure port 80 and 443 are open on your VPS firewall
- If the backend is not running, use the `restart-pm2-backend.sh` script to start it
