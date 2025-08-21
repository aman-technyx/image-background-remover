# 🚀 AI Background Remover - Quick Start Guide

## 📋 Prerequisites

- **Node.js 18+** and **npm**
- **Python 3.8+** and **pip**
- **Docker** and **Docker Compose** (for production)
- **Git**

## 🏃‍♂️ Quick Start (Development)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd image-background-remover
```

### 2. Set Up Environment Variables
```bash
cp env.example .env
# Edit .env with your configuration
```

### 3. Start Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Frontend will be available at: http://localhost:3000

### 4. Start Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Backend will be available at: http://localhost:8000
API docs at: http://localhost:8000/docs

## 🐳 Quick Start (Production with Docker)

### 1. Clone and Configure
```bash
git clone <your-repo-url>
cd image-background-remover
cp env.example .env
# Edit .env with your production settings
```

### 2. Deploy with Docker Compose
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🌐 Production Deployment

### Option 1: Automated Deployment Script
```bash
# Make script executable
chmod +x scripts/deploy.sh

# Run deployment (replace with your domain and email)
./scripts/deploy.sh yourdomain.com admin@yourdomain.com
```

### Option 2: Manual VPS Setup
```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 4. Clone and deploy
git clone <your-repo-url>
cd image-background-remover
docker-compose up -d
```

## 🔧 Configuration

### Environment Variables
Edit `.env` file with your settings:

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_ADSENSE_ID=your-adsense-id

# Backend
DATABASE_URL=sqlite:///./app.db
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-change-in-production
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

### Domain Configuration
1. Point your domain to your VPS IP
2. Update `nginx/nginx.conf` with your domain
3. Run SSL setup: `sudo certbot --nginx -d yourdomain.com`

## 📊 Monitoring & Maintenance

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Monitor System
```bash
# Check service status
docker-compose ps

# Monitor resources
docker stats

# Run monitoring script
./scripts/monitor.sh
```

### Backup Data
```bash
# Manual backup
./scripts/backup.sh

# View backup logs
tail -f logs/backup.log
```

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## 🎯 Features

### ✅ Implemented
- [x] AI-powered background removal (U2Net)
- [x] Drag & drop file upload
- [x] Multiple output formats (PNG, JPG, WebP)
- [x] Mobile responsive design
- [x] Rate limiting
- [x] File validation
- [x] Docker deployment
- [x] Nginx reverse proxy
- [x] SSL/HTTPS support
- [x] Monitoring and backup scripts

### 🔄 Coming Soon
- [ ] User authentication
- [ ] Premium subscriptions
- [ ] Batch processing
- [ ] API access
- [ ] Advanced analytics
- [ ] Mobile app

## 🛠️ Development

### Project Structure
```
image-background-remover/
├── frontend/                 # Next.js frontend
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   └── ...
├── backend/                 # FastAPI backend
│   ├── app/                 # FastAPI application
│   ├── models/              # AI models
│   ├── services/            # Business logic
│   └── utils/               # Utilities
├── docker/                  # Docker configuration
├── nginx/                   # Nginx configuration
├── scripts/                 # Deployment scripts
└── docs/                    # Documentation
```

### Adding New Features
1. **Frontend**: Add components in `frontend/components/`
2. **Backend**: Add endpoints in `backend/app/main.py`
3. **AI Models**: Add models in `backend/app/models/`
4. **Services**: Add business logic in `backend/app/services/`

### Testing
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
python -m pytest

# Integration tests
docker-compose -f docker-compose.test.yml up
```

## 📈 Performance Optimization

### Frontend
- ✅ Next.js App Router
- ✅ Image optimization
- ✅ Code splitting
- ✅ Service worker (PWA)

### Backend
- ✅ FastAPI async support
- ✅ Redis caching
- ✅ Rate limiting
- ✅ File compression

### Infrastructure
- ✅ Docker containerization
- ✅ Nginx load balancing
- ✅ Gzip compression
- ✅ CDN ready

## 🔒 Security

### Implemented Security Features
- ✅ HTTPS/SSL encryption
- ✅ Security headers
- ✅ Rate limiting
- ✅ File validation
- ✅ CORS configuration
- ✅ Input sanitization

### Security Checklist
- [ ] Update `SECRET_KEY` in production
- [ ] Configure proper CORS origins
- [ ] Set up firewall rules
- [ ] Enable automatic security updates
- [ ] Monitor security logs
- [ ] Regular security audits

## 💰 Monetization

### Revenue Streams
1. **AdSense**: Display ads on free tier
2. **Premium Subscriptions**: $9.99/month
3. **Business API**: $29.99/month
4. **White-label Solutions**: Custom pricing

### Setup Instructions
1. **Google AdSense**: Add your AdSense ID to `.env`
2. **Stripe Payments**: Configure payment processing
3. **Analytics**: Add Google Analytics ID to `.env`

## 🆘 Support

### Common Issues

**Q: Background removal not working?**
A: Check if U2Net model is loaded. Try restarting the backend service.

**Q: File upload fails?**
A: Check file size limits and supported formats. Verify upload directory permissions.

**Q: Slow processing?**
A: Consider upgrading VPS resources or using GPU acceleration.

**Q: SSL certificate issues?**
A: Run `sudo certbot renew` to renew certificates.

### Getting Help
- 📧 Email: support@yourdomain.com
- 📖 Documentation: `/docs` directory
- 🐛 Issues: GitHub Issues
- 💬 Community: GitHub Discussions

## 🎉 Success Metrics

### Target Goals
- **Month 1**: 1,000+ users, $100+ revenue
- **Month 3**: 10,000+ users, $1,000+ revenue  
- **Month 6**: 50,000+ users, $5,000+ revenue
- **Month 12**: 100,000+ users, $15,000+ revenue

### Key Performance Indicators
- Daily active users
- Images processed per day
- Conversion rate (free to premium)
- Average processing time
- User satisfaction score

---

**🚀 Ready to launch your AI Background Remover business!**

For detailed documentation, see the `/docs` directory.
