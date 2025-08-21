#!/bin/bash

# AI Background Remover Deployment Script
# This script deploys the application to a VPS

set -e

echo "🚀 Starting AI Background Remover deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN=${1:-"yourdomain.com"}
EMAIL=${2:-"admin@yourdomain.com"}

echo -e "${GREEN}Domain: $DOMAIN${NC}"
echo -e "${GREEN}Email: $EMAIL${NC}"

# Update system
echo -e "${YELLOW}📦 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install Docker
echo -e "${YELLOW}🐳 Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
else
    echo "Docker already installed"
fi

# Install Docker Compose
echo -e "${YELLOW}📦 Installing Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose already installed"
fi

# Install Nginx
echo -e "${YELLOW}🌐 Installing Nginx...${NC}"
sudo apt install -y nginx

# Install Certbot for SSL
echo -e "${YELLOW}🔒 Installing Certbot...${NC}"
sudo apt install -y certbot python3-certbot-nginx

# Create application directory
echo -e "${YELLOW}📁 Creating application directory...${NC}"
sudo mkdir -p /opt/background-remover
sudo chown $USER:$USER /opt/background-remover
cd /opt/background-remover

# Clone repository (if not already present)
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📥 Cloning repository...${NC}"
    git clone https://github.com/yourusername/image-background-remover.git .
fi

# Set up environment variables
echo -e "${YELLOW}⚙️ Setting up environment variables...${NC}"
if [ ! -f ".env" ]; then
    cp env.example .env
    echo "Please edit .env file with your configuration"
    echo "Press Enter when ready to continue..."
    read
fi

# Create uploads directory
echo -e "${YELLOW}📁 Creating uploads directory...${NC}"
mkdir -p uploads
chmod 755 uploads

# Build and start services
echo -e "${YELLOW}🔨 Building Docker images...${NC}"
docker-compose build

echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose up -d

# Wait for services to be ready
echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 30

# Configure Nginx
echo -e "${YELLOW}🌐 Configuring Nginx...${NC}"
sudo cp nginx/nginx.conf /etc/nginx/nginx.conf
sudo cp nginx/sites-available/background-remover /etc/nginx/sites-available/background-remover
sudo ln -sf /etc/nginx/sites-available/background-remover /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Set up SSL certificate
echo -e "${YELLOW}🔒 Setting up SSL certificate...${NC}"
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email $EMAIL

# Set up automatic SSL renewal
echo -e "${YELLOW}🔄 Setting up automatic SSL renewal...${NC}"
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Set up log rotation
echo -e "${YELLOW}📋 Setting up log rotation...${NC}"
sudo tee /etc/logrotate.d/background-remover > /dev/null <<EOF
/opt/background-remover/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root root
}
EOF

# Create monitoring script
echo -e "${YELLOW}📊 Creating monitoring script...${NC}"
cat > /opt/background-remover/scripts/monitor.sh <<'EOF'
#!/bin/bash
# Simple monitoring script

echo "=== AI Background Remover Status ==="
echo "Date: $(date)"
echo

# Check Docker containers
echo "Docker Containers:"
docker-compose ps
echo

# Check disk usage
echo "Disk Usage:"
df -h /opt/background-remover
echo

# Check memory usage
echo "Memory Usage:"
free -h
echo

# Check recent logs
echo "Recent Application Logs:"
docker-compose logs --tail=20
EOF

chmod +x /opt/background-remover/scripts/monitor.sh

# Set up daily monitoring
(crontab -l 2>/dev/null; echo "0 8 * * * /opt/background-remover/scripts/monitor.sh >> /opt/background-remover/logs/monitor.log 2>&1") | crontab -

# Create backup script
echo -e "${YELLOW}💾 Creating backup script...${NC}"
cat > /opt/background-remover/scripts/backup.sh <<'EOF'
#!/bin/bash
# Backup script

BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
docker-compose exec -T backend sqlite3 app.db ".backup '/tmp/backup.db'"
docker cp background-remover-backend-1:/tmp/backup.db $BACKUP_DIR/db_backup_$DATE.db

# Backup uploads
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz uploads/

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.db" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /opt/background-remover/scripts/backup.sh

# Set up daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/background-remover/scripts/backup.sh >> /opt/background-remover/logs/backup.log 2>&1") | crontab -

# Final status check
echo -e "${YELLOW}🔍 Performing final status check...${NC}"
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ All services are running!${NC}"
else
    echo -e "${RED}❌ Some services failed to start${NC}"
    docker-compose logs
    exit 1
fi

# Display final information
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo
echo -e "${GREEN}📋 Application Information:${NC}"
echo -e "   Frontend: https://$DOMAIN"
echo -e "   API: https://$DOMAIN/api"
echo -e "   API Docs: https://$DOMAIN/docs"
echo
echo -e "${GREEN}🔧 Management Commands:${NC}"
echo -e "   View logs: cd /opt/background-remover && docker-compose logs -f"
echo -e "   Restart: cd /opt/background-remover && docker-compose restart"
echo -e "   Update: cd /opt/background-remover && git pull && docker-compose up -d --build"
echo -e "   Monitor: /opt/background-remover/scripts/monitor.sh"
echo -e "   Backup: /opt/background-remover/scripts/backup.sh"
echo
echo -e "${GREEN}📊 Monitoring:${NC}"
echo -e "   Logs: /opt/background-remover/logs/"
echo -e "   Backups: /opt/backups/"
echo -e "   Cron jobs: crontab -l"
echo
echo -e "${YELLOW}⚠️  Next Steps:${NC}"
echo -e "   1. Update .env file with your actual configuration"
echo -e "   2. Set up Google Analytics and AdSense"
echo -e "   3. Configure your domain DNS"
echo -e "   4. Test the application thoroughly"
echo -e "   5. Set up monitoring alerts"
echo
echo -e "${GREEN}🚀 Your AI Background Remover is now live!${NC}"
