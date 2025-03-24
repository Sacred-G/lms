# Enabling iframe Embedding for Your LMS on VPS

To allow your LMS application to be embedded as an iframe on other websites, you need to modify your Nginx configuration to include specific HTTP headers. These headers tell browsers that your site can be embedded in iframes on other domains.

## What Changes Are Needed

Two specific HTTP headers need to be added to your Nginx configuration:

1. **X-Frame-Options**: This header controls whether a browser should be allowed to render a page in a `<frame>`, `<iframe>`, `<embed>` or `<object>`. Setting it to `ALLOWALL` permits embedding on any domain.

2. **Content-Security-Policy with frame-ancestors directive**: This header provides more granular control over iframe embedding. Setting `frame-ancestors *` allows embedding on any domain.

## How to Apply These Changes

### Option 1: Using the Provided Script

1. Make the script executable:
   ```bash
   chmod +x update-nginx-for-iframe.sh
   ```

2. Run the script:
   ```bash
   ./update-nginx-for-iframe.sh
   ```

3. Enter your VPS IP address and username when prompted.

4. The script will update your Nginx configuration, test it, and restart Nginx.

### Option 2: Manual Update

If you prefer to update your Nginx configuration manually:

1. SSH into your VPS:
   ```bash
   ssh your-username@your-vps-ip
   ```

2. Edit the Nginx configuration file:
   ```bash
   sudo nano /etc/nginx/sites-available/lms
   ```

3. Add the following lines after the `index index.html;` line:
   ```
   # Add headers to allow iframe embedding
   add_header X-Frame-Options "ALLOWALL";
   add_header Content-Security-Policy "frame-ancestors *;";
   ```

4. Save the file and exit the editor.

5. Test the Nginx configuration:
   ```bash
   sudo nginx -t
   ```

6. If the test is successful, restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

## Restricting to Specific Domains (Optional)

If you want to allow embedding only on specific domains for security reasons, you can modify the headers as follows:

```
add_header X-Frame-Options "ALLOW-FROM https://example.com";
add_header Content-Security-Policy "frame-ancestors 'self' https://example.com;";
```

Replace `https://example.com` with the domain where you want to allow embedding.

## Verifying the Changes

After applying these changes, you can verify that your site can be embedded in an iframe by creating a simple HTML file on another domain with the following content:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Iframe Test</title>
    <style>
        iframe {
            width: 100%;
            height: 600px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <h1>Testing iframe embedding</h1>
    <iframe src="http://your-vps-ip"></iframe>
</body>
</html>
```

Replace `http://your-vps-ip` with the URL of your LMS application.
