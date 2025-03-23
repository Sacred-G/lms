#!/bin/bash

# Check if SSH key already exists
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "Generating SSH key..."
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
else
    echo "SSH key already exists."
fi

# Get the VPS IP address
read -p "Enter your VPS IP address (default: 147.93.41.71): " VPS_IP
VPS_IP=${VPS_IP:-147.93.41.71}

# Get the VPS username
read -p "Enter your VPS username (default: root): " VPS_USER
VPS_USER=${VPS_USER:-root}

# Copy the SSH key to the VPS
echo "Copying SSH key to the VPS..."
echo "You will be prompted for your password one last time."
ssh-copy-id ${VPS_USER}@${VPS_IP}

# Test the connection
echo "Testing the connection..."
ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_IP} "echo SSH key authentication is working!"

echo "SSH key authentication has been set up successfully!"
echo "You can now SSH into your VPS without entering a password:"
echo "ssh ${VPS_USER}@${VPS_IP}"
