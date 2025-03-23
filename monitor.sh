#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display menu
show_menu() {
  clear
  echo -e "${BLUE}=== LMS Application Monitoring Tool ===${NC}"
  echo -e "${BLUE}===================================${NC}"
  echo ""
  echo -e "${GREEN}1.${NC} Check system status"
  echo -e "${GREEN}2.${NC} View backend logs"
  echo -e "${GREEN}3.${NC} View Nginx access logs"
  echo -e "${GREEN}4.${NC} View Nginx error logs"
  echo -e "${GREEN}5.${NC} Restart backend service"
  echo -e "${GREEN}6.${NC} Restart Nginx"
  echo -e "${GREEN}7.${NC} Check disk usage"
  echo -e "${GREEN}8.${NC} Check memory usage"
  echo -e "${GREEN}9.${NC} Check MongoDB connection"
  echo -e "${GREEN}10.${NC} Pull latest changes and rebuild"
  echo -e "${GREEN}11.${NC} Exit"
  echo ""
  echo -e "${YELLOW}Enter your choice [1-11]:${NC} "
}

# Function to check system status
check_status() {
  echo -e "${BLUE}=== System Status ===${NC}"
  echo -e "${YELLOW}PM2 Processes:${NC}"
  pm2 status
  
  echo -e "\n${YELLOW}Nginx Status:${NC}"
  systemctl status nginx | head -n 3
  
  echo -e "\n${YELLOW}System Load:${NC}"
  uptime
  
  echo -e "\n${YELLOW}Memory Usage:${NC}"
  free -h
  
  echo -e "\n${YELLOW}Disk Usage:${NC}"
  df -h | grep -v tmpfs | grep -v udev
}

# Function to view backend logs
view_backend_logs() {
  echo -e "${BLUE}=== Backend Logs (Press Ctrl+C to exit) ===${NC}"
  pm2 logs lms-backend --lines 100
}

# Function to view Nginx access logs
view_nginx_access_logs() {
  echo -e "${BLUE}=== Nginx Access Logs (Press Ctrl+C to exit) ===${NC}"
  tail -f /var/log/nginx/access.log
}

# Function to view Nginx error logs
view_nginx_error_logs() {
  echo -e "${BLUE}=== Nginx Error Logs (Press Ctrl+C to exit) ===${NC}"
  tail -f /var/log/nginx/error.log
}

# Function to restart backend service
restart_backend() {
  echo -e "${BLUE}=== Restarting Backend Service ===${NC}"
  pm2 restart lms-backend
  echo -e "${GREEN}Backend service restarted.${NC}"
}

# Function to restart Nginx
restart_nginx() {
  echo -e "${BLUE}=== Restarting Nginx ===${NC}"
  systemctl restart nginx
  echo -e "${GREEN}Nginx restarted.${NC}"
}

# Function to check disk usage
check_disk_usage() {
  echo -e "${BLUE}=== Disk Usage ===${NC}"
  df -h | grep -v tmpfs | grep -v udev
}

# Function to check memory usage
check_memory_usage() {
  echo -e "${BLUE}=== Memory Usage ===${NC}"
  free -h
  echo -e "\n${YELLOW}Top Memory Processes:${NC}"
  ps aux --sort=-%mem | head -n 6
}

# Function to check MongoDB connection
check_mongodb() {
  echo -e "${BLUE}=== MongoDB Connection Test ===${NC}"
  
  # Extract MongoDB URI from .env file
  MONGODB_URI=$(grep MONGODB_URI /var/www/lms/.env | cut -d '=' -f2-)
  
  if [ -z "$MONGODB_URI" ]; then
    echo -e "${RED}MongoDB URI not found in .env file.${NC}"
    return
  fi
  
  # Test MongoDB connection
  echo -e "${YELLOW}Testing connection to MongoDB...${NC}"
  node -e "
    const { MongoClient } = require('mongodb');
    const uri = '$MONGODB_URI';
    const client = new MongoClient(uri);
    async function run() {
      try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const dbs = await client.db().admin().listDatabases();
        console.log('Available databases:');
        dbs.databases.forEach(db => console.log(` - \${db.name}`));
      } catch (err) {
        console.error('Error connecting to MongoDB:', err);
      } finally {
        await client.close();
      }
    }
    run();
  "
}

# Function to pull latest changes and rebuild
pull_and_rebuild() {
  echo -e "${BLUE}=== Pulling Latest Changes and Rebuilding ===${NC}"
  
  # Navigate to application directory
  cd /var/www/lms
  
  # Pull latest changes
  echo -e "${YELLOW}Pulling latest changes from Git...${NC}"
  git pull
  
  # Rebuild backend
  echo -e "${YELLOW}Rebuilding backend...${NC}"
  npm install
  npm run build
  
  # Rebuild frontend
  echo -e "${YELLOW}Rebuilding frontend...${NC}"
  cd client
  npm install
  npm run build
  
  # Restart backend
  echo -e "${YELLOW}Restarting backend service...${NC}"
  cd /var/www/lms
  pm2 restart lms-backend
  
  echo -e "${GREEN}Application updated and restarted successfully.${NC}"
}

# Main loop
while true; do
  show_menu
  read choice
  
  case $choice in
    1) check_status ;;
    2) view_backend_logs ;;
    3) view_nginx_access_logs ;;
    4) view_nginx_error_logs ;;
    5) restart_backend ;;
    6) restart_nginx ;;
    7) check_disk_usage ;;
    8) check_memory_usage ;;
    9) check_mongodb ;;
    10) pull_and_rebuild ;;
    11) echo -e "${GREEN}Exiting...${NC}"; exit 0 ;;
    *) echo -e "${RED}Invalid option. Please try again.${NC}" ;;
  esac
  
  echo ""
  echo -e "${YELLOW}Press Enter to continue...${NC}"
  read
done
